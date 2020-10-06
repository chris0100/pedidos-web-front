import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../usuario/usuario';
import {ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';

// carga de archivo js para mdbootstrap
declare var login: any;

@Component({
  selector: 'app-reestablecer-password',
  templateUrl: './reestablecer-password.component.html'
})


export class ReestablecerPasswordComponent implements OnInit {

  usuario: Usuario;
  idPage: number;
  claseActiva: string;
  claseInactiva: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // Ejecuta el script
    new login();
    this.recibeId();
    swal('Restablecer Contraseña', 'Si ha perdido su contraseña tan solo debe diligenciar la siguiente información', 'warning');
  }


  // Se carga el token a traves de la ruta
  recibeId(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.idPage = params['id'];
        console.log(this.idPage);
      });
  }

}
