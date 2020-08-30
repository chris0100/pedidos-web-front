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
    swal('Logout', `Correcto, ${this.authService.usuario.username}, has cerrado sesion correctamente`, 'success');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
