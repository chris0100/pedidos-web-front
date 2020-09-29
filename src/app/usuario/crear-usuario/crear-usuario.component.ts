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
  repetirPasswordNuevo: string;

  errores: string[];

  // Spinner
  showSpinner: boolean;


  constructor(private usuariosService: UsuariosService, private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.showSpinner = false;
    this.usuario.primerLogin = false;
    // Remover la busqueda del historial de pedidos, y listaItemProductosSelect
    sessionStorage.removeItem('pedidosUnoEEHistorial');
    sessionStorage.removeItem('listaItemPedidoSelect');

    // En caso de que el usuario sea nuevo
    this.usuario.nombre = '';
    this.usuario.nit = '';
    this.usuario.username = '';
    this.usuario.rolesPrincipal = [];
    this.usuario.email = '';
    this.usuario.password = '';



    // Ejecuta el script
    new lista();

    // Se carga el usuario cuando es el caso de editar
    this.cargarUsuario();
    this.passwordNuevo = '';
    this.repetirPasswordNuevo = '';
  }


  cargarUsuario(): void {
    this.activatedRoute.params.subscribe(
      params => {
        const id = params['id'];
        if (id) {
          this.usuariosService.obtenerUsuarioJava(id).subscribe(
            obj => {
              this.usuario = obj;
              // Recorrer los roles
              this.usuario.rolesPrincipal = [];
              this.usuario.roles.forEach(obj2 => {
                this.usuario.rolesPrincipal.push(obj2);
              });
              console.log(this.usuario);
              return this.usuario;
            });
        }
      });
  }


  // Crear usuario
  crearUsuario(): void {
    console.log(this.usuario);

    // Realiza validacion de campos vacios
    if (this.usuario.nombre.trim().length === 0 || this.usuario.nit.trim().length === 0 ||
    this.usuario.username.trim().length === 0 || this.usuario.rolesPrincipal.length === 0 ||
    this.usuario.email.trim().length === 0 || this.usuario.password.trim().length === 0 ) {
      swal('Error', 'Verifica que todos los campos estén correctamente diligenciados', 'error');
      return;
    }


    this.usuariosService.crearUsuarioJava(this.usuario).subscribe(
      obj => {
        swal('Correcto', `${obj.mensaje}`, 'success');
        this.router.navigate(['/lista-usuarios']);
      });
  }


  // Editar Usuario
  updateUsuario(): void {
    console.log(this.usuario);

    // Realiza validacion de campos vacios
    if (this.usuario.nombre.trim().length === 0 || this.usuario.nit.trim().length === 0 ||
      this.usuario.username.trim().length === 0 || this.usuario.rolesPrincipal.length === 0 ||
      this.usuario.email.trim().length === 0 || this.usuario.password.trim().length === 0 ) {
      swal('Error', 'Verifica que todos los campos estén correctamente diligenciados', 'error');
      return;
    }


    this.usuariosService.editarUsuarioJava(this.usuario).subscribe(
      json => {
        swal('Usuario actualizado', `${json.mensaje}: ${json.usuario.nombre}`, 'success');
        this.router.navigate(['/lista-usuarios']);
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      });
  }


  // Se actualiza la contraseña
  cambiarPasswordOtroUsuario(): void {
    console.log(this.usuario.id);
    // Si esta nula la seleccion de solicitar cambio al ingresar, se cambia a false.
    if (this.usuario.primerLogin == null) {
      this.usuario.primerLogin = false;
    }

    if (this.passwordNuevo.trim() === '' || this.repetirPasswordNuevo.trim() === '') {
      swal('Error', 'Revisa que los campos esten diligenciados correctamente', 'error');
    } else {
      this.usuariosService.updatePasswordOtroUsuarioJava(this.passwordNuevo, this.usuario.id, this.usuario.primerLogin)
        .subscribe(
          json => {
            swal('Contraseña Actualizada', `${json.mensaje}`, 'success');
          },
          err => {
            swal('Error', 'Ha ocurrido un error, revisa que los datos ingresados sean validos', 'error');
            this.errores = err.error.errors as string[];
            console.error('Codigo de error desde backend' + err.status);
          }
        );
    }
  }


  // Se limpian campos de contraseña despues de ser modificada
  limpiarCamposPassword(): void {
    this.passwordNuevo = '';
    this.repetirPasswordNuevo = '';
  }


}
