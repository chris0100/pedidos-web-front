import {Component, OnInit} from '@angular/core';
import {Pedido} from '../pedido';
import {PedidoService} from '../pedido.service';
import {AuthService} from '../../login/auth.service';
import {Usuario} from '../../usuario/usuario';

// carga de archivo js para mdbootstrap
declare var pedidos: any;

@Component({
  selector: 'app-crear-pedido',
  templateUrl: './crear-pedido.component.html'
})


export class CrearPedidoComponent implements OnInit {

  pedidoActual: Pedido = new Pedido();
  usuario: Usuario;
  contarItemMostrarPanel: number;
  responsablePedido: string;
  numeroOcOp: string;
  notas: string;

  // Listas string
  listaExt1: string[];
  listaExt2: string[];
  listaItemPatron: string[];



  constructor(private pedidosService: PedidoService, private authService: AuthService) {
    this.usuario = this.authService.usuario;
    this.responsablePedido = '';
    this.numeroOcOp = '';
    this.notas = '';
  }

  ngOnInit(): void {

    // Carga los datos del pedido por defecto
    this.pedidoActual.idUsuario = this.usuario;
    this.pedidoActual.sucursalRemisionar = this.usuario.id_sucursal + ' - ' + this.usuario.descripcion_sucursal;
    this.pedidoActual.sucursalFacturar = this.usuario.id_sucursal + ' - ' + this.usuario.descripcion_sucursal;
    this.pedidoActual.direccion = '';
    this.pedidoActual.terceroVendedor = '';
    this.pedidoActual.contacto = '';

    // Consulta la BD para otros datos
    const cadena = '';
    this.pedidosService.obtenerPuntoEnvio(this.usuario.nit.trim(),
      this.authService.usuario.id_sucursal.trim(), this.usuario.id_punto_envio.trim()).subscribe(
      obj => {
        this.pedidoActual.direccion = obj[0].substring(6, 47);
        this.pedidoActual.terceroVendedor = obj[0].substring(49, 156);
        this.pedidoActual.contacto = obj[0].substring(158, obj[0].length);
        this.pedidoActual.puntoEnvio = this.usuario.id_punto_envio + ' - ' + this.usuario.descripcion_punto_envio;
        console.log(this.pedidoActual);
      });

    // Consulta la BD para saber si el cliente tiene item homologado para codigo item cliente EKA
    this.pedidosService.contarMostrarPanel(this.usuario.nit.trim()).subscribe(
      obj => {
        this.contarItemMostrarPanel = obj[0];
        console.log(this.contarItemMostrarPanel);
      }
    );


    // Consulta la BD para cargar los items Patron cuando realice busquedas
    this.pedidosService.obtenerListaItemPatronJava().subscribe(
      obj => {
        this.listaItemPatron = obj;
        console.log(this.listaItemPatron);
      });



    // Ejecutar script js
    new pedidos();

  }

}
