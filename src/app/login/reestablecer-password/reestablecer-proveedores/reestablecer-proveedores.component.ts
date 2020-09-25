import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../../usuario/usuario';
import {Router} from '@angular/router';
import {AuthService} from '../../auth.service';
import swal from 'sweetalert2';
import {UsuariosService} from '../../../usuario/usuarios.service';

@Component({
  selector: 'app-reestablecer-proveedores',
  templateUrl: './reestablecer-proveedores.component.html',
  styleUrls: ['./reestablecer-proveedores.component.css']
})
export class ReestablecerProveedoresComponent implements OnInit {

  usuario: Usuario;

  constructor(private router: Router, private authService: AuthService,
              private usuarioService: UsuariosService) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    this.usuario.username = '';
    this.usuario.email = '';

    // Revisa si el usuario esta autenticado, para redireccionar
    if (this.authService.isAuthenticated()) {
      swal('Acceso invalido', `Hola ${this.authService.usuario.nombre}, ya te encuentras logueado`, 'info');
      this.router.navigate(['/panel-clientes']);
    }
  }



  // Clic en recuperar
  recuperarPassword(): void {
    console.log('clic en el boton de recuperar');

    // Revisa que no esten vacios los campos
    if (this.usuario.username.trim() === '' || this.usuario.email.trim() === '' ) {
      swal('Error de recuperación', 'Username o Correo Electrónico vacios', 'error');
      return;
    }


    // Localiza el correo del usuario proveedor
    this.usuarioService.generarTokenUsuarioJava(this.usuario.email, this.usuario.username).subscribe(
      obj => {
        console.log(obj);
      });


  }





}
