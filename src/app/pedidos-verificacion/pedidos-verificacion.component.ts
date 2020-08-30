import { Component, OnInit } from '@angular/core';

// carga de archivo para mdbootstrap
declare var historial: any;


@Component({
  selector: 'app-pedidos-verificacion',
  templateUrl: './pedidos-verificacion.component.html'
})


export class PedidosVerificacionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // carga de script js
    new historial();

  }

}
