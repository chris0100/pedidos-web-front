import {Component, OnInit} from '@angular/core';
import {PedidoService} from '../../pedidos/pedido.service';
import {AuthService} from '../../login/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-validacion-items',
  templateUrl: './validacion-items.component.html'
})


export class ValidacionItemsComponent implements OnInit {

  coditemPatronBuscado: string;  // input del codigo item
  listaItemPatron: string[]; // lista items
  codigoItem: string;  // Codigo item cliente, aunque no funcional en codigoEka, se inicializa

  listaExt1: string[]; // lista de tamaño encontrada filtro
  listaExt2: string[]; // lista de color encontrada filtro

  seleccionExt1: string;  // viene de lo seleccionado en el input
  seleccionExt2: string; // viene de lo seleccionado en el input

  ext1: string; // seleccionExt1  0-4(ext1)
  ext2: string; // seleccionExt2 0-5(ext1)
  descExt1: string; // seleccionExt1 - 5-end(descExt1).trim()
  descExt2: string; // seleccionExt2 -  5-end(descExt2).trim()
  referencia: string; // Referencia traida de consulta
  descripcion: string; // Descripcion traida de consulta
  undInventario: string; // undInventario traida de consulta
  undOrden: string;  // undOrden traida de consulta
  codBarra: string;  // codBarra traida de consulta


  // selectores cod Item
  // *************
  lastkeydown1 = 0;
  userList1: any[];


  constructor(private pedidosService: PedidoService, public authService: AuthService) {
    this.seleccionExt1 = '';
    this.seleccionExt2 = '';
    this.codigoItem = '';
    this.ext1 = '';
    this.ext2 = '';
    this.descExt1 = '';
    this.descExt2 = '';
    this.listaExt1 = [];
    this.listaExt2 = [];
    this.referencia = '';
    this.descripcion = '';
    this.undInventario = '';
    this.undOrden = '';
    this.codBarra = '';
  }


  ngOnInit() {

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
  // Carga de datos de lista de extensiones
  consultarTipoExt(): void {
    console.log('sre ha activado consultar el tipo ext');

    // Limpiar campos
    this.limpiarCampos();

    this.codigoItem = this.coditemPatronBuscado.substring(0, 7);

    // Si hay contenido en el patron buscado, realizar busqueda
    if (this.coditemPatronBuscado !== '') {
      // Obtener ListaExt1
      this.pedidosService.consultarListaExt1Java(parseInt(this.codigoItem, 0)).subscribe(
        obj => {
          this.listaExt1 = obj;
          console.log(this.listaExt1);
        });

      // Obtener listaExt2
      this.pedidosService.consultarListaExt2Java(parseInt(this.codigoItem, 0)).subscribe(
        obj => {
          this.listaExt2 = obj;
          console.log(this.listaExt2);
        });
    }
  }



  // Clic en el boton consultar item
  consultarItem(): void {
    console.log('seleccionado: ' + this.ext1.substring(0, 4) + ' : ' + this.ext2.substring(0, 5));
    this.ext1 = this.seleccionExt1.substring(0, 4);
    this.ext2 = this.seleccionExt2.substring(0, 5);
    this.descExt1 = this.seleccionExt1.substring(5, this.seleccionExt1.length);
    this.descExt2 = this.seleccionExt2.substring(5, this.seleccionExt2.length);

    // Evalua el tamaño de la lista encontrada
    if (this.listaExt1.length !== 0) {

      // Obtiene los datos completos de disponible e item completo
      this.pedidosService.obtenerDatosItemCompleto(parseInt(this.codigoItem, 0), this.ext1, this.ext2)
        .subscribe(
          obj => {
            console.log(obj);
            if (obj.length > 0) {
              console.log('positivo contar');
              this.referencia = obj[1];
              this.descripcion = obj[0];
              this.undInventario = obj[2];
              this.undOrden = obj[3];
              this.codBarra = obj[4];
            }
              // Si no se encuentra el item, envia mensaje
            // tslint:disable-next-line:one-line
            else {
              this.limpiarCampos();
              swal('Ítem no encontrado', 'El ítem no fue encontrado en la base de datos del UnoEE', 'error');
            }
          }, error => {
            if (error.status === 500) {
              swal('Error', 'Se deben suministrar mas datos para la busqueda', 'error');
            }
          }
        );

      this.pedidosService.obtenerDisponibleItemCompleto(parseInt(this.codigoItem, 0), this.ext1, this.ext2)
        .subscribe(
          obj => console.log(obj)
          // Espacio libre para añadir disponible
        );
    }


    // Si no se cumple la condicion del tamaño
    // tslint:disable-next-line:one-line
    else {
      // Obtiene los datos completos de disponible e item
      this.pedidosService.obtenerDatosItem(parseInt(this.codigoItem, 0))
        .subscribe(
          obj => {
            console.log(obj);
            if (obj.length > 0) {
              console.log('positivo contar2');
              this.referencia = obj[1];
              this.descripcion = obj[0];
              this.undInventario = obj[2];
              this.undOrden = obj[3];
              this.codBarra = obj[4];
            }
            // Si no se encuentra el item, envia mensaje
            // tslint:disable-next-line:one-line
            else {
              this.limpiarCampos();
              swal('Ítem no encontrado', 'El ítem no fue encontrado en la base de datos del UnoEE', 'error');
            }
          }
        );

      this.pedidosService.obtenerDisponibleItem(parseInt(this.codigoItem, 0))
        .subscribe(
          obj => console.log(obj)
          // Espacio libre para añadir disponible
        );
    }
  }



  // Limpieza de campos
  limpiarCampos(): void {
    this.seleccionExt1 = '';
    this.seleccionExt2 = '';
    this.codigoItem = '';
    this.ext1 = '';
    this.ext2 = '';
    this.descExt1 = '';
    this.descExt2 = '';
    this.listaExt1 = [];
    this.listaExt2 = [];
    this.referencia = '';
    this.descripcion = '';
    this.undInventario = '';
    this.undOrden = '';
    this.codBarra = '';
  }






}
