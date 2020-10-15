import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PedidoService} from '../../pedido.service';
import swal from 'sweetalert2';
import {AuthService} from '../../../login/auth.service';
import {ItemPedido} from '../../item-pedido';

@Component({
  selector: 'app-codigo-eka',
  templateUrl: './codigo-eka.component.html'
})


export class CodigoEkaComponent implements OnInit {

  itemPedidoActual: ItemPedido = new ItemPedido();  // obj pedido actual
  listaItemPedidoSelect: ItemPedido[] = [];

  // Listas string
  listaExt1: string[];  // tamaño
  listaExt2: string[]; // color
  listaItemPatron: string[]; // lista items


  tipoExt1: string;  // tipo tamaño abreviado
  tipoExt2: string; // tipo color abreviado
  descripcionLabelExt1: string;  // label tipo tamaño
  descripcionLabelExt2: string; // label tipo color


  coditemPatronBuscado: string;  // input del codigo item
  decimalesUnidadMedida: number;  // input de unidad de medida
  codigoItem: string;  // Codigo item cliente, aunque no funcional en codigoEka, se inicializa


  // selectores cod Item
  // *************
  lastkeydown1 = 0;
  userList1: any[];

  // selectores color
  // *************
  lastkeydown2 = 0;
  userList2: any[];

  @Input() listaInputItemPedidoSelect: ItemPedido[];

  @Output() listaOutputItemPedidoSelect = new EventEmitter<ItemPedido[]>();


  // Habilitacion y deshabilitacion de input luego de busqueda
   afterConsulta: boolean;
   afterConsultaColor: boolean;


  constructor(private pedidosService: PedidoService, public authService: AuthService) {
  }


  ngOnInit(): void {
     this.afterConsulta = false;
     this.afterConsultaColor = false;

    // Se unicializan campos
    this.limpiarCampos();

    // Se carga la lista del local storage
    this.listaItemPedidoSelect = this.pedidosService.obtenerListaItemPedidoSelectStoragee();

    // Si ya hay datos de los itemPatron los trae del sessionstorage
    this.listaItemPatron = this.pedidosService.obtenerListaItemPatronStorage();

    // Consulta la BD para cargar los items Patron cuando realice busquedas
    if (this.listaItemPatron.length === 0) {
      this.pedidosService.obtenerListaItemPatronJava().subscribe(
        obj => {
          this.listaItemPatron = obj;
          console.log(this.listaItemPatron);

          // Guarda lo recopilado en el session storage
          this.pedidosService.guardarListaItemPatronStorage(this.listaItemPatron);
        });
    }
  }


  // LIMPIAR CAMPOS
  limpiarCampos(): void {
    // Listas string
    this.listaExt1 = [];  // tamaño
    this.listaExt2 = []; // color


    this.tipoExt1 = '';  // tipo tamaño abreviado
    this.tipoExt2 = ''; // tipo color abreviado
    this.descripcionLabelExt1 = 'Tamaño';  // label tipo tamaño
    this.descripcionLabelExt2 = 'Color'; // label tipo color


    this.coditemPatronBuscado = '';  // input del codigo item
    this.decimalesUnidadMedida = 0;  // input de unidad de medida
    this.codigoItem = '';  // Codigo item cliente, aunque no funcional en codigoEka, se inicializa

    this.itemPedidoActual.unidadMedida = '';
    this.itemPedidoActual.cantidad = 0;
    this.itemPedidoActual.descripcionExt2 = '';

    // Habilita escritura en campos de codigo y color respectivamente.
    this.afterConsulta = false;
    this.afterConsultaColor = false;
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
          if (obj.length === 0) {
            swal('Error', 'La busqueda no arrojo datos', 'error');
            this.limpiarCampos();
            return;
          }
          else {
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
          }
        }, error => {
          swal('Error', 'La busqueda no arrojo datos', 'error');
          this.limpiarCampos();
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
    else {
      this.limpiarCampos();
    }


    // se deshabilita input temporalmente
     this.afterConsulta = true;
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
    this.itemPedidoActual.codCliente = '';  // en esta pestaña no hay funcionalidad sobre este
    this.itemPedidoActual.unoeeItem = 0;
    this.itemPedidoActual.unoeeListasMateriales = 0;
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

    // Se carga nuevamente session storage para evitar conflictos de nueva escritra la lista del local storage
    this.listaItemPedidoSelect = this.pedidosService.obtenerListaItemPedidoSelectStoragee();

    // Mostrar mensaje de exito
    swal('Correcto', `Se ha añadido el ítem ${this.itemPedidoActual.descripcion} exitosamente`, 'success');

    // Se inicializan campos
    this.limpiarCampos();

    // Prueba para emitir lista.
    this.listaOutputItemPedidoSelect.emit(this.listaItemPedidoSelect);

     this.afterConsulta = false;
  }





  // Se elimina un item de la lista seleccionada
  removerItem(item: ItemPedido): void {
    console.log(item);
    let nombreItemEliminar = '';

    // Buscar en la lista
    // @ts-ignore
    const index = this.listaInputItemPedidoSelect.findIndex(obj => {
      if (obj === item) {
        nombreItemEliminar = obj.descripcion;
        return obj;
      }
    });

    this.listaInputItemPedidoSelect.splice(index, 1);  // borrar elemento

    // Mostrar mensaje satisfactorio de elemento eliminado
    swal('Correcto', `Se ha eliminado el ítem ${nombreItemEliminar} exitosamente`, 'success');
    console.log(this.listaInputItemPedidoSelect);

    // Guardar en el session storage
    this.pedidosService.guardarListaItemPedidoSelectStorage(this.listaInputItemPedidoSelect);
  }



  // Elimina item de la BD
  removerItemBD(item: ItemPedido): void {
    this.pedidosService.eliminarItemBorradorJava(item.idItem).subscribe(
      () => {
        let nombreItemEliminar = '';

        // Buscar en la lista
        // @ts-ignore
        const index = this.listaInputItemPedidoSelect.findIndex(obj => {
          if (obj === item) {
            nombreItemEliminar = obj.descripcion;
            return obj;
          }
        });

        this.listaInputItemPedidoSelect.splice(index, 1);  // borrar elemento

        // Mostrar mensaje satisfactorio de elemento eliminado
        swal('Correcto', `Se ha eliminado el ítem ${nombreItemEliminar} exitosamente`, 'success');
        console.log(this.listaInputItemPedidoSelect);

        // Guardar en el session storage
        this.pedidosService.guardarListaItemPedidoSelectStorage(this.listaInputItemPedidoSelect);
      });
  }




  // Se habilita el input de la primera consulta.
  habilitarInputBuscar(): void {
     this.afterConsulta = false;
     this.limpiarCampos();
  }

  // Se habilita el input de la consulta del color.
  toggleInputBuscarColor(): void {
     this.afterConsultaColor = !this.afterConsultaColor;
     if (!this.afterConsultaColor) {
       this.itemPedidoActual.descripcionExt2 = '';
    }
  }



}
