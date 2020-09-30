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


  // Spinner
  showSpinner: boolean;

  constructor(private pedidosService: PedidoService, private authService: AuthService) { }


  ngOnInit() {
    this.showSpinner = false;

    // Obtener el listado de pedidos error de asesor  RECORDAR CAMBIAR 66837958
    this.pedidosService.listarPedidosErrorAsesorJava(this.authService.usuario.nit).subscribe(
      obj => {
        console.log(obj);
        this.listaPedidosErrorAsesor = obj;
        this.showSpinner = false;
      });
    this.showSpinner = true;
  }

}
