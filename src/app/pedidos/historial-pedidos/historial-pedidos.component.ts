import {Component, OnInit} from '@angular/core';
import {PedidoUnoEE} from '../pedido-uno-ee';
import {PedidoService} from '../pedido.service';
import {Router} from '@angular/router';
import {AuthService} from '../../login/auth.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-historial-pedidos',
  templateUrl: './historial-pedidos.component.html'
})


export class HistorialPedidosComponent implements OnInit {

  pedidosUnoEE: PedidoUnoEE[];

  fechaParametro1: string;
  fechaParametro2: string;

  pedidoSelect: PedidoUnoEE;

  // Spinner
  showSpinner: boolean;


  // Parte nueva para ejemplo de manejo de tablas
  data;
  filterData;
  // Parte nueva para ejemplo de manejo de tablas

  constructor(private pedidosService: PedidoService, private router: Router,
              public authService: AuthService) {
  }


  ngOnInit(): void {
    this.showSpinner = false;
    this.fechaParametro1 = '';
    this.fechaParametro2 = '';

    // Si se encuentra el historial aun en el session storage
    this.pedidosUnoEE = this.pedidosService.obtenerPedidoUnoEEGuardadoSessionStorage();
    this.data = this.pedidosService.obtenerPedidoUnoEEGuardadoSessionStorage();

    // Remover la busqueda del historial de pedidos, y listaItemProductosSelect
    sessionStorage.removeItem('listaItemPedidoSelect');
  }


  // Cuando se de clic en el boton de consultar,, tomara los datos de las
  // fechas y enviara los datos para consultar.
  consultar(): void {
    this.fechaParametro1 = this.fechaParametro1.split('-')[0] + this.fechaParametro1.split('-')[1] + this.fechaParametro1.split('-')[2];
    this.fechaParametro2 = this.fechaParametro2.split('-')[0] + this.fechaParametro2.split('-')[1] + this.fechaParametro2.split('-')[2];

    this.pedidosService.listaHistorialPedidosJava(this.authService.usuario.nit, this.fechaParametro1, this.fechaParametro2).subscribe(
      obj => {
        this.pedidosUnoEE = obj;
        this.data = obj;
        console.log(this.pedidosUnoEE);

        // Se guarda el listado de pedidosUNOEE encontrado en la busqueda
        this.pedidosService.guardarPedidosUnoEESessionStorage(this.pedidosUnoEE);
        this.showSpinner = false;

        // Se envia mensaje sino encuentra resultados
        if (this.pedidosUnoEE == null) {
          swal('Advertencia', 'No se han encontrado resultados en la busqueda', 'warning');
        }
      });
    this.showSpinner = true;
  }




  searchRazonSocial(term: string) {
    console.log(this.filterData);
    if (this.filterData === undefined) {
      this.data = this.pedidosUnoEE;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }


    if (!term) {
      console.log('no envia nada');
      this.filterData = this.pedidosUnoEE;
      this.data = this.filterData;
    } else {
      console.log('si envia algo');
      this.filterData = this.data.filter(x => {
        if (x.razonSocialCliente != null) {
          return x.razonSocialCliente.toLowerCase().includes(term.toLowerCase());
        }
      });
      this.data = this.filterData;
      console.log(this.filterData);
    }
  }




  searchNumeroDocumento(term: string) {
    console.log(this.filterData);
    if (this.filterData === undefined) {
      this.data = this.pedidosUnoEE;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }


    if (!term) {
      console.log('no envia nada');
      this.filterData = this.pedidosUnoEE;
      this.data = this.filterData;
    } else {
      console.log('si envia algo');
      this.filterData = this.data.filter(x => {
        if (x.numeroDocumento != null) {
          return x.numeroDocumento.toLowerCase().includes(term.toLowerCase());
        }
      });
      this.data = this.filterData;
      console.log(this.filterData);
    }
  }



  searchEstado(term: string) {
    console.log(this.filterData);
    if (this.filterData === undefined) {
      this.data = this.pedidosUnoEE;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }


    if (!term) {
      console.log('no envia nada');
      this.filterData = this.pedidosUnoEE;
      this.data = this.filterData;
    } else {
      console.log('si envia algo');
      this.filterData = this.data.filter(x => {
        if (x.estado != null) {
          return x.estado.toLowerCase().includes(term.toLowerCase());
        }
      });
      this.data = this.filterData;
      console.log(this.filterData);
    }
  }




  searchNotas(term: string) {
    console.log(this.filterData);
    if (this.filterData === undefined) {
      this.data = this.pedidosUnoEE;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }


    if (!term) {
      console.log('no envia nada');
      this.filterData = this.pedidosUnoEE;
      this.data = this.filterData;
    } else {
      console.log('si envia algo');
      this.filterData = this.data.filter(x => {
        if (x.notas != null) {
          return x.notas.toLowerCase().includes(term.toLowerCase());
        }
      });
      this.data = this.filterData;
      console.log(this.filterData);
    }
  }




  searchOc(term: string) {
    console.log(this.filterData);
    if (this.filterData === undefined) {
      this.data = this.pedidosUnoEE;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }


    if (!term) {
      console.log('no envia nada');
      this.filterData = this.pedidosUnoEE;
      this.data = this.filterData;
    } else {
      console.log('si envia algo');
      this.filterData = this.data.filter(x => {
        if (x.ordenCompra != null) {
          return x.ordenCompra.toLowerCase().includes(term.toLowerCase());
        }
      });
      this.data = this.filterData;
      console.log(this.filterData);
    }
  }




  searchValorBruto(term: string) {
    console.log(this.filterData);
    if (this.filterData === undefined) {
      this.data = this.pedidosUnoEE;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }


    if (!term) {
      console.log('no envia nada');
      this.filterData = this.pedidosUnoEE;
      this.data = this.filterData;
    } else {
      console.log('si envia algo');
      this.filterData = this.data.filter(x => {
        const valor = x.valorBrutoDocumento + '';
        if (valor != null) {
          return valor.toLowerCase().includes(term.toLowerCase());
        }
      });
      this.data = this.filterData;
      console.log(this.filterData);
    }
  }




  searchNeto(term: string) {
    console.log(this.filterData);
    if (this.filterData === undefined) {
      this.data = this.pedidosUnoEE;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }


    if (!term) {
      console.log('no envia nada');
      this.filterData = this.pedidosUnoEE;
      this.data = this.filterData;
    } else {
      console.log('si envia algo');
      this.filterData = this.data.filter(x => {
        const valor = x.valorNetoDocumento + '';
        if (valor != null) {
          return valor.toLowerCase().includes(term.toLowerCase());
        }
      });
      this.data = this.filterData;
      console.log(this.filterData);
    }
  }



  searchDireccion(term: string) {
    console.log(this.filterData);
    if (this.filterData === undefined) {
      this.data = this.pedidosUnoEE;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }


    if (!term) {
      console.log('no envia nada');
      this.filterData = this.pedidosUnoEE;
      this.data = this.filterData;
    } else {
      console.log('si envia algo');
      this.filterData = this.data.filter(x => {
        if (x.direccion1 != null) {
          return x.direccion1.toLowerCase().includes(term.toLowerCase());
        }
      });
      this.data = this.filterData;
      console.log(this.filterData);
    }
  }


  searchImpuestos(term: string) {
    console.log(this.filterData);
    if (this.filterData === undefined) {
      this.data = this.pedidosUnoEE;
    }
    else {
      this.data = this.filterData;
      console.log('usa de filter');
    }


    if (!term) {
      console.log('no envia nada');
      this.filterData = this.pedidosUnoEE;
      this.data = this.filterData;
    } else {
      console.log('si envia algo');
      this.filterData = this.data.filter(x => {
        const valor = x.valorImpDocumento + '';
        if (valor != null) {
          return valor.toLowerCase().includes(term.toLowerCase());
        }
      });
      this.data = this.filterData;
      console.log(this.filterData);
    }
  }






}
