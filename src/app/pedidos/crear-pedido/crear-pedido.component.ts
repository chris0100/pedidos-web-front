import {Component, OnInit} from '@angular/core';
import {Pedido} from '../pedido';
import {PedidoService} from '../pedido.service';
import {AuthService} from '../../login/auth.service';
import {Usuario} from '../../usuario/usuario';
import {ItemPedido} from '../item-pedido';


// carga de archivo js para mdbootstrap
declare var pedidos: any;

@Component({
  selector: 'app-crear-pedido',
  templateUrl: './crear-pedido.component.html'
})


export class CrearPedidoComponent implements OnInit {

  pedidoActual: Pedido = new Pedido();
  usuario: Usuario;
  contarItemMostrarPanel: number; // cuenta para saber si muestra el panel 2
  numeroOcOp: string; // numero de compra
  notas: string;  // campo de notas
  listaItemPedidoSelect: ItemPedido[];  // Listado de items que van siendo añadidos



  // Indicacdor de ventana para habilitar panel pos verificacion datos del pedido
  habilitaVerificacionPedido = false;



  constructor(private pedidosService: PedidoService, private authService: AuthService) {
    this.usuario = this.authService.usuario;
    this.numeroOcOp = '';
    this.notas = '';
  }



  // Recibe datos de las listas que se estan modificando cada que se añaden o eliminan items
  onTuCodigo(listaOutputItemPedidoSelect: ItemPedido[]): void {
    this.listaItemPedidoSelect = listaOutputItemPedidoSelect;
    console.log('se trae lista a padre desde tu codigo');
    console.log(this.listaItemPedidoSelect);
  }


  // Recibe datos de las listas que se estan modificando cada que se añaden o eliminan items
  onCodigoEka(listaOutputItemPedidoSelect: ItemPedido[]): void {
    this.listaItemPedidoSelect = listaOutputItemPedidoSelect;
    console.log('se trae lista a padre desde codigo EKA');
    console.log(this.listaItemPedidoSelect);
  }




  ngOnInit(): void {

    // Cargar la lista de los items añadidos
    this.listaItemPedidoSelect = this.pedidosService.obtenerListaItemPedidoSelectStoragee();


    // Carga los datos del pedido por defecto
    this.pedidoActual.idUsuario = this.usuario;
    this.pedidoActual.sucursalRemisionar = this.usuario.id_sucursal + ' - ' + this.usuario.descripcion_sucursal;
    this.pedidoActual.sucursalFacturar = this.usuario.id_sucursal + ' - ' + this.usuario.descripcion_sucursal;
    this.pedidoActual.direccion = '';
    this.pedidoActual.terceroVendedor = '';
    this.pedidoActual.contacto = '';

    // Consulta la BD para completar datos pedidoActual de inicio
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

    // Consulta la BD para saber si el cliente tiene items homologados para codigo item cliente EKA(BUSCAR TU CODIGO TAB)
    this.pedidosService.contarMostrarPanel(this.usuario.nit.trim()).subscribe(
      obj => {
        this.contarItemMostrarPanel = obj[0];
        console.log(this.contarItemMostrarPanel);
      }
    );

    // Ejecutar script js
    new pedidos();
  }


  // Se da click en el boton cancelar el pedido
  cancelarPedido(): void {
    sessionStorage.removeItem('listaItemPedidoSelect');
  }


  // Se inicia una confirmacion de pedido
  confirmarPedidoCrear(): void {
    console.log('se ha iniciado una confirmacion de pedido crear');
    this.habilitaVerificacionPedido = true;
  }


  // Se retorna a una ventana de volver a editar
  volverAEditar(): void {
    console.log('se retorn a la ventana de volver a editar');
    this.habilitaVerificacionPedido = false;
  }




}
