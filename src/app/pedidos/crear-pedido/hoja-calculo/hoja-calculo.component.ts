import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemPedido} from '../../item-pedido';
import {PedidoService} from '../../pedido.service';
import {AuthService} from '../../../login/auth.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-hoja-calculo',
  templateUrl: './hoja-calculo.component.html'
})


export class HojaCalculoComponent implements OnInit {

  listaItemPedidoSelect: ItemPedido[] = [];  // Listado de items que van siendo añadidos

  // Datos para manejo del excel
  file: File;
  arrayBuffer: any;
  filelist: any;

  // area de texto
  areaHoja: string;

  @Input() listaInputItemPedidoSelect: ItemPedido[];

  @Output() listaOutputItemPedidoSelect = new EventEmitter<ItemPedido[]>();


  // Constructor
  constructor(private pedidosService: PedidoService, private authService: AuthService) {
  }


  ngOnInit(): void {
    this.areaHoja = ' ';
  }


  // Permite remover un item de la tabla
  removerItem(item: ItemPedido): void {
    console.log('se ha removido un item');
  }


  // Añadir archivo de Excel para mostrar en el area de texto
  addFile(event) {
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


      arre.forEach(obj => {
        if (obj.includes('CÓDIGO') && contador === 0) {
          this.areaHoja += 'CODIGO ITEM\t | \t';
          contador++;
        }
        if (obj.includes('CANTIDAD') && contador === 1) {
          this.areaHoja += 'CANTIDAD\n-------------------------\n';
          contador++;
        }
        else{
          if (contador >= 2 && obj.includes('=\'')) {
            this.areaHoja += obj.split('\'')[1] + ' \t\t | \t ';
            console.log(this.areaHoja);
          }
          if (contador >= 2 && !obj.includes('=\'')) {
            this.areaHoja += obj.split('=')[1] + '\n';
            console.log(this.areaHoja);
          }
        }
      });

      console.log(this.areaHoja);

      const arraylist = XLSX.utils.sheet_to_json(worksheet, {raw: true});


      arraylist.forEach(obj => {
        console.log(obj);
      });

      const convertidoArreglo = JSON.stringify(arraylist);

      // Extraer los datos del arraylist
      console.log(convertidoArreglo);


      // this.filelist = [];
      // console.log(this.filelist);
    };
  }

}
