import { Component, OnInit } from '@angular/core';

// carga de variable para mdbootstrap
declare var tablas;

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html'
})


export class ListaUsuariosComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {

    // Inicializacion para cargar js
    new tablas();

  }

}
