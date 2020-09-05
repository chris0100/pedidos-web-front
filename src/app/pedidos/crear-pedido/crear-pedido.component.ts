import {Component, OnInit} from '@angular/core';
import {Pedido} from '../pedido';
import {PedidoService} from '../pedido.service';
import {AuthService} from '../../login/auth.service';
import {Usuario} from '../../usuario/usuario';
import {flatMap, map} from 'rxjs/operators';
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
  contarItemMostrarPanel: number;
  numeroOcOp: string;
  notas: string;

  // Listas string
  listaExt1: string[];
  listaExt2: string[];
  listaItemPatron: string[];


  tipoExt1: string;
  tipoExt2: string;
  itemPedidoActual: ItemPedido = new ItemPedido();

  coditemPatronBuscado: string;


  // selectores cod Item
  // *************
  lastkeydown1 = 0;
  subscription: any;
  userList1: any[];


  constructor(private pedidosService: PedidoService, private authService: AuthService) {
    this.usuario = this.authService.usuario;
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

    // Consulta la BD para saber si el cliente tiene items homologados para codigo item cliente EKA
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


  // METODOS PARA BUSQUEDA EN WL MOMENTO DE ESCRIBIR SECUENCIALMENTE EL CODIGO DEL ITEM
  // ***********************************************************************************
  getUserIdsFirstWay($event) {
    const userId = (<HTMLInputElement>document.getElementById('buscar')).value;
    this.userList1 = [];
    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.userList1 = this.searchFromArray(this.listaItemPatron, userId);
        console.log(this.userList1);
      }
    }
  }

  searchFromArray(arr, regex) {
    // tslint:disable-next-line:prefer-const
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (matches.length <= 8) {
        if (arr[i].match(regex)) {
          matches.push(arr[i]);
        }
      }
    }
    console.log(matches);
    return matches;
  }

  // ***********************************************************************************
  // ***********************************************************************************


  // Realiza consulta para buscar datos restantes.
  consultarTipoExt(): void {
    console.log(this.coditemPatronBuscado);
    const codigoItem = this.coditemPatronBuscado.substring(0, 7);

    // Obtener tipo de extensiones(TAMAÑO Y COLOR)
    this.pedidosService.consultarTipoExtJava(codigoItem).subscribe(
      obj => {
        this.tipoExt1 = obj[0].substring(0, 2);
        this.tipoExt2 = obj[0].substring(2, 4);
        console.log(this.tipoExt1 + ' : ' + this.tipoExt2);

        // LISTA TAMAÑOS
        this.pedidosService.consultaExt1Java(this.tipoExt1).subscribe(
          objx1 => {
            this.listaExt1 = objx1;
            console.log(this.listaExt1);
          });

        // LISTA COLORES
        this.pedidosService.consultaExt2Java(this.tipoExt2).subscribe(
          objx2 => {
            this.listaExt2 = objx2;
            console.log(this.listaExt2);
          });
      });


    // Obtener la unidad de medida
    this.pedidosService.consultarUnidadInventarioJava(codigoItem).subscribe(
      obj => {
        this.itemPedidoActual.unidadMedida = obj[0];

        // Obtener los decimales de acuerdo a la unidad de medida
        this.pedidosService.consultaDecimalesUnidadInventario(this.itemPedidoActual.unidadMedida).subscribe(
          objum => {
            console.log(objum[0]);
          });
      });





  }


}
