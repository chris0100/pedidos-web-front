import {Component, OnInit} from '@angular/core';
import {PedidoService} from '../../pedido.service';
import {ActivatedRoute} from '@angular/router';
import {Pedido} from '../../pedido';
import {ItemPedido} from '../../item-pedido';

@Component({
  selector: 'app-detalle-pedidos-verificacion',
  templateUrl: './detalle-pedidos-verificacion.component.html'
})


export class DetallePedidosVerificacionComponent implements OnInit {

  constructor(private pedidosService: PedidoService, private activatedRoute: ActivatedRoute) {
  }

  pedidoVerificacion: Pedido;
  itemsPedidoVerificacion: ItemPedido[];

  ngOnInit() {
    this.cargarPedidoVerificacion();
  }


  // Carga a traves de la ruta variable idpedido
  cargarPedidoVerificacion(): void {
    this.activatedRoute.params.subscribe(
      params => {
        const id = params['id'];
        if (id) {
          this.pedidosService.obtenerPedidoVBJava(id).subscribe(
            obj => {
              // Pasar los datos al pedido
              this.pedidoVerificacion = obj;
              console.log(this.pedidoVerificacion);

              this.itemsPedidoVerificacion = obj.listaItemPedido;
              console.log(this.itemsPedidoVerificacion);
            });
        }
      }
    );
  }

}
