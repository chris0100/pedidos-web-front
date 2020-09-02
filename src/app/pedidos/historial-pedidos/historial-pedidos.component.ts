import { Component, OnInit } from '@angular/core';
import {Pedido} from '../pedido';

// carga de archivo para mdbootstrap
declare var historial: any;


@Component({
  selector: 'app-historial-pedidos',
  templateUrl: './historial-pedidos.component.html'
})


export class HistorialPedidosComponent implements OnInit {

  pedidosUnoEE: PedidoUnoEE;

  constructor() { }

  ngOnInit(): void {

    // carga de script js
    new historial();

  }

}
