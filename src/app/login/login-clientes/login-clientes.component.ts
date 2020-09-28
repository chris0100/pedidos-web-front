import {Component, OnInit} from '@angular/core';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {Usuario} from '../../usuario/usuario';
import {AuthService} from '../auth.service';
import {DataService} from '../../data.service';

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


  constructor(private router: Router, private authService: AuthService, private data: DataService) {
    this.usuario = new Usuario();
    this.listadoSucursal = [];
    this.listadoPuntoEnvio = [];
    this.validaEntidad = false;
  }


  ngOnInit(): void {

    // Revisa si el usuario esta autenticado, para redireccionar
    if (this.authService.isAuthenticated()) {
      swal('Acceso invalido', `Hola ${this.authService.usuario.nombre}, ya te encuentras logueado`, 'info');
      this.router.navigate(['/panel-clientes']);
    }
  }



  // Funcion que muestra la lista de sucursales enviada desde java.
  obtenerSucursal(): void {
    this.listadoSucursal = [];
    this.authService.obtenerSucursalJava(this.usuario.nit).subscribe(
      obj => this.listadoSucursal.push(...obj)
    );
  }


  // Obtiene la lista de puntos de envio
  obtenerPuntoEnvio(): void {
    this.listadoPuntoEnvio = [];
    this.authService.obtenerPuntoEnvioJava(this.usuario.nit, this.sucursalSeleccionada).subscribe(
      obj => this.listadoPuntoEnvio.push(...obj)
    );
    console.log(this.listadoPuntoEnvio);
    this.validarEntidadDinamica();
  }


  validarEntidadDinamica(): void {
    this.authService.validarEntidadDinamicaJava(this.usuario.nit, this.sucursalSeleccionada).subscribe(
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
    if (this.usuario.nit.trim() === '' || this.usuario.password.trim() === '' ) {
      swal('Error de ingreso', 'Username o Password vacios', 'error');
      return;
    }

    if (this.sucursalSeleccionada == null || this.puntoEnvioSeleccionado == null) {
      swal('Error de ingreso', 'Debes seleccionar una sucursal con un punto de envio para continuar', 'error');
      return;
    }


    if (this.validaEntidad) {
      console.log('usuario que se va a loguear');
      console.log(this.usuario);
      this.usuario.username = this.sucursalSeleccionada.substring(0, 3) + this.puntoEnvioSeleccionado.substring(0, 3) + this.usuario.nit;


      // Revisamos primero si hay posibilidad de que sea un usuario nuevo
      if (this.usuario.nit === this.usuario.password) {
        this.authService.validaUsuarioNuevoHabilitado(this.usuario.nit, this.usuario.password, this.usuario.username).subscribe(
          obj => {
            console.log(obj);
            // si en la posicion 1 trae error significa que es un usuario nuevo
            if (!obj[1].includes('error')) {

              // Pasar datos importantes al usuario
              /// REVISAR LOS CMAPOS DE USUARIO PARA SER MODIFICADOS Y ENVIARLOS CORRECTAMENTE A SPRING.
              this.usuario.cliente = obj[0];
              this.usuario.rolesPrincipal.push('CLI');
              this.usuario.id_sucursal = this.sucursalSeleccionada.substring(0, 3);
              this.usuario.descripcionSucursal = this.sucursalSeleccionada.substring(6, this.sucursalSeleccionada.length);
              this.usuario.id_punto_envio = this.puntoEnvioSeleccionado.substring(0, 3);
              this.usuario.descripcion_punto_envio = this.puntoEnvioSeleccionado.substring(6, this.puntoEnvioSeleccionado.length);
              this.usuario.nombre = '';
              this.usuario.email = '';
              this.usuario.password = '';
              // recordar colocar intentos bloqueos 3 en java spring

              this.data.storage = this.usuario;

              // Se redirecciona a la pagina de registro nuevo usuario
              swal('Correcto', 'Diligencia la siguiente información para completar tu usuario', 'success');
              this.router.navigate(['registro-usuario-nuevo']);
              return;
            }
            else {
              this.loginNormal();
            }
          });
      }
      else{
        this.loginNormal();
      }
    }
    // tslint:disable-next-line:one-line
    else{
      // Redirecciona a la pagina login con mensaje
      swal('Error', `Su cuenta no se encuentra habilitada`, 'error');
    }

  }


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

        // Revisa si tiene el primer Login en true, sino lo envia al panel clientes
        if (usuario.primerLogin) {
          this.router.navigate(['/actualizar-password']);
          return;
        } else {
          // Redirecciona a la pagina principal con mensaje de bienvenida
          swal('Bienvenido', `${usuario.nombre}, has iniciado sesión correctamente`, 'success');
          this.router.navigate(['/panel-clientes']);
        }
      },
      error => {
        if (error.status === 400 || error.status === 401) {
          swal('Error Login', 'Username o Password incorrectos', 'error');
        }
      }
    );
  }


}
