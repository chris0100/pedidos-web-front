import {Component, OnInit} from '@angular/core';
import {PedidoService} from '../pedido.service';
import {Router} from '@angular/router';
import {AuthService} from '../../login/auth.service';
import {Pedido} from '../pedido';
import swal from "sweetalert2";

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

  constructor(private pedidosService: PedidoService, private router: Router,
              public authService: AuthService) {
  }


  ngOnInit(): void {

    this.showSpinner = false;

    // Remover la busqueda del historial de pedidos, y listaItemProductosSelect
    sessionStorage.removeItem('pedidosUnoEEHistorial');
    sessionStorage.removeItem('listaItemPedidoSelect');

    // Obtener el listado de pedidos en verificacion
    this.pedidosService.listarPedidosVerificacionJava(this.authService.usuario.nit).subscribe(
      obj => {
        this.pedidos = obj;
        console.log(this.pedidos);
        this.showSpinner = false;

        // Se envia mensaje sino encuentra resultados
        if (this.pedidos == null || this.pedidos.length === 0) {
          swal('Advertencia', 'No se han encontrado resultados en la busqueda', 'warning');
        }
      });
    this.showSpinner = true;
  }

}
