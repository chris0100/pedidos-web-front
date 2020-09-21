import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";
import {AuthService} from '../../login/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html'
})


export class LoginAdminComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // Revisa si el usuario esta autenticado, para redireccionar
    if (this.authService.isAuthenticated()) {
      swal('Acceso invalido', `Hola ${this.authService.usuario.nombre}, ya te encuentras logueado`, 'info');
      this.router.navigate(['/panel-clientes']);
    }
  }

}
