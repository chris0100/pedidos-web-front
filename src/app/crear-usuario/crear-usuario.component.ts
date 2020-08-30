import { Component, OnInit } from '@angular/core';

// carga de archivo js para mdbootstrap
declare var lista: any;


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html'
})


export class CrearUsuarioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Ejecuta el script
    new lista();

  }

}
