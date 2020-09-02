import {Component, OnInit} from '@angular/core';
import {Usuario} from '../usuario';
import {AuthService} from '../../login/auth.service';
import {UsuariosService} from '../usuarios.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html'
})


export class ConfiguracionComponent implements OnInit {


  usuarioModificado: Usuario;
  nombreUsuario: string;
  emailUsuario: string;
  errores: string[];
  passwordNuevo: string;
  passwordActual: string;


  constructor(private authService: AuthService, private usuariosService: UsuariosService,
              private router: Router) {
  }


  ngOnInit(): void {
    this.nombreUsuario = this.authService.usuario.nombre;
    this.emailUsuario = this.authService.usuario.email;
    this.usuarioModificado = new Usuario();
    this.passwordNuevo = '';
    this.passwordActual = '';
  }


  // Se actualizan los datos del usuario
  update(): void {

    this.usuarioModificado.nombre = this.nombreUsuario;
    this.usuarioModificado.email = this.emailUsuario;

    // Valida que los campos no esten vacios
    if (this.usuarioModificado.nombre.trim() == '' || this.usuarioModificado.email.trim() == '') {
      swal('Error de Cambios', 'Revisa que los campos esten diligenciados correctamente', 'error');
    } else {
      this.usuariosService.updateUsuarioJava(this.usuarioModificado)
        .subscribe(
          json => {
            this.router.navigate(['/panel-clientes']);
            swal('Usuario Actualizado', `${json.mensaje}: ${json.usuario.nombre}`, 'success');

            // Se modifica en el authService
            this.authService.usuario.email = this.usuarioModificado.email;
            this.authService.usuario.nombre = this.usuarioModificado.nombre;

            // Se modifica en los datos guardados del token
            const accessToken: string = this.authService.obtenerTokenGuardado();
            const objPayload = this.authService.obtenerDatosToken(accessToken);

            this.authService.ModificarDatosUsuarioSessionStorage(objPayload, this.usuarioModificado.nombre,
              this.usuarioModificado.email);
          },
          err => {
            this.errores = err.error.errors as string[];
            console.error('Codigo de error desde backend' + err.status);
            console.error(err.error.errors);
          }
        );
    }
  }



  // Se actualiza la contraseña
  cambiarPassword(): void {
    if (this.passwordActual.trim() == '' || this.passwordNuevo.trim() == '') {
      swal('Error', 'Revisa que los campos esten diligenciados correctamente', 'error');
    } else {
      this.usuariosService.cambiarPasswordJava(this.passwordActual, this.passwordNuevo)
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
