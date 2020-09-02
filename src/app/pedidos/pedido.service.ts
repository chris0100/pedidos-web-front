import { Injectable } from '@angular/core';
import {Pedido} from './pedido';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {any} from 'codelyzer/util/function';
import {catchError} from 'rxjs/operators';

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
}





