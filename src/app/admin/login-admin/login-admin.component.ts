import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";
import {AuthService} from '../../login/auth.service';
import {Router} from '@angular/router';
import {Usuario} from '../../usuario/usuario';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html'
})


export class LoginAdminComponent implements OnInit {

  usuario: Usuario;

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit() {

    // Inicializacion de variables
    this.usuario.username = '';
    this.usuario.password = '';


    // Revisa si el usuario esta autenticado, para redireccionar
    if (this.authService.isAuthenticated()) {
      swal('Acceso invalido', `Hola ${this.authService.usuario.nombre}, ya te encuentras logueado`, 'info');
      this.router.navigate(['/panel-clientes']);
    }
  }


  // Login como Admin
  loginAdmin(): void {
    console.log('se esta logueando');
    // Revisa que no esten vacios los campos
    if (this.usuario.username.trim() === '' || this.usuario.password.trim() === '') {
      swal('Error de ingreso', 'Username o Password vacios', 'error');
      return;
    }

    // Se realiza el login
    this.authService.login(this.usuario).subscribe(
      response => {
        // Guardar el usuario
        this.authService.guardarUsuario(response.access_token);

        // Guardar el token
        this.authService.guardarToken(response.access_token);

        // Se crea la variable usuario
        const usuario = this.authService.usuario;

        // Redirecciona a la pagina principal con mensaje de bienvenida
        swal('Bienvenido', `${usuario.nombre}, has iniciado sesión correctamente`, 'success');
        this.router.navigate(['/panel-clientes']);
      },
      error => {
        if (error.status === 400) {
          swal('Error Login', 'Username o Password incorrectos', 'error');
        }
      });
  }

}
