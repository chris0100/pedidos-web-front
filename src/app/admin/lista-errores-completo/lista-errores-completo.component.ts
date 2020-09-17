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

  constructor(private pedidosService: PedidoService, private authService: AuthService) { }


  ngOnInit() {

    // Obtener el listado de pedidos error completo
    this.pedidosService.listarPedidosErrorCompletoJava().subscribe(
      obj => {
        console.log(obj);
        this.listaPedidoError = obj;
      }
    );
  }

}
