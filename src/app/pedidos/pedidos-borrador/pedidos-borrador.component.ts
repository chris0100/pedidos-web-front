import {Component, OnInit} from '@angular/core';
import {Pedido} from '../pedido';
import {PedidoService} from '../pedido.service';
import {Router} from '@angular/router';
import {AuthService} from '../../login/auth.service';

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

    // Obtener el listado de pedidos en borrador
    this.pedidosService.listarPedidosBorradorJava(this.authService.usuario.nit).subscribe(
      obj => {
        this.pedidos = obj;
        console.log(this.pedidos);
      });
  }

}
