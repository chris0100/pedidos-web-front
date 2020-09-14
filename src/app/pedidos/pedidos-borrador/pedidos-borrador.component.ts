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

  constructor(private pedidosService: PedidoService, private router: Router,
              private authService: AuthService) {
  }


  ngOnInit(): void {

    // Remover la busqueda del historial de pedidos, y listaItemProductosSelect
    sessionStorage.removeItem('pedidosUnoEEHistorial');
    sessionStorage.removeItem('listaItemPedidoSelect');

    // Obtener el listado de pedidos en borrador
    this.pedidosService.listarPedidosBorradorJava(this.authService.usuario.nit).subscribe(
      obj => {
        this.pedidos = obj;
        console.log(this.pedidos);
      });
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

}
















