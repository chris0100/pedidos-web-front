import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-proveedores',
  templateUrl: './login-proveedores.component.html'
})


export class LoginProveedoresComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  // Login por el menu de proveedor.
  loginProveedor(): void {

    // Redirecciona a la pagina principal con mensaje de bienvenida
    swal('Login', 'Bienvenido Proveedor, has iniciado sesión correctamente', 'success');
    this.router.navigate(['/panel-clientes']);
  }

}
