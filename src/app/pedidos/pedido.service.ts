import { Injectable } from '@angular/core';
import {Pedido} from './pedido';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {any} from 'codelyzer/util/function';
import {catchError} from 'rxjs/operators';
import {PedidoUnoEE} from './pedido-uno-ee';
import {ItemPedidoUnoEE} from './item-pedido-uno-ee';

@Injectable({
  providedIn: 'root'
})


export class PedidoService {

  public pedido: Pedido;



  constructor(private http: HttpClient, private router: Router) { }


  // Se llama a la lista de pedidos en borrador
  listarPedidosBorradorJava(nit: string): Observable<any> {
    const urlEndPoint = 'http://localhost:8082/listar-pedidos-borrador';
    return this.http.get<Pedido>(`${urlEndPoint}/${nit}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-clientes']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  // Se llama a la lista de pedidos en verificacion con estadoWB=1
  listarPedidosVerificacionJava(nit: string): Observable<any> {
    const urlEndPoint = 'http://localhost:8082/listar-pedidos-verificacion';
    return this.http.get<Pedido>(`${urlEndPoint}/${nit}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-clientes']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }



  // Se llama a la lista de pedidos en el historial para el usuario con los parametro necesarios
  listaHistorialPedidosJava(nit: string, fechaParametro1: string, fechaParametro2: string): Observable<any> {
    const urlEndPoint = 'http://localhost:8082/listar-historial-pedidos';
    return this.http.get<PedidoUnoEE>(`${urlEndPoint}/${nit}/${fechaParametro1}/${fechaParametro2}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-clientes']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }



  // Obtener un solo pedido unoEE
  obtenerListaItemsPedidoUnoEEJava(id: number): Observable<any> {
    const urlEndPoint = 'http://localhost:8082/obtener-lista-items-pedidoUnoEE';
    return this.http.get<ItemPedidoUnoEE[]>(`${urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-clientes']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  obtenerPedidoVBJava(id: number): Observable<any> {
    const urlEndPoint = 'http://localhost:8082/obtener-lista-items-vb';
    return this.http.get<ItemPedidoUnoEE[]>(`${urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-clientes']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  // Se guarda el token en el sessionStorage
  guardarPedidosUnoEESessionStorage(pedidosUnoEE: PedidoUnoEE[]): void {
    sessionStorage.setItem('pedidosUnoEEHistorial', JSON.stringify(pedidosUnoEE));
  }


  // Obtener historial de pedidos guardado en Session Storage
  obtenerPedidoUnoEEGuardadoSessionStorage(): PedidoUnoEE[] {
    return JSON.parse(sessionStorage.getItem('pedidosUnoEEHistorial')) as PedidoUnoEE[];
  }





}





