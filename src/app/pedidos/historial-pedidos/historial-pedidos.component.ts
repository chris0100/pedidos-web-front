import {Component, OnInit} from '@angular/core';
import {PedidoUnoEE} from '../pedido-uno-ee';
import {PedidoService} from '../pedido.service';
import {Router} from '@angular/router';
import {AuthService} from '../../login/auth.service';


@Component({
  selector: 'app-historial-pedidos',
  templateUrl: './historial-pedidos.component.html'
})


export class HistorialPedidosComponent implements OnInit {

  pedidosUnoEE: PedidoUnoEE[];

  fechaParametro1: string;
  fechaParametro2: string;

  pedidoSelect: PedidoUnoEE;

  constructor(private pedidosService: PedidoService, private router: Router,
              private authService: AuthService) {
  }


  ngOnInit(): void {

    // Si se encuentra el historial aun en el session storage
    this.pedidosUnoEE = this.pedidosService.obtenerPedidoUnoEEGuardadoSessionStorage();
  }


  // Cuando se de clic en el boton de consultar,, tomara los datos de las
  // fechas y enviara los datos para consultar.
  consultar(): void {
    this.fechaParametro1 = this.fechaParametro1.split('-')[0] + this.fechaParametro1.split('-')[1] + this.fechaParametro1.split('-')[2];
    this.fechaParametro2 = this.fechaParametro2.split('-')[0] + this.fechaParametro2.split('-')[1] + this.fechaParametro2.split('-')[2];

    this.pedidosService.listaHistorialPedidosJava(this.authService.usuario.nit, this.fechaParametro1, this.fechaParametro2).subscribe(
      obj => {
        this.pedidosUnoEE = obj;
        console.log(this.pedidosUnoEE);

        // Se guarda el listado de pedidosUNOEE encontrado en la busqueda
        this.pedidosService.guardarPedidosUnoEESessionStorage(this.pedidosUnoEE);

      });
  }


}
