import { Component, OnInit } from '@angular/core';
import {Pedido} from '../../pedidos/pedido';
import {PedidoService} from '../../pedidos/pedido.service';
import {AuthService} from '../../login/auth.service';
import {ItemPedido} from '../../pedidos/item-pedido';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-editar-item',
  templateUrl: './editar-item.component.html'
})


export class EditarItemComponent implements OnInit {

  pedidoActual: Pedido = new Pedido();

  // selectores cod Item
  // *************
  lastkeydown1 = 0;
  userList1: any[];

  // selectores color
  // *************
  lastkeydown2 = 0;
  userList2: any[];

  listaExt1: string[];  // tamaño
  listaExt2: string[]; // color
  listaItemPatron: string[]; // lista items
  itemPedidoActual: ItemPedido = new ItemPedido();  // obj pedido actual

  coditemPatronBuscado: string;  // input del codigo item
  decimalesUnidadMedida: number;  // input de unidad de medida
  codigoItem: string;  // Codigo item cliente, aunque no funcional en codigoEka, se inicializa

  tipoExt1: string;  // tipo tamaño abreviado
  tipoExt2: string; // tipo color abreviado
  descripcionLabelExt1: string;  // label tipo tamaño
  descripcionLabelExt2: string; // label tipo color

  idPedidoActual: number;
  idItemActual: number;

  constructor(private pedidosService: PedidoService, private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarPedidoEditarItem();
  }


  // Carga a traves de la ruta variable idpedido
  cargarPedidoEditarItem(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.idPedidoActual = params['idPedido'];
        this.idItemActual = params['idItem'];

        console.log('idPedido: ' + this.idPedidoActual + ' : idItem: ' + this.idItemActual);

        if (this.idPedidoActual) {
          this.pedidosService.obtenerPedidoVBJava(this.idPedidoActual).subscribe(
            obj => {
              // Pasar los datos al pedido
              this.pedidoActual = obj;
              console.log(this.pedidoActual);
            });
        }
      });
  }


  // METODOS PARA BUSQUEDA EN EL MOMENTO DE ESCRIBIR SECUENCIALMENTE EL CODIGO DEL ITEM
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



  // METODOS PARA BUSQUEDA EN EL MOMENTO DE ESCRIBIR SECUENCIALMENTE COLORES
  // ***********************************************************************************
  getUserIdsFirstWay2($event) {
    const userId = (<HTMLInputElement>document.getElementById('buscar-color')).value;
    this.userList2 = [];
    if (userId.length > 2) {
      if ($event.timeStamp - this.lastkeydown2 > 200) {
        this.userList2 = this.searchFromArray2(this.listaExt2, userId);
        console.log(this.userList2);
      }
    }
  }

  searchFromArray2(arr, regex) {
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
    this.codigoItem = this.coditemPatronBuscado.substring(0, 7);

    // Condiciona para evitar errores
    if (this.coditemPatronBuscado !== '') {
      // Obtener tipo de extensiones(TAMAÑO Y COLOR)
      this.pedidosService.consultarTipoExtJava(this.codigoItem).subscribe(
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

          // Consultar la descripcion label Ext
          this.consultarDescripcionLabelExt();
        });


      // Obtener la unidad de medida
      this.pedidosService.consultarUnidadInventarioJava(this.codigoItem).subscribe(
        obj => {
          this.itemPedidoActual.unidadMedida = obj[0];

          // Obtener los decimales de acuerdo a la unidad de medida
          this.pedidosService.consultaDecimalesUnidadInventario(this.itemPedidoActual.unidadMedida).subscribe(
            objum => {
              this.decimalesUnidadMedida = parseInt(objum[0], 0);
              console.log(this.decimalesUnidadMedida);
            });
        });


      // Setear la cantidad a cero
      this.itemPedidoActual.cantidad = 0;

      this.pedidosService.obtenerBodegaItemJava(this.codigoItem).subscribe(
        obj => {
          this.itemPedidoActual.idBodega = obj[0];
        });
    }
  }




  // Hace una consulta mas extensa del label ext1 y ext2
  consultarDescripcionLabelExt(): void {
    this.pedidosService.consultarDescripcionLabelExt1(this.tipoExt1).subscribe(
      obj => {
        this.descripcionLabelExt1 = obj[0];
        console.log('descripcion label ext1: ' + this.descripcionLabelExt1);
      });

    this.pedidosService.consultarDescripcionLabelExt2(this.tipoExt2).subscribe(
      obj => {
        this.descripcionLabelExt2 = obj[0];
        console.log('descripcion label ext2: ' + this.descripcionLabelExt2);
      });
  }

}
