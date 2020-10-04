import { Component, OnInit } from '@angular/core';
import {Usuario} from '../usuario';
import {UsuariosService} from '../usuarios.service';
import {HttpClient} from '@angular/common/http';


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

  // Parte nueva para ejemplo de manejo de tablas
  dataUrl = 'https://jsonplaceholder.typicode.com/users';
  data;
  filterData;
  // Parte nueva para ejemplo de manejo de tablas

  constructor(private usuariosService: UsuariosService, private http: HttpClient) {}

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



    // **************************************************
    // Parte nueva para ejemplo de manejo de tablas
    this.obtenerDatosUrl();
    // Parte nueva para ejemplo de manejo de tablas
    // **************************************************
  }


  search(term: string) {
    console.log(term);
    if (!term) {
      this.filterData = this.data;
      this.obtenerDatosUrl();
    } else {
      this.filterData = this.data.filter(x =>
        x.name.trim().toLowerCase().includes(term.trim().toLowerCase()) || x.email.trim().toLowerCase().includes(term.trim().toLowerCase())
      );
      this.data = this.filterData;
      console.log(this.filterData);
    }
  }


  // Obtener datos de la url
  private obtenerDatosUrl(): void {
    this.http.get(this.dataUrl)
      .subscribe(
        res => {
          this.data = res;
        },
        err => {
          console.log('Error occured');
        }
      );
  }


}
