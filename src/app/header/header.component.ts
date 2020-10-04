import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AuthService} from '../login/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})


export class HeaderComponent implements OnInit {

  constructor(public router: Router, public authService: AuthService) { }

  ngOnInit(): void {
  }


  // Cerrar sesion
  logout(): void {
    swal('Hasta Pronto', `${this.authService.usuario.nombre}, has cerrado sesión correctamente. Gracias por usar nuestros servicios`, 'success');
    const tipologin = this.authService.usuario.roles.findIndex(obj => obj === 'ADMIN');
    console.log(tipologin);
    this.authService.logout();
    if (tipologin < 0) {
      this.router.navigate(['/login']);
    }
    else {
      this.router.navigate(['/login-admin']);
    }
  }

}
