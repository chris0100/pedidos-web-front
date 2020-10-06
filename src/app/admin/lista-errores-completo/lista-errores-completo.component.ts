import { Component, OnInit } from '@angular/core';
import {Pedido} from '../../pedidos/pedido';
import {PedidoService} from '../../pedidos/pedido.service';
import {AuthService} from '../../login/auth.service';

@Component({
  selector: 'app-lista-errores-completo',
  templateUrl: './lista-errores-completo.component.html'
})


export class ListaErroresCompletoComponent implements OnInit {

  // Lista de errores completo
  listaPedidoError: Pedido[];

  // Spinner
  showSpinner: boolean;

  // Parte nueva para ejemplo de manejo de tablas
  data;
  filterData;
  // Parte nueva para ejemplo de manejo de tablas

  constructor(private pedidosService: PedidoService, public authService: AuthService) { }


  ngOnInit() {
    this.showSpinner = false;

    // Obtener el listado de pedidos error completo
    this.pedidosService.listarPedidosErrorCompletoJava().subscribe(
      obj => {
        console.log(obj);
        this.listaPedidoError = obj;
        this.data = obj;
        this.showSpinner = false;
      }
    );
    this.showSpinner = true;
  }



  searchConsecutivo(term: string) {
    console.log(this.filterData);
    if (this.filterData === undefined) {
      this.data = this.listaPedidoError;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }


    if (!term) {
      console.log('no envia nada');
      this.filterData = this.listaPedidoError;
      this.data = this.filterData;
    } else {
      console.log('si envia algo');
      this.filterData = this.data.filter(x => {
        const idString = x.id + '';
        console.log(idString);
        if (idString != null) {
          return idString.includes(term);
        }
      });
      this.data = this.filterData;
      console.log(this.filterData);
    }
  }



  searchOrdenCompra(term: string) {
    console.log(this.filterData);
    if (this.filterData === undefined) {
      this.data = this.listaPedidoError;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }


    if (!term) {
      console.log('no envia nada');
      this.filterData = this.listaPedidoError;
      this.data = this.filterData;
    } else {
      console.log('si envia algo');
      this.filterData = this.data.filter(x => {
       if (x.oc != null) {
          return x.oc.includes(term);
        }
      });
      this.data = this.filterData;
      console.log(this.filterData);
    }
  }



  searchUsuario(term: string) {
    console.log(this.filterData);
    if (this.filterData === undefined) {
      this.data = this.listaPedidoError;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }


    if (!term) {
      console.log('no envia nada');
      this.filterData = this.listaPedidoError;
      this.data = this.filterData;
    } else {
      console.log('si envia algo');
      this.filterData = this.data.filter(x => {
        if (x.idUsuario.nombre != null) {
          return x.idUsuario.nombre.toLowerCase().includes(term.toLowerCase());
        }
      });
      this.data = this.filterData;
      console.log(this.filterData);
    }
  }




  searchNotas(term: string) {
    console.log(this.filterData);
    if (this.filterData === undefined) {
      this.data = this.listaPedidoError;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }


    if (!term) {
      console.log('no envia nada');
      this.filterData = this.listaPedidoError;
      this.data = this.filterData;
    } else {
      console.log('si envia algo');
      this.filterData = this.data.filter(x => {
        if (x.nota != null) {
          return x.nota.toLowerCase().includes(term.toLowerCase());
        }
      });
      this.data = this.filterData;
      console.log(this.filterData);
    }
  }




  searchSucursalFacturar(term: string) {
    console.log(this.filterData);
    if (this.filterData === undefined) {
      this.data = this.listaPedidoError;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }


    if (!term) {
      console.log('no envia nada');
      this.filterData = this.listaPedidoError;
      this.data = this.filterData;
    } else {
      console.log('si envia algo');
      this.filterData = this.data.filter(x => {
        if (x.sucursalFacturar != null) {
          return x.sucursalFacturar.toLowerCase().includes(term.toLowerCase());
        }
      });
      this.data = this.filterData;
      console.log(this.filterData);
    }
  }





  searchSucursalRemisionar(term: string) {
    console.log(this.filterData);
    if (this.filterData === undefined) {
      this.data = this.listaPedidoError;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }


    if (!term) {
      console.log('no envia nada');
      this.filterData = this.listaPedidoError;
      this.data = this.filterData;
    } else {
      console.log('si envia algo');
      this.filterData = this.data.filter(x => {
        if (x.sucursalRemisionar != null) {
          return x.sucursalRemisionar.toLowerCase().includes(term.toLowerCase());
        }
      });
      this.data = this.filterData;
      console.log(this.filterData);
    }
  }


}
