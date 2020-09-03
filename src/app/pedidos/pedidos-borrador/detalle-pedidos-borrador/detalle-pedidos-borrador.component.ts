import { Component, OnInit } from '@angular/core';
import {PedidoService} from '../../pedido.service';
import {ActivatedRoute} from '@angular/router';
import {ItemPedido} from '../../item-pedido';
import {Pedido} from '../../pedido';

@Component({
  selector: 'app-detalle-pedidos-borrador',
  templateUrl: './detalle-pedidos-borrador.component.html'
})


export class DetallePedidosBorradorComponent implements OnInit {

  constructor(private pedidosService: PedidoService, private activatedRoute: ActivatedRoute) { }


  pedidoBorrador: Pedido;
  itemsPedidoBorrador: ItemPedido[];


  ngOnInit() {
    this.cargarPedidoBorrador();
  }


  // Carga a traves de la ruta variable idpedido
  cargarPedidoBorrador(): void {
    this.activatedRoute.params.subscribe(
      params => {
        const id = params['id'];
        if (id) {
          this.pedidosService.obtenerPedidoVBJava(id).subscribe(
            obj => {
              // Pasar los datos al pedido
              this.pedidoBorrador = obj;
              console.log(this.pedidoBorrador);

              this.itemsPedidoBorrador = obj.listaItemPedido;
              console.log(this.itemsPedidoBorrador);
            });
        }
      }
    );
  }



}
