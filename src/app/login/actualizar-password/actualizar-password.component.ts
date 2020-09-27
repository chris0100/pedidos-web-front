import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../usuario/usuario';
import swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuariosService} from '../../usuario/usuarios.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-actualizar-password',
  templateUrl: './actualizar-password.component.html'
})


export class ActualizarPasswordComponent implements OnInit {

  usuario: Usuario;
  password: string;
  repetirPassword: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private authService: AuthService, private usuariosService: UsuariosService) { }


  ngOnInit() {
    this.usuario = new Usuario();
    this.password = '';
    this.repetirPassword = '';
  }


  // Se da clic en procesar token
  guardarPassword(): void {
    console.log('el password a guardar es: ' + this.password);
    // Se realiza verificacion del password
    if (this.password.trim().length === 0 || this.repetirPassword.trim().length === 0) {
      swal('Error', 'La contraseña no debe contener espacios en blanco', 'error');
      return;
    }

    // tslint:disable-next-line:one-line
    else {
      // Se envia la contraseña para que se actualicen los datos al nuevo usuario
      this.usuariosService.updatePasswordOtroUsuarioJava(this.password, this.authService.usuario.id, false).subscribe(
        json => {
          swal('Contraseña Actualizada', `${json.mensaje}`, 'success');
          this.router.navigate(['/panel-clientes']);
        },
        err => {
          swal('Error', 'Ha ocurrido un error, revisa que los datos ingresados sean validos', 'error');
        });
    }
  }

}
