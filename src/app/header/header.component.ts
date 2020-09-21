import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AuthService} from '../login/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})


export class HeaderComponent implements OnInit {

  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
  }


  // Cerrar sesion
  logout(): void {
    swal('Hasta Pronto', `${this.authService.usuario.nombre}, has cerrado sesión correctamente. Gracias por usar nuestros servicios`, 'success');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
