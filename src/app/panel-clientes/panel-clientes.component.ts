import { Component, OnInit } from '@angular/core';

// carga de archivo js para mdbootstrap
declare var tablas: any;



@Component({
  selector: 'app-panel-clientes',
  templateUrl: './panel-clientes.component.html'
})


export class PanelClientesComponent implements OnInit {

  title = 'Panel Clientes';

  constructor() { }


  ngOnInit(): void {
    // Ejecucion del script
    new tablas();

    // Remover la busqueda del historial de pedidos, y listaItemProductosSelect
    sessionStorage.removeItem('pedidosUnoEEHistorial');
    sessionStorage.removeItem('listaItemPedidoSelect');
    // Destruir el usuarioTemp
    sessionStorage.removeItem('usuarioTemp');


  }

}
