import {Component, OnInit} from '@angular/core';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {Usuario} from '../../usuario/usuario';
import {AuthService} from '../auth.service';
import {DataService} from '../../data.service';

@Component({
  selector: 'app-login-proveedores',
  templateUrl: './login-proveedores.component.html'
})


export class LoginProveedoresComponent implements OnInit {

  // Objeto Usuario
  usuario: Usuario;

  constructor(private router: Router, public authService: AuthService, private data: DataService) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    this.usuario.username = '';
    this.usuario.password = '';

    // Revisa si el usuario esta autenticado, para redireccionar
    if (this.authService.isAuthenticated()) {
      swal('Acceso invalido', `Hola ${this.authService.usuario.nombre}, ya te encuentras autenticado`, 'info');
      this.router.navigate(['/panel-principal']);
    }
  }


  // Login por el menu de proveedor.
  loginProveedor(): void {

    // Revisa que no esten vacios los campos
    if (this.usuario.username.trim() === '' || this.usuario.password.trim() === '') {
      swal('Error de ingreso', 'El nit o la contraseña se encuentran sin diligenciar', 'error');
      return;
    }

    // Se revisa la posibilidad de que sea un usuario nuevo
    if (this.usuario.username === this.usuario.password) {
      this.authService.validarProveedorNuevoHabilitado(this.usuario.username, this.usuario.password).subscribe(
        obj => {
          console.log(obj);
          // Si en la posicion 1 tiene error, significa que es un usuario nuevo
          if (obj[1].includes('error')) {

            // Se pasan datos importantes al usuario (idSucursal,descsucursal,idPuntoEnvio,desPuntoEnv = null)
            this.usuario.cliente = obj[0];
            this.usuario.rolesPrincipal.push('PRO');
            // TEMPORAL
            // this.usuario.rolesPrincipal.push('ADMIN');
            // TEMPORAL
            this.usuario.nombre = '';
            this.usuario.email = '';
            this.usuario.password = '';
            this.usuario.primerLogin = false;
            this.usuario.nit = this.usuario.username;

            this.data.storage = this.usuario;

            // Se redirecciona a la pagina de registro nuevo usuario
            swal('Correcto', 'Diligencia la siguiente información para completar tu usuario', 'success');
            this.router.navigate(['/registro-usuario-nuevo']);
            return;
          }
          else {
            this.loginNormal();
          }
        });
    }
    else {
      this.loginNormal();
    }
  }



  // Login normal
  loginNormal(): void {
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
          swal('Bienvenido', `${usuario.nombre}, has iniciado sesión correctamente`, 'success');
          this.router.navigate(['/panel-principal']);
        }
      },
      error => {
        if (error.status === 400 || error.status === 401) {
          swal('Error Login', 'Autenticación incorrecta', 'error');
        }
      });
  }

}
