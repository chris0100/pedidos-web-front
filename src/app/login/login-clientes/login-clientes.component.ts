import {Component, OnInit} from '@angular/core';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {Usuario} from '../../usuario/usuario';
import {AuthService} from '../auth.service';
import {FormControl} from '@angular/forms';
import {Observable, throwError} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';

@Component({
  selector: 'app-login-clientes',
  templateUrl: './login-clientes.component.html'
})


export class LoginClientesComponent implements OnInit {


  // Lista que se llena en el momento de escribir el nit del cliente
  listadoSucursal: string[];

  // Lista que se llena en el momento de seleccionar la sucursal
  listadoPuntoEnvio: string[];

  // Objeto Usuario
  usuario: Usuario;

  // Sucursal seleccionada
  sucursalSeleccionada: string;

  // Punto de envio seleccionado
  puntoEnvioSeleccionado: string;

  // Validacion para entidad dinamica
  validaEntidad: boolean;


  constructor(private router: Router, private authService: AuthService) {
    this.usuario = new Usuario();
    this.listadoSucursal = [];
    this.listadoPuntoEnvio = [];
    this.validaEntidad = false;
  }


  ngOnInit(): void {

    // Revisa si el usuario esta autenticado, para redireccionar
    if (this.authService.isAuthenticated()) {
      swal('Login invalido', `Hola ${this.authService.usuario.username}, ya se encuentra logueado`, 'info');
      this.router.navigate(['/panel-clientes']);
    }
  }



  // Funcion que muestra la lista de sucursales enviada desde java.
  obtenerSucursal(): void {
    this.listadoSucursal = [];
    this.authService.obtenerSucursalJava(this.usuario.username).subscribe(
      obj => this.listadoSucursal.push(...obj)
    );
  }


  // Obtiene la lista de puntos de envio
  obtenerPuntoEnvio(): void {
    this.listadoPuntoEnvio = [];
    this.authService.obtenerPuntoEnvioJava(this.usuario.username, this.sucursalSeleccionada).subscribe(
      obj => this.listadoPuntoEnvio.push(...obj)
    );
    console.log(this.listadoPuntoEnvio);
    this.validarEntidadDinamica();
  }


  validarEntidadDinamica(): void {
    this.authService.validarEntidadDinamicaJava(this.usuario.username, this.sucursalSeleccionada).subscribe(
      obj => {
        if (obj[0] === 'Si') {
          this.validaEntidad = true;
        }
      }
    );
  }




  // Ingreso para redireccionar a el menu de Cliente
  loginCliente(): void {

    // Revisa que no esten vacios los campos
    if (this.usuario.username == null || this.usuario.password == null) {
      swal('Error de ingreso', 'Username o Password vacios', 'error');
      return;
    }

    if (this.sucursalSeleccionada == null || this.puntoEnvioSeleccionado == null) {
      swal('Error de ingreso', 'Debes seleccionar una sucursal con un punto de envio para continuar', 'error');
      return;
    }


    if (this.validaEntidad) {

      // Se llama al servicio para realizar el login
      this.authService.login(this.usuario).subscribe(
        response => {

          // Guardar el usuario
          this.authService.guardarUsuario(response.access_token);

          // Guardar el token
          this.authService.guardarToken(response.access_token);

          // Se crea la variable usuario
          const usuario = this.authService.usuario;

          // Redirecciona a la pagina principal con mensaje de bienvenida
          swal('Login', `Bienvenido ${usuario.username}, has iniciado sesión correctamente`, 'success');
          this.router.navigate(['/panel-clientes']);
        },
        error => {
          if (error.status === 400) {
            swal('Error Login', 'Username o Password incorrectos', 'error');
          }
        }
      );
    }
    // tslint:disable-next-line:one-line
    else{
      // Redirecciona a la pagina login con mensaje
      swal('Error', `Su cuenta no se encuentra habilitada`, 'error');
    }
  }
}
