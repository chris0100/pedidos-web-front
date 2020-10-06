import {Component, OnInit} from '@angular/core';
import {Pedido} from '../pedido';
import {PedidoService} from '../pedido.service';
import {Router} from '@angular/router';
import {AuthService} from '../../login/auth.service';
import swal from 'sweetalert2';

// carga de archivo js para mdbootstrap
// declare var tablas: any;

@Component({
  selector: 'app-pedidos-borrador',
  templateUrl: './pedidos-borrador.component.html'
})


export class PedidosBorradorComponent implements OnInit {

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

    // Remover la busqueda del historial de pedidos, y listaItemProductosSelect
    sessionStorage.removeItem('pedidosUnoEEHistorial');
    sessionStorage.removeItem('listaItemPedidoSelect');

    // Obtener el listado de pedidos en borrador
    this.pedidosService.listarPedidosBorradorJava(this.authService.usuario.nit).subscribe(
      obj => {
        this.data = obj;
        this.pedidos = obj;
        console.log(this.data);
        this.showSpinner = false;

        // Se envia mensaje sino encuentra resultados
        if (this.pedidos == null || this.pedidos.length === 0) {
          swal('Advertencia', 'No se han encontrado resultados en la busqueda', 'warning');
        }
      });
    this.showSpinner = true;
  }



  eliminarPedidoBorrador(pedidoBorrador: Pedido): void {
    swal({
      title: 'Eliminar Borrador',
      text: `¿Desea eliminar el Borrador con código ${pedidoBorrador.id}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then(result => {
      if (result.value) {
        this.pedidosService.eliminarBorradorJava(pedidoBorrador.id).subscribe(
          () => {
            this.pedidos = this.pedidos.filter(obj => obj !== pedidoBorrador);
            swal('Borrador Eliminado!',
              `El borrador con código ${pedidoBorrador.id} ha sido eliminado con éxito`,
              'success');
          });
      }
    });
  }




  searchCodigo(term: string) {
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
          return x.oc.includes(term);
        }
      });
      this.data = this.filterData;
      console.log(this.filterData);
    }
  }



  searchUsuarioPedido(term: string) {
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

        if (x.idUsuario.cliente != null) {
          return x.idUsuario.cliente.includes(term);
        }
      });
      this.data = this.filterData;
      console.log(this.filterData);
    }
  }


  searchNotas(term: string) {
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
          return x.nota.includes(term);
        }
      });
      this.data = this.filterData;
      console.log(this.filterData);
    }
  }



  searchSucursalFacturar(term: string) {
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
          return x.sucursalFacturar.includes(term);
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
          return x.sucursalRemisionar.includes(term);
        }
      });
      this.data = this.filterData;
      console.log(this.filterData);
    }
  }



}
















