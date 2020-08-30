import { Component, OnInit } from '@angular/core';

// carga de archivo js para mdbootstrap
declare var pedidos: any;

@Component({
  selector: 'app-crear-pedido',
  templateUrl: './crear-pedido.component.html'
})


export class CrearPedidoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // Ejecutar script js
    new pedidos();

  }

}
