import { Component, OnInit } from '@angular/core';
import {Pedido} from '../../pedidos/pedido';
import {ItemPedido} from '../../pedidos/item-pedido';
import {PedidoService} from '../../pedidos/pedido.service';
import {ActivatedRoute} from '@angular/router';
import * as converter from 'xml-js';
import swal from 'sweetalert2';


// carga de archivo tooltip
declare var tooltip: any;

@Component({
  selector: 'app-prepare-ver-error',
  templateUrl: './prepare-ver-error.component.html'
})



export class PrepareVerErrorComponent implements OnInit {

  pedidoError: Pedido;
  itemsPedidoError: ItemPedido[];
  comeback: string;
  textoConvertido: string;

  constructor(private pedidosService: PedidoService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.cargarPedidoError();

    new tooltip();

  }


  // Cargar a traves de la ruta del pedido id
  cargarPedidoError(): void {
    this.activatedRoute.params.subscribe(
      params => {
        const id = params['id'];
        this.comeback = params['otr'];

        if (id) {
          this.pedidosService.obtenerPedidoVBJava(id).subscribe(
            obj => {
              this.pedidoError = obj;
              console.log(this.pedidoError);

              this.itemsPedidoError = obj.listaItemPedido;
              console.log(this.itemsPedidoError);

              this.textoConvertido = this.pedidoError.mensajeWB;
              console.log(this.textoConvertido);
              // console.log(parse.toJSON(this.textoConvertido));


              let text, parser, xmlDoc;

              text = '<bookstore><book>' +
                '<title>Everyday Italian</title>' +
                '<author>Giada De Laurentiis</author>' +
                '<year>2005</year>' +
                '</book></bookstore>';

              parser = new DOMParser();
              xmlDoc = parser.parseFromString(this.textoConvertido, 'text/xml');
              console.log(xmlDoc);
            });
        }
      }
    );
  }






  // Funcionalidad para boton de sincronizar items
  sincronizar(): void {
    // Se obtiene el id del pedido junto con el nit
    const idPedido = this.pedidoError.id + '';
    const nit = this.pedidoError.idUsuario.nit;

    console.log(this.pedidoError.id);
    console.log(this.pedidoError.idUsuario.nit);


    // Se manda a ejecutar el procedimiento en java
    this.pedidosService.sincronizarItemsJava(idPedido, nit).subscribe(
      obj => {
        console.log('aqui se recibe mensaje de respuesta');
        console.log(obj);
        swal('Correcto', obj[0], 'success');

        // Se itera para sincronizar bodega
        // tslint:disable-next-line:no-shadowed-variable
        this.pedidoError.listaItemPedido.forEach(obj1 => {
          this.pedidosService.sincronizarBodegaItemsJava(obj1.idItem, obj1.codItem.toString()).subscribe(
            obj2 => obj2);
        });
      });
  }



  // Funcionalidad para cuando se da clic en el boton volver a enviar pedido
  enviarPedidoAgain(): void {
    console.log('se ha dado clic en el boton enviar pedido nuevamente');
    console.log(this.pedidoError);
    this.pedidosService.webServiceProcessError(this.pedidoError).subscribe(
      obj => {
        console.log(obj);
        if (obj[0].includes('no')) {
          swal('Error', obj[0], 'error');
        } else {
          swal('Correcto', obj[0], 'success');
        }
      });
  }









}
