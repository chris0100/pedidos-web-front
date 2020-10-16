import {Injectable} from '@angular/core';
import {Pedido} from './pedido';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {any} from 'codelyzer/util/function';
import {catchError, map} from 'rxjs/operators';
import {PedidoUnoEE} from './pedido-uno-ee';
import {ItemPedidoUnoEE} from './item-pedido-uno-ee';
import {ItemPedido} from './item-pedido';
import {ItemExcel} from './item-excel';

@Injectable({
  providedIn: 'root'
})


export class PedidoService {

  public pedido: Pedido;
  url = 'http://localhost:8082/api';


  constructor(private http: HttpClient, private router: Router) {
  }


  // Se llama a la lista de pedidos en borrador
  listarPedidosBorradorJava(nit: string): Observable<any> {
    const urlEndPoint = this.url + '/listar-pedidos-borrador';
    return this.http.get<Pedido>(`${urlEndPoint}/${nit}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  // Se llama a la lista de pedidos en verificacion con estadoWB=1
  listarPedidosVerificacionJava(nit: string): Observable<any> {
    const urlEndPoint = this.url + '/listar-pedidos-verificacion';
    return this.http.get<Pedido>(`${urlEndPoint}/${nit}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  // Se llama a la lista de pedidos en el historial para el usuario con los parametro necesarios
  listaHistorialPedidosJava(nit: string, fechaParametro1: string, fechaParametro2: string): Observable<any> {
    const urlEndPoint = this.url + '/listar-historial-pedidos';
    return this.http.get<PedidoUnoEE>(`${urlEndPoint}/${nit}/${fechaParametro1}/${fechaParametro2}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  // Obtener un solo pedido unoEE
  obtenerListaItemsPedidoUnoEEJava(id: number): Observable<any> {
    const urlEndPoint = this.url + '/obtener-lista-items-pedidoUnoEE';
    return this.http.get<ItemPedidoUnoEE[]>(`${urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  // Obtiene el pedido ya sea de verificacion o de borrador
  obtenerPedidoVBJava(id: number): Observable<any> {
    const urlEndPoint = this.url + '/obtener-lista-items-vb';
    return this.http.get<ItemPedidoUnoEE[]>(`${urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  // Obtiene datos del punto de envio
  obtenerPuntoEnvio(nit: string, idSucursal: string, idPuntoEnvio: string): Observable<string[]> {
    const urlEndPoint = this.url + '/obtener-punto-envio';
    return this.http.get<string[]>(`${urlEndPoint}/${nit}/${idSucursal}/${idPuntoEnvio}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  // Hace busqueda de algun codigo item cliente asociado para mostrar el panel "BUSCAR TU CODIGO"
  contarMostrarPanel(nit: string): Observable<number[]> {
    const urlEndPoint = this.url + '/contar-mostrar-panel';
    return this.http.get<number[]>(`${urlEndPoint}/${nit}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  // Consulta la lista de item patron
  obtenerListaItemPatronJava(): Observable<string[]> {
    const urlEndPoint = this.url + '/lista-item-patron';
    return this.http.get<string[]>(`${urlEndPoint}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  // Consulta el tipo de extension
  consultarTipoExtJava(codigoItem: string): Observable<string[]> {
    const urlEndPoint = this.url + '/tipo-extensiones';
    return this.http.get<string[]>(`${urlEndPoint}/${codigoItem}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  // Consulta el ext1(tamaño)
  consultaExt1Java(ext1: string): Observable<string[]> {
    const urlEndPoint = this.url + '/ext1';
    return this.http.get<string[]>(`${urlEndPoint}/${ext1}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  // Consulta el ext2(tamaño)
  consultaExt2Java(ext2: string): Observable<string[]> {
    const urlEndPoint = this.url + '/ext2';
    return this.http.get<string[]>(`${urlEndPoint}/${ext2}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  // Consulta la unidad del item en el inventario
  consultarUnidadInventarioJava(codigoItem: string): Observable<string[]> {
    const urlEndPoint = this.url + '/unidad-inventario';
    return this.http.get<string[]>(`${urlEndPoint}/${codigoItem}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  // Consultar decimales unidad inventario
  consultaDecimalesUnidadInventario(unidadMedida: string): Observable<string[]> {
    const urlEndPoint = this.url + '/decimales-unidad-inventario';
    return this.http.get<string[]>(`${urlEndPoint}/${unidadMedida}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }



  // Consulta la descripcion del label Ext1
  consultarDescripcionLabelExt1(ext1: string): Observable<string[]> {
    const urlEndPoint = this.url + '/consulta-descripcion-label-ext1';
    return this.http.get<string[]>(`${urlEndPoint}/${ext1}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }



  // Consulta la descripcion del label Ext2
  consultarDescripcionLabelExt2(ext2: string): Observable<string[]> {
    const urlEndPoint = this.url + '/consulta-descripcion-label-ext2';
    return this.http.get<string[]>(`${urlEndPoint}/${ext2}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }



  // Consulta la bodega del item
  obtenerBodegaItemJava(codigoItem: string): Observable<string[]> {
    const urlEndPoint = this.url + '/obtener-bodega-item';
    return this.http.get<string[]>(`${urlEndPoint}/${codigoItem}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  // Sincronizar la bodega del item
  sincronizarBodegaItemsJava(idItem: number, codigoItem: string): Observable<string[]> {
    const urlEndPoint = this.url + '/sincronizar-bodega-item';
    return this.http.get<string[]>(`${urlEndPoint}/${idItem}/${codigoItem}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }



  // Sincronizar precio ecuador
  sincronizarPrecioEcuadorJava(idItem: number): Observable<string[]> {
    const urlEndPoint = this.url + '/sincronizar-precio-ecuador';
    return this.http.get<string[]>(`${urlEndPoint}/${idItem}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }






  // Localiza el item homologado para el cliente con el codigoitem asignado
  contarHomologarItemDuplicado(nit: string, codigoItem: string): Observable<string[]> {
    const urlEndPoint = this.url + '/contar-homologar-item-duplicado';
    return this.http.get<string[]>(`${urlEndPoint}/${nit}/${codigoItem}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  // Crea el pedido como borrador.
  crearPedidoBorrador(pedido: Pedido): Observable<string> {
    const urlEndPoint = this.url + '/add-pedido-borrador';
    return this.http.post(urlEndPoint, pedido).pipe(
      map((response: any) => response.nuevoId as string),
      catchError(e => {

        if (e.status === 400) {
          return throwError(e);
        }

        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  // Editar Item pedido Error
  editarItemPedidoError(itemPedido: ItemPedido): Observable<string> {
    const urlEndPoint = this.url + '/editar-item-pedido-error';
    return this.http.post(urlEndPoint, itemPedido).pipe(
      map((response: any) => response.mensaje as string),
      catchError(e => {

        if (e.status === 400) {
          return throwError(e);
        }

        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  // Obtener datos asesor unoEE
  obtenerDatosAsesorUnoEEJava(idSucursal: string, nit: string): Observable<string[]> {
    const urlEndPoint = this.url + '/obtener-datos-asesor-unoee';
    return this.http.get<string[]>(`${urlEndPoint}/${idSucursal}/${nit}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  // Se hace el respectivo tratamiento con el webservice
  webServiceProcess(pedido: Pedido): Observable<string> {
    const urlEndPoint = this.url + '/obtener-conector';
    return this.http.post<string>(urlEndPoint, pedido);
  }


  // Se hace el respectivo tratamiento con el webservice con el pedido que esta en error
  webServiceProcessError(pedido: Pedido): Observable<string> {
    const urlEndPoint = this.url + '/obtener-conector-error';
    return this.http.post<string>(urlEndPoint, pedido);
  }


  // Se envia listado de items de excel para realizar respectiva comparacion
  tratamientoListaItemsExcelJava(listaItemsExcel: ItemExcel[]): Observable<string[]> {
    const urlEndPoint = this.url + '/tratamiento-lista-items-excel';
    return this.http.post<string[]>(urlEndPoint, listaItemsExcel);
  }


  // Eliminar borrador a traves del id
  eliminarBorradorJava(id: number): Observable<Pedido> {
    const urlEndPoint = this.url + '/eliminar-pedido-borrador';
    return this.http.delete<Pedido>(`${urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if ( e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }



  // Elimina el item de un borrador a traves del id
  eliminarItemBorradorJava(id: number): Observable<ItemPedido> {
    const urlEndPoint = this.url + '/eliminar-item-borrador';
    return this.http.delete<ItemPedido>(`${urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if ( e.error.mensaje) {
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }



  // Consultar lista ext1(tamaño)
  consultarListaExt1Java(codItem: number): Observable<string[]> {
    const urlEndPoint = this.url + '/obtener-lista-ext1';
    return this.http.get<string[]>(`${urlEndPoint}/${codItem}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }



  // Consultar lista ext2(color)
  consultarListaExt2Java(codItem: number): Observable<string[]> {
    const urlEndPoint = this.url + '/obtener-lista-ext2';
    return this.http.get<string[]>(`${urlEndPoint}/${codItem}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }



  // Obtener datos item completo
  obtenerDatosItemCompleto(codItem: number, ext1: string, ext2: string): Observable<string[]> {
    const urlEndPoint = this.url + '/obtener-datos-item';
    return this.http.get<string[]>(`${urlEndPoint}/${codItem}/${ext1}/${ext2}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  // Obtener disponible item completo
  obtenerDisponibleItemCompleto(codItem: number, ext1: string, ext2: string): Observable<string[]> {
    const urlEndPoint = this.url + '/obtener-disponible-item';
    return this.http.get<string[]>(`${urlEndPoint}/${codItem}/${ext1}/${ext2}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }



  // Obtener datos item
  obtenerDatosItem(codItem: number): Observable<string[]> {
    const urlEndPoint = this.url + '/obtener-datos-item';
    return this.http.get<string[]>(`${urlEndPoint}/${codItem}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  // Obtener disponible item completo
  obtenerDisponibleItem(codItem: number): Observable<string[]> {
    const urlEndPoint = this.url + '/obtener-disponible-item';
    return this.http.get<string[]>(`${urlEndPoint}/${codItem}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }



  // Listar pedidos error completo
  listarPedidosErrorCompletoJava(): Observable<Pedido[]> {
    const urlEndPoint = this.url + '/obtener-lista-pedido-error';
    return this.http.get<Pedido[]>(`${urlEndPoint}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  // Listar pedidos error asesor
  listarPedidosErrorAsesorJava(nit: string): Observable<Pedido[]> {
    const urlEndPoint = this.url + '/obtener-lista-pedido-error-asesor';
    return this.http.get<Pedido[]>(`${urlEndPoint}/${nit}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  // Sincronizacion de items del pedido con error
  sincronizarItemsJava(idPedido: string, nit: string): Observable<string> {
    const urlEndPoint = this.url + '/sincronizar-items';
    return this.http.get<string>(`${urlEndPoint}/${idPedido}/${nit}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }



  // Obtener los items mas vendidos(LOS TOP 10)
  recargarConsultaItemsPedidosUnoEE(nit: string, sucursal: string): Observable<ItemPedidoUnoEE[]> {
    const urlEndPoint = this.url  + '/recargar-consulta-items-unoee';
    return this.http.get<ItemPedidoUnoEE[]>(`${urlEndPoint}/${nit}/${sucursal}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }










  // ***********************************
  // SESSION STORAGE
  // ***********************************

  // Se guarda el pedido en el sessionStorage para historial de pedidos
  guardarPedidosUnoEESessionStorage(pedidosUnoEE: PedidoUnoEE[]): void {
    sessionStorage.setItem('pedidosUnoEEHistorial', JSON.stringify(pedidosUnoEE));
  }


  // Obtener historial de pedidos guardado en Session Storage
  obtenerPedidoUnoEEGuardadoSessionStorage(): PedidoUnoEE[] {
    return JSON.parse(sessionStorage.getItem('pedidosUnoEEHistorial')) as PedidoUnoEE[];
  }


  // Se guarda el la lista de itemPedidoSeleccionada en el sessionStorage
  guardarListaItemPedidoSelectStorage(listaItemPedidoSelect: ItemPedido[]): void {
    sessionStorage.setItem('listaItemPedidoSelect', JSON.stringify(listaItemPedidoSelect));
  }


  // Obtener la lista de itemPedidoSeleccionada en el sessionStorage
  obtenerListaItemPedidoSelectStoragee(): ItemPedido[] {
    const listaItemsPedidoSelect: ItemPedido[] = JSON.parse(sessionStorage.getItem('listaItemPedidoSelect')) as ItemPedido[];
    if (listaItemsPedidoSelect == null) {
      return [];
    }
    return listaItemsPedidoSelect;
  }


  // Se obtiene la lista de itempatron
  obtenerListaItemPatronStorage(): string[] {
    const listaItemPatron: string[] = JSON.parse(sessionStorage.getItem('listaItemPatron')) as string[];
    if (listaItemPatron == null) {
      return [];
    }
    return listaItemPatron;
  }

  // Se guarda la lista de item patron en la primera visita a la pagina de crear pedido
  guardarListaItemPatronStorage(listaItemPatron: string[]): void {
    sessionStorage.setItem('listaItemPatron', JSON.stringify(listaItemPatron));
  }


}





