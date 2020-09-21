import { Component, OnInit } from '@angular/core';
import {Usuario} from '../usuario';
import {UsuariosService} from '../usuarios.service';
import {Router} from '@angular/router';

// carga de variable para mdbootstrap
declare var tablas: any;

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html'
})


export class ListaUsuariosComponent implements OnInit {

  usuarios: Usuario[];

  // Spinner
  showSpinner: boolean;

  constructor(private usuariosService: UsuariosService, private router: Router) {}

  ngOnInit(): void {
    this.showSpinner = false;

    // Remover la busqueda del historial de pedidos, y listaItemProductosSelect
    sessionStorage.removeItem('pedidosUnoEEHistorial');
    sessionStorage.removeItem('listaItemPedidoSelect');


    // Obtener listado de clientes
    this.usuariosService.listarUsuariosJava().subscribe(
      obj => {
        this.usuarios = obj;
        console.log(this.usuarios);
        console.log(obj);
        this.showSpinner = false;
      });
    this.showSpinner = true;

    // Inicializacion para cargar js
    new tablas();
  }


}
