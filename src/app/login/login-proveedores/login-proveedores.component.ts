import {Component, OnInit} from '@angular/core';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {Usuario} from '../../usuario/usuario';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login-proveedores',
  templateUrl: './login-proveedores.component.html'
})


export class LoginProveedoresComponent implements OnInit {

  // Objeto Usuario
  usuario: Usuario;

  constructor(private router: Router, private authService: AuthService) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    this.usuario.username = '';
    this.usuario.password = '';

    // Revisa si el usuario esta autenticado, para redireccionar
    if (this.authService.isAuthenticated()) {
      swal('Acceso invalido', `Hola ${this.authService.usuario.nombre}, ya te encuentras logueado`, 'info');
      this.router.navigate(['/panel-clientes']);
    }
  }


  // Login por el menu de proveedor.
  loginProveedor(): void {

    // Revisa que no esten vacios los campos
    if (this.usuario.username.trim() === '' || this.usuario.password.trim() === '') {
      swal('Error de ingreso', 'Username o Password vacios', 'error');
      return;
    }

    // Se llama al servicio para realizar el login
    this.authService.login(this.usuario).subscribe(
      response => {

        // Guardar el usuario
        this.authService.guardarUsuario(response.access_token);

        // Guardar el token
        this.authService.guardarToken(response.access_token);

        // Se crea la variable usuario
        const usuario = this.authService.usuario;
        console.log(usuario.primerLogin);

        // Revisa si tiene el primer Login en true, sino lo envia al panel clientes
        if (usuario.primerLogin) {
          this.router.navigate(['/actualizar-password']);
          return;
        }
        else {
          // Redirecciona a la pagina principal con mensaje de bienvenida
          swal('Login', `Bienvenido ${usuario.nombre}, has iniciado sesión correctamente`, 'success');
          this.router.navigate(['/panel-clientes']);
        }
      },
      error => {
        if (error.status === 400) {
          swal('Error Login', 'Username o Password incorrectos', 'error');
        }
      });
  }

}
