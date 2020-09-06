import {Component, OnInit} from '@angular/core';
import {Pedido} from '../pedido';
import {PedidoService} from '../pedido.service';
import {AuthService} from '../../login/auth.service';
import {Usuario} from '../../usuario/usuario';
import {flatMap, map} from 'rxjs/operators';
import {ItemPedido} from '../item-pedido';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';
import swal from 'sweetalert2';


// carga de archivo js para mdbootstrap
declare var pedidos: any;

@Component({
  selector: 'app-crear-pedido',
  templateUrl: './crear-pedido.component.html'
})


export class CrearPedidoComponent implements OnInit {

  pedidoActual: Pedido = new Pedido();
  itemPedidoActual: ItemPedido = new ItemPedido();  // obj pedido actual
  listaItemPedidoSelect: ItemPedido[] = [];
  listaItemPedidoSS: ItemPedido[];
  usuario: Usuario;
  contarItemMostrarPanel: number;
  numeroOcOp: string;
  notas: string;

  // Listas string
  listaExt1: string[] = [];  // tamaño
  listaExt2: string[] = []; // color
  listaItemPatron: string[] = []; // lista items


  tipoExt1 = '';  // tipo tamaño abreviado
  tipoExt2 = ''; // tipo color abreviado
  descripcionLabelExt1 = 'Tamaño';  // label tipo tamaño
  descripcionLabelExt2 = 'Color'; // label tipo color


  coditemPatronBuscado = '';  // input del codigo item
  decimalesUnidadMedida = 0;  // input de unidad de medida

  codigoItem = '';


  // selectores cod Item
  // *************
  lastkeydown1 = 0;
  userList1: any[];

  // selectores color
  // *************
  lastkeydown2 = 0;
  userList2: any[];


  constructor(private pedidosService: PedidoService, private authService: AuthService) {
    this.usuario = this.authService.usuario;
    this.numeroOcOp = '';
    this.notas = '';
    this.itemPedidoActual.unidadMedida = '';
    this.itemPedidoActual.cantidad = 0;
  }

  ngOnInit(): void {

    // Se carga la lista del local storage
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
        obj => this.itemPedidoActual.idBodega = obj[0]
      );
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


  // Agregar Item a la lista
  agregarItem(): void {
    this.itemPedidoActual.codItem = parseInt(this.codigoItem, 0);
    this.itemPedidoActual.descripcion = this.coditemPatronBuscado.substring(10, 50);
    this.itemPedidoActual.idExt1Detalle = this.itemPedidoActual.descripcionExt1.substring(0, 4);
    this.itemPedidoActual.idExt2Detalle = this.itemPedidoActual.descripcionExt2.substring(0, 5);
    this.itemPedidoActual.descripcionCompletaItem = this.coditemPatronBuscado;
    this.itemPedidoActual.codCliente = '';
    this.itemPedidoActual.unoeeItem = 0;
    this.itemPedidoActual.unoeeListaMateriales = 0;
    this.itemPedidoActual.unoeePortafolio = 0;
    this.itemPedidoActual.unoeePrecios = 0;

    if (this.authService.usuario.nit === '1792196841001') {
      this.itemPedidoActual.idMotivo = '02';
    }
    // tslint:disable-next-line:one-line
    else {
      this.itemPedidoActual.idMotivo = '01';
    }

    console.log(this.itemPedidoActual);


    // Se agrega a la lista de itempedido
    this.listaItemPedidoSelect = this.pedidosService.obtenerListaItemPedidoSelectStoragee();
    this.listaItemPedidoSelect.push(this.itemPedidoActual);

    // Se debe de guardar en el sessionStorage
    this.pedidosService.guardarListaItemPedidoSelectStorage(this.listaItemPedidoSelect);

    // Mostrar mensaje de exito
    swal('Correcto', `Se ha añadido el item ${this.itemPedidoActual.descripcion} exitosamente`, 'success');

  }



  cancelarPedido(): void {
    sessionStorage.removeItem('listaItemPedidoSelect');
  }


}
