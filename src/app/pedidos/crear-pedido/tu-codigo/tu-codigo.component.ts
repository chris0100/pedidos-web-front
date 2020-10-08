import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PedidoService} from '../../pedido.service';
import {AuthService} from '../../../login/auth.service';
import swal from 'sweetalert2';
import {ItemPedido} from '../../item-pedido';

@Component({
  selector: 'app-tu-codigo',
  templateUrl: './tu-codigo.component.html'
})


export class TuCodigoComponent implements OnInit {

  codigoCliente: string;

  itemPatron: string;
  ext1: string;
  ext2: string;
  tipoExt1: string;
  tipoExt2: string;
  itemPedidoActual: ItemPedido = new ItemPedido(); // Obj de item pedido actual seleccionado

  itemHomologado: string; // Contiene la informacion del item homologado
  decimalesUnidadMedida: number; // Unidades decimales para ajustar nums

  descripcionLabelExt1: string;  // label tipo tamaño
  descripcionLabelExt2: string; // label tipo color

  listaItemPedidoSelect: ItemPedido[] = [];  // Listado de items que van siendo añadidos

  @Input() listaInputItemPedidoSelect: ItemPedido[];

  @Output() listaOutputItemPedidoSelect = new EventEmitter<ItemPedido[]>();

  // Habilitacion input para editar
  // afterConsulta: boolean;


  constructor(private pedidosService: PedidoService, public authService: AuthService) {
  }


  ngOnInit(): void {
    // Se limpian los campos al inicializar
    this.limpiarCampos();

    // Cargar la lista de item pedido desde el session storage
    this.listaItemPedidoSelect = this.pedidosService.obtenerListaItemPedidoSelectStoragee();

    // this.afterConsulta = false;
  }


  consultarItemHomologado(): void {
    console.log('algo esta cambiando' + this.codigoCliente);

    this.pedidosService.contarHomologarItemDuplicado(this.authService.usuario.nit, this.codigoCliente).subscribe(
      obj => {
        if (obj.length <= 1) {
          this.itemHomologado = obj[0];
          console.log(this.itemHomologado);

          // Se agregan los datos tomados del item homologado
          this.itemPatron = this.itemHomologado.substring(0, 50);
          this.tipoExt1 = this.itemHomologado.substring(50, 52);
          this.tipoExt2 = this.itemHomologado.substring(52, 54);
          this.ext1 = this.itemHomologado.substring(54, 100);
          this.ext2 = this.itemHomologado.substring(100, 147);
          this.itemPedidoActual.descripcionExt1 = this.ext1;
          this.itemPedidoActual.descripcionExt2 = this.ext2;
          this.itemPedidoActual.unidadMedida = this.itemHomologado.substring(147, 151).trim();
          this.itemPedidoActual.cantidad = 0;

          console.log('este es el tipoExt1: ' + this.tipoExt1);

          this.consultarDescripcionLabelExt();

          // Obtener los decimales de acuerdo a la unidad de medida
          this.pedidosService.consultaDecimalesUnidadInventario(this.itemPedidoActual.unidadMedida).subscribe(
            objum => {
              this.decimalesUnidadMedida = parseInt(objum[0], 0);
              console.log(this.decimalesUnidadMedida + ' tu codigo');
            });


          // Obtener el idBodega
          this.pedidosService.obtenerBodegaItemJava(this.itemPatron.substring(0, 7)).subscribe(
            obj => {
              this.itemPedidoActual.idBodega = obj[0];
            });

        } else {
          swal('Error', 'Ha ocurrido un error, revisa los datos ingresados', 'error');
          return;
        }
      });
    // this.afterConsulta = true;
  }


  // Consulta descripcion label ext
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
    this.itemPedidoActual.codItem = parseInt(this.itemPatron.substring(0, 7), 0);
    this.itemPedidoActual.descripcion = this.itemPatron.substring(10, 50);
    this.itemPedidoActual.idExt1Detalle = this.itemPedidoActual.descripcionExt1.substring(0, 4);
    this.itemPedidoActual.idExt2Detalle = this.itemPedidoActual.descripcionExt2.substring(0, 5);
    this.itemPedidoActual.descripcionCompletaItem = this.itemPatron;
    this.itemPedidoActual.codCliente = this.codigoCliente;  // en esta pestaña no hay funcionalidad sobre este
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

    // Se unicializan campos
    this.limpiarCampos();

    // Prueba para emitir lista.
    this.listaOutputItemPedidoSelect.emit(this.listaItemPedidoSelect);

    // this.afterConsulta = false;
  }





  // Se limpian los campos
  limpiarCampos(): void {
    this.codigoCliente = '';
    this.itemPatron = '';
    this.ext1 = '';
    this.ext2 = '';
    this.itemPedidoActual.unidadMedida = '';
    this.itemPedidoActual.cantidad = 0;
    this.descripcionLabelExt1 = 'Tamaño';  // label tipo tamaño
    this.descripcionLabelExt2 = 'Color'; // label tipo color
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


  // Habilitacion del input de busqueda
  habilitarInputBuscar(): void {
    // this.afterConsulta = false;
    // this.limpiarCampos();
  }


}
