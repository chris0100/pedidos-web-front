import {Component, OnInit} from '@angular/core';
import {AuthService} from '../login/auth.service';
import {ItemPedidoUnoEE} from '../pedidos/item-pedido-uno-ee';
import {PedidoService} from '../pedidos/pedido.service';
import swal from 'sweetalert2';
import {PedidoUnoEE} from '../pedidos/pedido-uno-ee';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-panel-clientes',
  templateUrl: './panel-clientes.component.html',
  providers: [DatePipe]
})


export class PanelClientesComponent implements OnInit {

  listaItemPedidosUnoee: ItemPedidoUnoEE[];
  pedidosUnoEE: PedidoUnoEE[];

  constructor(public authService: AuthService, private pedidosService: PedidoService, private datePipe: DatePipe) {
  }

  fechaActual = new Date();
  valornetoComprasEsteYear = 0;
  valornetoComprasBeforeYear = 0;
  porcentajeValorCompras = 0;
  porcentajeCantidadCompras = 0;
  masBeforeYearTotal = false;
  masEsteYearTotal = false;
  masBeforeYearCantidad = false;
  masEsteYearCantidad = false;
  cantidadComprasEsteYear = 0;
  cantidadComprasBeforeYear = 0;

  // Spinner
  showSpinner: boolean;


  ngOnInit(): void {

    // Realiza la carga ventas y productos mas vendidos
    // tslint:disable-next-line:max-line-length
    this.pedidosService.listaHistorialPedidosJava(this.authService.usuario.nit, '20200101', this.datePipe.transform(this.fechaActual, 'yyyyMMdd')).subscribe(
      obj => {
        this.pedidosUnoEE = obj;
        console.log(obj);

        // Calcular la cantidad de compras este año
        this.cantidadComprasEsteYear = this.pedidosUnoEE.length;

        // Obtener el total de compras de este año
        this.pedidosUnoEE.forEach(vn => {
          this.valornetoComprasEsteYear += vn.valorNetoDocumento;
        });
        console.log(this.valornetoComprasEsteYear);

        this.pedidosService.listaHistorialPedidosJava(this.authService.usuario.nit, '20190101', '20191231').subscribe(
          obj2 => {
            this.pedidosUnoEE = obj2;

            // Calcular la cantidad de compras este año
            this.cantidadComprasBeforeYear = this.pedidosUnoEE.length;
            console.log(this.cantidadComprasBeforeYear);


            // Obtener el total de compras de el año pasado
            this.pedidosUnoEE.forEach(vn => {
              this.valornetoComprasBeforeYear += vn.valorNetoDocumento;
            });
            console.log(this.valornetoComprasBeforeYear);

            // Comparar valores de este año con año pasado para establecer porcentaje
            if (this.valornetoComprasEsteYear > this.valornetoComprasBeforeYear) {
              const diferencial = (this.valornetoComprasEsteYear - this.valornetoComprasBeforeYear);
              this.porcentajeValorCompras = Math.round(((diferencial / this.valornetoComprasEsteYear) * 100) * 10) / 10;
              this.masEsteYearTotal = true;
              this.masEsteYearCantidad = true;
              this.porcentajeCantidadCompras = Math.round((((this.cantidadComprasEsteYear - this.cantidadComprasBeforeYear) / this.cantidadComprasEsteYear) * 100) * 10) / 10;
            } else {
              const diferencial = (this.valornetoComprasBeforeYear - this.valornetoComprasEsteYear);
              this.porcentajeValorCompras = Math.round(((diferencial / this.valornetoComprasBeforeYear) * 100) * 10) / 10;
              this.porcentajeCantidadCompras = Math.round((((this.cantidadComprasBeforeYear - this.cantidadComprasEsteYear) / this.cantidadComprasBeforeYear) * 100) * 10) / 10;
              this.masBeforeYearTotal = true;
              this.masBeforeYearCantidad = true;
            }
            this.showSpinner = false;
          });
      });


    // Cargar la lista de los items mas solicitados
    this.pedidosService.recargarConsultaItemsPedidosUnoEE(this.authService.usuario.nit, this.authService.usuario.id_sucursal).subscribe(
      obj => {
        this.listaItemPedidosUnoee = obj;
        console.log(this.listaItemPedidosUnoee);
      },
      error => {
        swal('Error', 'Ha ocurrido un error al generar el listado', 'error');
      });

    // Remover la busqueda del historial de pedidos, y listaItemProductosSelect
    sessionStorage.removeItem('pedidosUnoEEHistorial');
    sessionStorage.removeItem('listaItemPedidoSelect');
    // Destruir el usuarioTemp
    sessionStorage.removeItem('usuarioTemp');

    this.showSpinner = true;
  }


}
