import { Component, OnInit } from '@angular/core';
import {Usuario} from '../login/usuario';
import {UsuariosService} from '../login/usuarios.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

// carga de archivo js para mdbootstrap
declare var lista: any;


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html'
})


export class CrearUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario();


  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit(): void {
    // Ejecuta el script
    new lista();

  }


  // Crear usuario
  crearUsuario(): void {
    console.log(this.usuario);
    this.usuariosService.crearUsuarioJava(this.usuario).subscribe(
      obj => {
        swal('Correcto', `${obj.mensaje}`, 'success');
        this.router.navigate(['/lista-usuarios']);
      });
  }

}
