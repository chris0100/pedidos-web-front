import { Component, OnInit } from '@angular/core';
import {Pedido} from '../../pedidos/pedido';
import {PedidoService} from '../../pedidos/pedido.service';
import {AuthService} from '../../login/auth.service';
import swal from "sweetalert2";

@Component({
  selector: 'app-lista-errores',
  templateUrl: './lista-errores.component.html'
})



export class ListaErroresComponent implements OnInit {

  // Lista de pedidos de errores
  listaPedidosErrorAsesor: Pedido[];


  // Spinner
  showSpinner: boolean;

  // Parte nueva para ejemplo de manejo de tablas
  data;
  filterData;
  // Parte nueva para ejemplo de manejo de tablas

  constructor(private pedidosService: PedidoService, public authService: AuthService) { }


  ngOnInit() {
    this.showSpinner = false;

    // Obtener el listado de pedidos error de asesor  RECORDAR CAMBIAR 66837958
    this.pedidosService.listarPedidosErrorAsesorJava(this.authService.usuario.nit).subscribe(
      obj => {
        console.log(obj);
        this.listaPedidosErrorAsesor = obj;
        this.data = obj;
        this.showSpinner = false;

        if ( this.listaPedidosErrorAsesor == null || this.listaPedidosErrorAsesor.length === 0) {
          swal('Advertencia', 'No se han encontrado pedidos con error', 'warning');
        }
      });
    this.showSpinner = true;
  }


  searchConsecutivo(term: string) {
    console.log(this.filterData);
    if (this.filterData === undefined) {
      this.data = this.listaPedidosErrorAsesor;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }


    if (!term) {
      console.log('no envia nada');
      this.filterData = this.listaPedidosErrorAsesor;
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
      this.data = this.listaPedidosErrorAsesor;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }


    if (!term) {
      console.log('no envia nada');
      this.filterData = this.listaPedidosErrorAsesor;
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
      this.data = this.listaPedidosErrorAsesor;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }


    if (!term) {
      console.log('no envia nada');
      this.filterData = this.listaPedidosErrorAsesor;
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
      this.data = this.listaPedidosErrorAsesor;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }


    if (!term) {
      console.log('no envia nada');
      this.filterData = this.listaPedidosErrorAsesor;
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
      this.data = this.listaPedidosErrorAsesor;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }


    if (!term) {
      console.log('no envia nada');
      this.filterData = this.listaPedidosErrorAsesor;
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
      this.data = this.listaPedidosErrorAsesor;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }


    if (!term) {
      console.log('no envia nada');
      this.filterData = this.listaPedidosErrorAsesor;
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
