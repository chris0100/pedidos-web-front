import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../usuario/usuario';

// carga de archivo js para mdbootstrap
declare var login: any;

@Component({
  selector: 'app-reestablecer-password',
  templateUrl: './reestablecer-password.component.html'
})


export class ReestablecerPasswordComponent implements OnInit {

  usuario: Usuario;

  constructor() { }

  ngOnInit() {

    // Ejecuta el script
    new login();
  }

}
