import {Component, OnInit} from '@angular/core';
import {PedidoService} from '../../pedido.service';
import {AuthService} from '../../../login/auth.service';
import swal from 'sweetalert2';
import {ItemPedido} from '../../item-pedido';

@Component({
  selector: 'app-tu-codigo',
  templateUrl: './tu-codigo.component.html'
})


export class TuCodigoComponent implements OnInit {

  codigoCliente: string;

  itemPatron: string;
  ext1: string;
  ext2: string;
  tipoExt1: string;
  tipoExt2: string;
  itemPedidoActual: ItemPedido;

  itemHomologado: string;


  constructor(private pedidosService: PedidoService, private authService: AuthService) {
  }


  ngOnInit(): void {
  }


  consultarItemHomologado(): void {
    console.log('algo esta cambiando' + this.codigoCliente);

    this.pedidosService.contarHomologarItemDuplicado(this.authService.usuario.nit, this.codigoCliente).subscribe(
      obj => {
        if (obj.length <= 1) {
          this.itemHomologado = obj[0];
          console.log(this.itemHomologado);

          //                     itemPatron = getItemHomologado().substring(0, 50);
          //                     tipoExt1 = getItemHomologado().substring(50, 52);
          //                     tipoExt2 = getItemHomologado().substring(52, 54);
          //                     ext1 = getItemHomologado().substring(54, 100);
          //                     ext2 = getItemHomologado().substring(100, 147);
          //                     itemPedidoActual.setUnidadMedida(getItemHomologado().substring(147, 151).trim());
          //                     itemPedidoActual.setCantidad(new BigDecimal(0));
        } else {
          swal('Error', 'Ha ocurrido un error, revisa los datos ingresados', 'error');
          return;
        }
      });
  }

}
