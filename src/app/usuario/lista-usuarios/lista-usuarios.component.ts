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
        this.data = obj;
        this.usuarios = obj;
        this.showSpinner = false;
      });
    this.showSpinner = true;

    // Inicializacion para cargar js
    new tablas();

  }


  searchNombreResponsable(term: string) {
    console.log(this.filterData);
    if (this.filterData === undefined) {
      this.data = this.usuarios;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }


    if (!term) {
      console.log('no envia nada');
      this.filterData = this.usuarios;
      this.data = this.filterData;
    } else {
      console.log('si envia algo');
      this.filterData = this.data.filter(x => {
        if (x.nombre != null) {
          return x.nombre.toLowerCase().includes(term.toLowerCase());
        }
      });
      this.data = this.filterData;
      console.log(this.filterData);
      }
    }


  searchNit(term: string) {
    console.log(this.filterData);
    if (this.filterData === undefined) {
      this.data = this.usuarios;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }

    if (!term) {
      console.log('no envia nada');
      this.filterData = this.usuarios;
      this.data = this.filterData;
    } else {
      console.log('si envia algo');
      this.filterData = this.data.filter(x => {
        if (x.nit != null) {
          return x.nit.toLowerCase().includes(term.toLowerCase());
        }
      });
      this.data = this.filterData;
      console.log(this.filterData);
    }
  }



  searchRazon(term: string) {
    console.log(this.filterData);
    if (this.filterData === undefined) {
      this.data = this.usuarios;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }

    if (!term) {
      console.log('no envia nada');
      this.filterData = this.usuarios;
      this.data = this.filterData;
    } else {
      console.log('si envia algo');
      this.filterData = this.data.filter(x => {
        if (x.cliente != null) {
          return x.cliente.toLowerCase().includes(term.toLowerCase());
        }
      });
      this.data = this.filterData;
      console.log(this.filterData);
    }
  }



  searchCorreo(term: string) {
    console.log(this.filterData);
    if (this.filterData === undefined) {
      this.data = this.usuarios;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }

    if (!term) {
      console.log('no envia nada');
      this.filterData = this.usuarios;
      this.data = this.filterData;
    } else {
      console.log('si envia algo');
      this.filterData = this.data.filter(x => {
        if (x.cliente != null) {
          return x.cliente.toLowerCase().includes(term.toLowerCase());
        }
      });
      this.data = this.filterData;
      console.log(this.filterData);
    }
  }




  searchUsername(term: string) {
    console.log(this.filterData);
    if (this.filterData === undefined) {
      this.data = this.usuarios;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }

    if (!term) {
      console.log('no envia nada');
      this.filterData = this.usuarios;
      this.data = this.filterData;
    } else {
      console.log('si envia algo');
      this.filterData = this.data.filter(x => {
        if (x.cliente != null) {
          return x.cliente.toLowerCase().includes(term.toLowerCase());
        }
      });
      this.data = this.filterData;
      console.log(this.filterData);
    }
  }



  searchSucursal(term: string) {
    console.log(this.filterData);
    if (this.filterData === undefined) {
      this.data = this.usuarios;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }

    if (!term) {
      console.log('no envia nada');
      this.filterData = this.usuarios;
      this.data = this.filterData;
    } else {
      console.log('si envia algo');
      this.filterData = this.data.filter(x => {
        if (x.cliente != null) {
          return x.cliente.toLowerCase().includes(term.toLowerCase());
        }
      });
      this.data = this.filterData;
      console.log(this.filterData);
    }
  }


  searchPuntoEnvio(term: string) {
    console.log(this.filterData);
    if (this.filterData === undefined) {
      this.data = this.usuarios;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }

    if (!term) {
      console.log('no envia nada');
      this.filterData = this.usuarios;
      this.data = this.filterData;
    } else {
      console.log('si envia algo');
      this.filterData = this.data.filter(x => {
        if (x.cliente != null) {
          return x.cliente.toLowerCase().includes(term.toLowerCase());
        }
      });
      this.data = this.filterData;
      console.log(this.filterData);
    }
  }



























}
