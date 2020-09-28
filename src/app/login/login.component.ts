import { Component, OnInit } from '@angular/core';

// carga de archivo js para mdbootstrap
declare var login: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
    // Destruir el usuarioTemp
    sessionStorage.removeItem('usuarioTemp');

    // Ejecuta el script
    new login();
  }



}
