import { Component, OnInit } from '@angular/core';
import {Usuario} from '../login/usuario';
import {UsuariosService} from '../login/usuarios.service';
import {Router} from '@angular/router';

// carga de archivo js para mdbootstrap
declare var lista: any;


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html'
})


export class CrearUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario();
  cambioIngreso: boolean;

  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit(): void {
    // Ejecuta el script
    new lista();

    this.cambioIngreso = false;

  }


  // Crear usuario
  crearUsuario(): void {
    console.log(this.usuario);
    console.log(this.cambioIngreso);
    // this.usuariosService.crearUsuarioJava(this.usuario)
  }

}
