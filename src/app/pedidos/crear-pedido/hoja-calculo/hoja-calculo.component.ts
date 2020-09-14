import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ItemPedido} from '../../item-pedido';
import {PedidoService} from '../../pedido.service';
import {AuthService} from '../../../login/auth.service';
import * as XLSX from 'xlsx';
import swal from 'sweetalert2';
import {ItemExcel} from '../../item-excel';
import {throwError} from 'rxjs';


@Component({
  selector: 'app-hoja-calculo',
  templateUrl: './hoja-calculo.component.html'
})


export class HojaCalculoComponent implements OnInit {

  listaItemPedidoSelect: ItemPedido[] = [];  // Listado de items que van siendo añadidos
  listaEx: string[] = [];  // Lista de String Inicial

  // Datos para manejo del excel
  file: File;
  arrayBuffer: any;
  filelist: any;

  // area de texto
  areaHoja: string;

  // Error encontrado
  errorLectura: boolean;

  // Input del file
  @ViewChild('inputFile') myInputVariable: ElementRef;


  // Array de itemsExcel leidos
  listaItemsExcel: ItemExcel[] = [];

  @Input() listaInputItemPedidoSelect: ItemPedido[];

  @Output() listaOutputItemPedidoSelect = new EventEmitter<ItemPedido[]>();


  // Constructor
  constructor(private pedidosService: PedidoService, private authService: AuthService) {
  }


  ngOnInit(): void {
    this.areaHoja = ' ';
    this.errorLectura = true;
  }


  // Añadir archivo de Excel para mostrar en el area de texto, se habilita cuando se selecciona un archivo de excel
  addFile(event) {
    // Se inicializa el contenido en el areaHoja
    this.areaHoja = '';
    this.listaEx = [];

    this.file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      // tslint:disable-next-line:triple-equals
      for (let i = 0; i != data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }

      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, {type: 'binary'});
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];

      const arre = XLSX.utils.sheet_to_formulae(worksheet);
      let contador = 0;
      let repiteTipo = false;
      let derecha = false;


      // Lectura de contenido organizandolo para mostrar en textarea.
      arre.forEach(obj => {
        // reestablece el valor de derecha
        derecha = false;

        if (obj.includes('CÓDIGO') && contador === 0) {
          this.areaHoja += 'CÓDIGO ITEM\t | \t';
          contador++;
        }
        if (obj.includes('CANTIDAD') && contador === 1) {
          this.areaHoja += 'CANTIDAD\n-------------------------\n';
          contador++;
        }


        // tslint:disable-next-line:one-line
        else {

          // Para cuando se envian cod barras digitados a la derecha
          if (contador >= 2 && obj.includes('=') && !repiteTipo && !obj.includes('\'')) {
            const cadena = obj.split('=')[1];
            if (cadena.trim().length <= 10 && cadena.trim().length > 6) {
              this.areaHoja += obj.split('=')[1] + ' \t\t | \t ';
              contador++;
              this.listaEx.push(cadena);
              repiteTipo = true;
              derecha = true;
            } else {
              this.areaHoja += 'ERROR COD. \t\t | \t ' + cadena;
              contador++;
              this.listaEx.push('error cod.');
              repiteTipo = true;
              derecha = true;
            }
          }

          // Para cuando se envian cod barras digitados a la izquierda
          if (contador >= 2 && obj.includes('=\'') && !repiteTipo) {
            const cadena = obj.split('\'')[1];
            if (cadena.trim().length <= 10 && cadena.trim().length > 6) {
              this.areaHoja += obj.split('\'')[1] + ' \t\t | \t ';
              contador++;
              this.listaEx.push(cadena);
              repiteTipo = true;
            } else {
              this.areaHoja += 'ERROR COD. \t\t | \t ';
              contador++;
              this.listaEx.push('error cod.');
              repiteTipo = true;
            }
          }


            // Significa que hay un dato erroneo donde deberia de existir un numero
          // tslint:disable-next-line:one-line
          else if (contador >= 2 && obj.includes('=\'') && repiteTipo) {
            const cadena = obj.split('\'')[1];

            if (isNaN(parseInt(cadena, 0))) {
              this.areaHoja += cadena + '   ERROR DE TIPO NÚMERICO\n';
              this.listaEx.push('0');
              repiteTipo = false;
            } else {
              this.areaHoja += 'ERROR CANTIDAD\n';
              this.areaHoja += cadena + ' \t\t | \t ';
              this.listaEx.push('0');
              this.listaEx.push(cadena);
              repiteTipo = true;
            }
          }
          // Tratamiento numeros col
          if (contador >= 2 && !obj.includes('=\'') && !derecha) {
            const numero = parseInt(obj.split('=')[1], 0);
            if (repiteTipo && numero < 1) {
              this.areaHoja += 'ERROR CANTIDAD CERO\n';
              contador++;
              this.listaEx.push(obj.split('=')[1]);
              repiteTipo = false;
            }
            // si no se cumple
            // tslint:disable-next-line:one-line
            else{
              if (repiteTipo && numero > 0) {
                this.areaHoja += obj.split('=')[1] + '\n';
                contador++;
                this.listaEx.push(obj.split('=')[1]);
                repiteTipo = false;
              } else {
                this.areaHoja += 'ERROR COD. \t\t | \t ' + obj.split('=')[1] + '\n';
                contador++;
                this.listaEx.push('error cod.');
                this.listaEx.push(obj.split('=')[1]);
                repiteTipo = false;
              }
            }
          }

        }
        // Si en la primera vuelta no tiene capturada las cabeceras, genera error
        // tslint:disable-next-line:one-line max-line-length
        if ((contador < 1 && !obj.includes('CÓDIGO') || (contador === 2 && !obj.includes('CANTIDAD'))
          || (contador === 1 && !obj.includes('CÓDIGO') && this.areaHoja.includes('CÓDIGO')) || this.areaHoja.includes('ERROR'))) {
          swal('Error de carga', 'El archivo cargado contiene errores, verificalo por favor', 'error');
          this.errorLectura = true;
          this.listaEx = [];

          // Limpio el file y el text area
          this.myInputVariable.nativeElement.value = '';
          return;
        } else if (this.myInputVariable.nativeElement.value !== '') {
          // Si llega aqui significa que todo esta bien
          this.errorLectura = false;
        }
      });
    };
  }







  // Revisar datos, se activa cuando se da clic en el boton procesar archivo
  procesarArchivo(): void {
    let count = 0;
    let itemExcel = new ItemExcel();

    // Limpio el file y el text area
    this.myInputVariable.nativeElement.value = '';
    this.areaHoja = '';


    try {

      // Se guarda ordenadamente cada item en el array(listaItemsExcel) que luego se envia a java para buscar homologado
      this.listaEx.forEach(obj => {

        if (count === 0 && obj.length <= 10) {
          itemExcel.codigoItem = obj;
          count++;
        } else {
          itemExcel.cantidad = parseInt(obj, 0);
          count = 0;
          this.listaItemsExcel.push(itemExcel);
          itemExcel = new ItemExcel();
        }
      });

      // Agregar el nit en el ultimo campo
      const nit: ItemExcel = new ItemExcel();
      nit.codigoItem = this.authService.usuario.nit;
      nit.cantidad = -1;
      this.listaItemsExcel.push(nit);

      // Se envia la lista de items Excel
      this.pedidosService.tratamientoListaItemsExcelJava(this.listaItemsExcel).subscribe(
        obj => {
          // Se valida que la cantidad que salio sea la misma que entro
          if (this.listaItemsExcel.length - obj.length === 1) {

            // Se itera sobre el arreglo recibido
            for (let i = 0; i < obj.length; i++) {

              // Se recibe el array de items
              const itemPedidoActual: ItemPedido = new ItemPedido();
              itemPedidoActual.codCliente = this.listaItemsExcel[i].codigoItem;
              itemPedidoActual.descripcionCompletaItem = obj[i].substring(0, 54);
              itemPedidoActual.descripcionExt1 = obj[i].substring(54, 100);
              itemPedidoActual.descripcionExt2 = obj[i].substring(100, 147);
              itemPedidoActual.unidadMedida = obj[i].substring(147, 151);
              itemPedidoActual.cantidad = this.listaItemsExcel[i].cantidad;
              itemPedidoActual.codItem = parseInt(itemPedidoActual.descripcionCompletaItem.substring(0, 7), 0);
              itemPedidoActual.descripcion = itemPedidoActual.descripcionCompletaItem.substring(10, 50);
              itemPedidoActual.idExt1Detalle = itemPedidoActual.descripcionExt1.substring(0, 4);
              itemPedidoActual.idExt2Detalle = itemPedidoActual.descripcionExt2.substring(0, 5);
              itemPedidoActual.unoeeItem = 0;
              itemPedidoActual.unoeeListasMateriales = 0;
              itemPedidoActual.unoeePortafolio = 0;
              itemPedidoActual.unoeePrecios = 0;

              // Busca la bodega del item
              this.pedidosService.obtenerBodegaItemJava(itemPedidoActual.codItem + '').subscribe(
                obj2 => {
                  itemPedidoActual.idBodega = obj2[0];

                  if (this.authService.usuario.nit.trim() === '1792196841001') {
                    itemPedidoActual.idMotivo = '02';
                  }
                  // tslint:disable-next-line:one-line
                  else {
                    itemPedidoActual.idMotivo = '01';
                  }

                  // Se agrega a la lista de itempedido
                  this.listaItemPedidoSelect = this.pedidosService.obtenerListaItemPedidoSelectStoragee();
                  this.listaItemPedidoSelect.push(itemPedidoActual);

                  // Se debe de guardar en el sessionStorage
                  this.pedidosService.guardarListaItemPedidoSelectStorage(this.listaItemPedidoSelect);

                  // Se carga nuevamente session storage para evitar conflictos de nueva escritra la lista del local storage
                  this.listaItemPedidoSelect = this.pedidosService.obtenerListaItemPedidoSelectStoragee();

                  // Prueba para emitir lista.
                  this.listaOutputItemPedidoSelect.emit(this.listaItemPedidoSelect);
                });
            }
            // Mostrar mensaje de exito
            swal('Correcto', `Los items se han añadido exitosamente`, 'success');

            // Se inicializa la lista de excel
            this.listaItemsExcel = [];
          }

          // Si existen errores en algun codigo de barras, se cancela la agregacion de items
          // tslint:disable-next-line:one-line
          else {
            // Toma los codigo de barras con errores
            let listaErroresCodBarras = '';
            let countErr = 0;

            obj.forEach(x => {
              if (x.includes('vacio')) {
                listaErroresCodBarras += ' - ' + x.substring(6, x.length);
                countErr++;
              }
            });

            // Evalua si hay un solo error o varios errores
            if (countErr === 1) {
              swal('Error', 'No se encuentra el siguiente codigo de barras: ' + listaErroresCodBarras, 'error');
            } else {
              swal('Error', 'No se encuentran los siguientes codigos de barras: ' + listaErroresCodBarras, 'error');
            }
            // Se reestablece inactivacion de boton procesar archivo
            this.errorLectura = true;

            // Se inicializa la lista de excel
            this.listaItemsExcel = [];
          }
        });

    } catch (e) {
      swal('Error', 'Ha ocurrido un error en el procesamiento');
      // Se reestablece inactivacion de boton procesar archivo
      this.errorLectura = true;
    }

    // Se reestablece inactivacion de boton procesar archivo en la espera de mas datos
    this.errorLectura = true;
  }



  // Se elimina un item de la lista seleccionada
  removerItem(item: ItemPedido): void {
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
    swal('Correcto', `Se ha eliminado el item ${nombreItemEliminar} exitosamente`, 'success');

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
        swal('Correcto', `Se ha eliminado el item ${nombreItemEliminar} exitosamente`, 'success');
        console.log(this.listaInputItemPedidoSelect);

        // Guardar en el session storage
        this.pedidosService.guardarListaItemPedidoSelectStorage(this.listaInputItemPedidoSelect);
      });
  }

}


