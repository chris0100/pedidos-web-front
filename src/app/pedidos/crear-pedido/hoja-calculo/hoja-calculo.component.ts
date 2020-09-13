import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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


  // Permite remover un item de la tabla
  removerItem(item: ItemPedido): void {
    console.log('se ha removido un item');
  }


  // Añadir archivo de Excel para mostrar en el area de texto
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
      console.log(XLSX.utils.sheet_to_formulae(worksheet));

      const arre = XLSX.utils.sheet_to_formulae(worksheet);
      let contador = 0;
      let repiteTipo = false;


      // Lectura de contenido organizandolo para mostrar en textarea.
      arre.forEach(obj => {
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
          if (contador >= 2 && obj.includes('=\'') && !repiteTipo) {
            const cadena = obj.split('\'')[1];
            if (cadena.trim().length === 10) {
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
          if (contador >= 2 && !obj.includes('=\'')) {
            if (repiteTipo) {
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
        // Si en la primera vuelta no tiene capturada las cabeceras, genera error
        // tslint:disable-next-line:one-line max-line-length
        if ((contador < 1 && !obj.includes('CÓDIGO') || (contador === 2 && !obj.includes('CANTIDAD'))
          || (contador === 1 && !obj.includes('CÓDIGO') && this.areaHoja.includes('CÓDIGO')) || this.areaHoja.includes('ERROR'))) {
          swal('Error de carga', 'El archivo cargado contiene errores, verificalo por favor', 'error');
          this.errorLectura = true;
          this.listaEx = [];
          return;
        } else {
          // Si llega aqui significa que todo esta bien
          this.errorLectura = false;
        }
      });
    };
  }


  // Revisar datos
  procesarArchivo(): void {
    let count = 0;
    let itemExcel = new ItemExcel();

    try {
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

      // Se envia la lista de items Excel
      this.pedidosService.tratamientoListaItemsExcelJava(this.listaItemsExcel).subscribe(
        obj => console.log(obj)
      );

    } catch (e) {
      swal('Error', 'Ha ocurrido un error en el procesamiento');
    }




    console.log(this.listaItemsExcel);
  }

}


