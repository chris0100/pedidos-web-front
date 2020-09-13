import {Component, OnInit} from '@angular/core';
import {PedidoService} from '../pedido.service';
import {Router} from '@angular/router';
import {AuthService} from '../../login/auth.service';
import {Pedido} from '../pedido';

// carga de archivo para mdbootstrap
// declare var historial: any;


@Component({
  selector: 'app-pedidos-verificacion',
  templateUrl: './pedidos-verificacion.component.html'
})


export class PedidosVerificacionComponent implements OnInit {

  pedidos: Pedido[];

  constructor(private pedidosService: PedidoService, private router: Router,
              private authService: AuthService) {
  }


  ngOnInit(): void {

    // Remover la busqueda del historial de pedidos, y listaItemProductosSelect
    sessionStorage.removeItem('pedidosUnoEEHistorial');
    sessionStorage.removeItem('listaItemPedidoSelect');

    // Obtener el listado de pedidos en verificacion
    this.pedidosService.listarPedidosVerificacionJava(this.authService.usuario.nit).subscribe(
      obj => {
        this.pedidos = obj;
        console.log(this.pedidos);
      }
    );

  }

}
