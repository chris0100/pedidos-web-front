import { Component, OnInit } from '@angular/core';
import {Pedido} from '../../pedidos/pedido';
import {PedidoService} from '../../pedidos/pedido.service';
import {AuthService} from '../../login/auth.service';

@Component({
  selector: 'app-lista-errores',
  templateUrl: './lista-errores.component.html'
})



export class ListaErroresComponent implements OnInit {

  listaPedidosErrorAsesor: Pedido[];

  constructor(private pedidosService: PedidoService, private authService: AuthService) { }


  ngOnInit() {

    // Obtener el listado de pedidos error de asesor  RECORDAR CAMBIAR 66837958
    this.pedidosService.listarPedidosErrorAsesorJava('66837958').subscribe(
      obj => {
        console.log(obj);
        this.listaPedidosErrorAsesor = obj;
      });
  }

}
