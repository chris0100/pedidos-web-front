import {Component, OnInit} from '@angular/core';
import {Pedido} from '../../pedidos/pedido';
import {ItemPedido} from '../../pedidos/item-pedido';
import {PedidoService} from '../../pedidos/pedido.service';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';


// carga de archivo tooltip
declare var tooltip: any;


@Component({
  selector: 'app-prepare-ver-error',
  templateUrl: './prepare-ver-error.component.html'
})


export class PrepareVerErrorComponent implements OnInit {

  pedidoError: Pedido;
  itemsPedidoError: ItemPedido[];
  comeback: string;
  idLocal: number;
  textoConvertido: string;


  // Spinner
  showSpinner: boolean;


  constructor(private pedidosService: PedidoService, private activatedRoute: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {
    this.cargarPedidoError();
    this.showSpinner = false;
    new tooltip();
  }


  // Cargar a traves de la ruta del pedido id
  cargarPedidoError(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.idLocal = params['id'];
        this.comeback = params['otr'];

        if (this.idLocal) {
          this.recargarPedidoError();
        }
      }
    );
  }


  // Funcionalidad para boton de sincronizar items
  sincronizar(): void {
    // Se obtiene el id del pedido junto con el nit
    const idPedido = this.pedidoError.id + '';
    const nit = this.pedidoError.idUsuario.nit;

    console.log(this.pedidoError.id);
    console.log(this.pedidoError.idUsuario.nit);


    // Se manda a ejecutar el procedimiento en java
    this.pedidosService.sincronizarItemsJava(idPedido, nit).subscribe(
      obj => {
        console.log('aqui se recibe mensaje de respuesta');
        console.log(obj);
        swal('Correcto', obj[0], 'success');

        // Se itera para sincronizar bodega
        // tslint:disable-next-line:no-shadowed-variable
        this.pedidoError.listaItemPedido.forEach(obj1 => {
          this.pedidosService.sincronizarBodegaItemsJava(obj1.idItem, obj1.codItem.toString()).subscribe(
            obj2 => {
              // aqui se debe de recargar la pagina
              this.recargarPedidoError();
              this.showSpinner = false;
            });
        });
      });
    this.showSpinner = true;
  }


  // Funcionalidad para cuando se da clic en el boton volver a enviar pedido
  enviarPedidoAgain(): void {
    console.log('se ha dado clic en el boton enviar pedido nuevamente');
    console.log(this.pedidoError);

    this.pedidosService.webServiceProcessError(this.pedidoError).subscribe(
      obj => {
        console.log(obj);
        if (obj[0].includes('no')) {
          swal('Error', obj[0], 'error');
        } else {
          swal('Correcto', obj[0], 'success');
        }
        this.showSpinner = false;
      });
    this.showSpinner = true;
  }


  // Llamado para obtener pedido error
  private recargarPedidoError(): void {
    this.pedidosService.obtenerPedidoVBJava(this.idLocal).subscribe(
      obj => {
        this.pedidoError = obj;
        console.log(this.pedidoError);

        this.itemsPedidoError = obj.listaItemPedido;
        console.log(this.itemsPedidoError);

        this.textoConvertido = this.pedidoError.mensajeWB;
        console.log(this.textoConvertido);
      });
  }


  // Redireccionar a otra pagina
  redireccionar(idItem: number): void {
    window.open('http://eureka:8080/intranet/faces/procesarItemPedidoWeb.xhtml?id=' + idItem, '_blank');
  }


  // Borrar item de la lista pedido error
  borrarItem(item: ItemPedido): void {
    console.log('se ha dado clic en borrar el item: ' + item.idItem);

    this.pedidosService.eliminarItemBorradorJava(item.idItem).subscribe(
      () => {
        let nombreItemEliminar = '';

        // Buscar en la lista
        // @ts-ignore
        const index = this.itemsPedidoError.findIndex(obj => {
          if (obj === item) {
            nombreItemEliminar = obj.descripcion;
            return obj;
          }
        });

        this.itemsPedidoError.splice(index, 1);  // borrar elemento

        // Mostrar mensaje satisfactorio de elemento eliminado
        swal('Correcto', `Se ha eliminado el item ${nombreItemEliminar} exitosamente`, 'success');
        console.log(this.itemsPedidoError);
      });
  }


}
