import { Component, OnInit } from '@angular/core';

// carga de archivo js para mdbootstrap
declare var tablas: any;

@Component({
  selector: 'app-pedidos-borrador',
  templateUrl: './pedidos-borrador.component.html'
})


export class PedidosBorradorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // ejecucion js
    new tablas();
  }

}
