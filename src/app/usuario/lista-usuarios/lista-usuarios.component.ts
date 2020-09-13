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

  constructor(private usuariosService: UsuariosService, private router: Router) {}

  ngOnInit(): void {

    // Remover la busqueda del historial de pedidos, y listaItemProductosSelect
    sessionStorage.removeItem('pedidosUnoEEHistorial');
    sessionStorage.removeItem('listaItemPedidoSelect');

    // Inicializacion para cargar js
    // new tablas();


    // Obtener listado de clientes
    this.usuariosService.listarUsuariosJava().subscribe(
      obj => {
        this.usuarios = obj;
        console.log(this.usuarios);
        console.log(obj);
      }
    );
  }

}
