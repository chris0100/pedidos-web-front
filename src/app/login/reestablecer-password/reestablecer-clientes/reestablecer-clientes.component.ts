import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../../usuario/usuario';
import {Router} from '@angular/router';
import {AuthService} from '../../auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-reestablecer-clientes',
  templateUrl: './reestablecer-clientes.component.html',
  styleUrls: ['./reestablecer-clientes.component.css']
})
export class ReestablecerClientesComponent implements OnInit {

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
  }

  ngOnInit() {
    this.usuario = new Usuario();
    this.usuario.username = '';
    this.usuario.email = '';
    this.sucursalSeleccionada = '';
    this.puntoEnvioSeleccionado = '';
    this.listadoSucursal = [];
    this.listadoPuntoEnvio = [];
    this.validaEntidad = false;

    // Revisa si el usuario esta autenticado, para redireccionar
    if (this.authService.isAuthenticated()) {
      swal('Acceso invalido', `Hola ${this.authService.usuario.nombre}, ya te encuentras logueado`, 'info');
      this.router.navigate(['/panel-clientes']);
    }
  }



  // Funcion que muestra la lista de sucursales enviada desde java.
  obtenerSucursal(): void {
    console.log(this.usuario.username);
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


  recuperarPassword(): void {
    console.log('clic en el boton de recuperar');

    // Revisa que no esten vacios los campos
    if (this.usuario.username.trim() === '' || this.usuario.email.trim() === '' ) {
      swal('Error de recuperación', 'Username o Correo Electrónico vacios', 'error');
      return;
    }

    if (this.sucursalSeleccionada.trim() === '' || this.puntoEnvioSeleccionado.trim() === '') {
      swal('Error de recuperación', 'Debes seleccionar una sucursal con un punto de envio para continuar', 'error');
      return;
    }


  }











}
