import {Component, OnInit} from '@angular/core';
import {PedidoService} from '../pedido.service';
import {Router} from '@angular/router';
import {AuthService} from '../../login/auth.service';
import {Pedido} from '../pedido';
import swal from 'sweetalert2';


// carga de archivo para mdbootstrap
// declare var historial: any;


@Component({
  selector: 'app-pedidos-verificacion',
  templateUrl: './pedidos-verificacion.component.html'
})


export class PedidosVerificacionComponent implements OnInit {

  pedidos: Pedido[];

  // Spinner
  showSpinner: boolean;

  // Parte nueva para ejemplo de manejo de tablas
  data;
  filterData;
  // Parte nueva para ejemplo de manejo de tablas

  constructor(private pedidosService: PedidoService, private router: Router,
              public authService: AuthService) {
  }


  ngOnInit(): void {
    // loading window
    this.showSpinner = false;

    // Remover la busqueda del historial de pedidos, y listaItemProductosSelect
    sessionStorage.removeItem('pedidosUnoEEHistorial');
    sessionStorage.removeItem('listaItemPedidoSelect');

    // Obtener el listado de pedidos en verificacion
    this.pedidosService.listarPedidosVerificacionJava(this.authService.usuario.nit).subscribe(
      obj => {
        this.pedidos = obj;
        this.data = obj;
        console.log(this.pedidos);
        this.showSpinner = false;

        // Se envia mensaje sino encuentra resultados
        if (this.pedidos == null || this.pedidos.length === 0) {
          swal('Advertencia', 'No se han encontrado resultados en la busqueda', 'warning');
        }
      });
    this.showSpinner = true;
  }






  searchId(term: string) {
    console.log(this.filterData);
    if (this.filterData === undefined) {
      this.data = this.pedidos;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }


    if (!term) {
      console.log('no envia nada');
      this.filterData = this.pedidos;
      this.data = this.filterData;
    } else {
      console.log('si envia algo');
      this.filterData = this.data.filter(x => {
        const valor = x.id + '';
        if (valor != null) {
          return valor.toLowerCase().includes(term.toLowerCase());
        }
      });
      this.data = this.filterData;
      console.log(this.filterData);
    }
  }





  searchOrdenCompra(term: string) {
    console.log(this.filterData);
    if (this.filterData === undefined) {
      this.data = this.pedidos;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }


    if (!term) {
      console.log('no envia nada');
      this.filterData = this.pedidos;
      this.data = this.filterData;
    } else {
      console.log('si envia algo');
      this.filterData = this.data.filter(x => {
        if (x.oc != null) {
          return x.oc.toLowerCase().includes(term.toLowerCase());
        }
      });
      this.data = this.filterData;
      console.log(this.filterData);
    }
  }






  searchNombre(term: string) {
    console.log(this.filterData);
    if (this.filterData === undefined) {
      this.data = this.pedidos;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }


    if (!term) {
      console.log('no envia nada');
      this.filterData = this.pedidos;
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





  searchNota(term: string) {
    console.log(this.filterData);
    if (this.filterData === undefined) {
      this.data = this.pedidos;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }


    if (!term) {
      console.log('no envia nada');
      this.filterData = this.pedidos;
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





  searchFacturar(term: string) {
    console.log(this.filterData);
    if (this.filterData === undefined) {
      this.data = this.pedidos;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }


    if (!term) {
      console.log('no envia nada');
      this.filterData = this.pedidos;
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
      this.data = this.pedidos;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }


    if (!term) {
      console.log('no envia nada');
      this.filterData = this.pedidos;
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
