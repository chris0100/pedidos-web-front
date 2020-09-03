import {Component, OnInit} from '@angular/core';
import {PedidoService} from '../../pedido.service';
import {ActivatedRoute} from '@angular/router';
import {PedidoUnoEE} from '../../pedido-uno-ee';
import {ItemPedidoUnoEE} from '../../item-pedido-uno-ee';

@Component({
  selector: 'app-detalle-historial-pedidos',
  templateUrl: './detalle-historial-pedidos.component.html'
})


export class DetalleHistorialPedidosComponent implements OnInit {


  constructor(private pedidosService: PedidoService, private activatedRoute: ActivatedRoute) {
  }

  pedidoUnoEE: PedidoUnoEE;
  pedidosUnoEE: PedidoUnoEE[];
  itemsPedidoUnoEE: ItemPedidoUnoEE[];


  ngOnInit() {
    this.cargarPedido();
  }


  cargarPedido(): void {

    // Se localizan los items del pedido en BD
    this.activatedRoute.params.subscribe(
      params => {
        const id = params['id'];
        if (id) {
          this.pedidosService.obtenerListaItemsPedidoUnoEEJava(id).subscribe(
            obj => {
              this.itemsPedidoUnoEE = obj;
              console.log(this.itemsPedidoUnoEE);
              return this.itemsPedidoUnoEE;
            });

          // filtrar por un valor particular para encontrar en el sessionStorage el pedido seleccionado
          this.pedidosUnoEE = this.pedidosService.obtenerPedidoUnoEEGuardadoSessionStorage();
          for (let i = 0; i < this.pedidosUnoEE.length; i++) {
            if (this.pedidosUnoEE[i].rowid == id) {
              this.pedidoUnoEE = this.pedidosUnoEE[i];
              console.log(this.pedidoUnoEE);
              return;
            }
          }
        }
      });
  }


}
