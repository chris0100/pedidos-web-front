import {Component, OnInit} from '@angular/core';
import {Usuario} from '../usuario';
import {UsuariosService} from '../usuarios.service';
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
  passwordNuevo: string;

  errores: string[];

  // Spinner
  showSpinner: boolean;


  constructor(private usuariosService: UsuariosService, private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.showSpinner = false;
    // Remover la busqueda del historial de pedidos, y listaItemProductosSelect
    sessionStorage.removeItem('pedidosUnoEEHistorial');
    sessionStorage.removeItem('listaItemPedidoSelect');


    // Ejecuta el script
    new lista();

    // Se carga el usuario cuando es el caso de editar
    this.cargarUsuario();
    this.passwordNuevo = '';
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
        this.showSpinner = false;
      });
    this.showSpinner = true;
  }


  // Editar Usuario
  updateUsuario(): void {
    console.log(this.usuario);
    this.usuariosService.editarUsuarioJava(this.usuario).subscribe(
      json => {
        this.router.navigate(['/lista-usuarios']);
        swal('Usuario actualizado', `${json.mensaje}: ${json.usuario.nombre}`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
        this.showSpinner = false;
      });
    this.showSpinner = true;
  }


  // Se actualiza la contraseña
  cambiarPasswordOtroUsuario(): void {
    console.log(this.usuario.id);
    if (this.passwordNuevo.trim() == '') {
      swal('Error', 'Revisa que los campos esten diligenciados correctamente', 'error');
    } else {
      this.usuariosService.updatePasswordOtroUsuarioJava(this.passwordNuevo, this.usuario.id)
        .subscribe(
          json => {
            swal('Contraseña Actualizada', `${json.mensaje}`, 'success');
          },
          err => {
            swal('Error', 'Ha ocurrido un error, revisa que los datos ingresados sean validos', 'error');
            this.errores = err.error.errors as string[];
            console.error('Codigo de error desde backend' + err.status);
            console.error(err.error.errors);
          }
        );
    }
  }


}
