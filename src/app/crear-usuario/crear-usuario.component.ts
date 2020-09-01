import { Component, OnInit } from '@angular/core';
import {Usuario} from '../login/usuario';
import {UsuariosService} from '../login/usuarios.service';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';

// carga de archivo js para mdbootstrap
declare var lista: any;


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html'
})


export class CrearUsuarioComponent implements OnInit {

  public usuario: Usuario = new Usuario();


  constructor(private usuariosService: UsuariosService, private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // Ejecuta el script
    new lista();

    // Se carga el usuario cuando es el caso de editar
    this.cargarUsuario();
  }


  cargarUsuario(): void {
    this.activatedRoute.params.subscribe(
      params => {
        const id = params['id'];
        if (id) {
          this.usuariosService.obtenerUsuarioJava(id).subscribe(
            obj => {
              this.usuario = obj;
              return this.usuario;
            });
        }
      });
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
