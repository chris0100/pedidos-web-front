import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../../usuario/usuario';
import {Router} from '@angular/router';
import {AuthService} from '../../auth.service';
import swal from 'sweetalert2';
import {UsuariosService} from '../../../usuario/usuarios.service';

@Component({
  selector: 'app-reestablecer-proveedores',
  templateUrl: './reestablecer-proveedores.component.html'
})


export class ReestablecerProveedoresComponent implements OnInit {

  usuario: Usuario;
  showSpinner: boolean;

  constructor(private router: Router, public authService: AuthService,
              private usuarioService: UsuariosService) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    this.usuario.nit = '';
    this.usuario.email = '';
    this.showSpinner = false;

    // Revisa si el usuario esta autenticado, para redireccionar
    if (this.authService.isAuthenticated()) {
      swal('Acceso invalido', `Hola ${this.authService.usuario.nombre}, ya te encuentras logueado`, 'info');
      this.router.navigate(['/panel-principal']);
    }
  }



  // Clic en recuperar contraseña
  recuperarPassword(): void {
    console.log('clic en el boton de recuperar');

    // Revisa que no esten vacios los campos
    if (this.usuario.nit.trim() === '' || this.usuario.email.trim() === '' ) {
      swal('Error de recuperación', 'Username o Correo Electrónico vacios', 'error');
      return;
    }


    // Localiza el correo del usuario proveedor
    this.usuarioService.generarTokenProveedorJava(this.usuario.email, this.usuario.nit).subscribe(
      obj => {
        console.log(obj);
        this.router.navigate(['/login']);
        swal('Correcto', 'Revisa tu bandeja de email para reestablecer la contraseña', 'success');
        this.showSpinner = false;
      },
      error => {
        if (error.status === 404 || error.status === 500) {
          swal('Error', 'Verifica los datos ingresados', 'error');
          this.showSpinner = false;
          return;
        }
      });
    this.showSpinner = true;
  }





}
