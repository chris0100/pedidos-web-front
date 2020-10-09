import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {CertificadoRetencionIVA} from './certificado-retencion-iva';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})


export class ProveedorService {

  url = 'http://192.168.160.181:8082';

  constructor(private http: HttpClient, private router: Router) { }


  // Obtener el row id del tercero
  obtenerRowIdTercero(nit: string): Observable<string[]> {
    const urlEndPoint = this.url + '/obtener-row-id-tercero';
    return this.http.get<string[]>(`${urlEndPoint}/${nit}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/panel-principal']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }



  // crear PDF despues de seleccionar tipo certificado PCI
  crearPDFIva(mesInicio: string, mesFin: string,
              anioGrabable: string, rowIdTercero: number): Observable<CertificadoRetencionIVA[]> {
    const urlEndPoint = this.url + '/crear-pdf-iva';
    return this.http.get<CertificadoRetencionIVA[]>(`${urlEndPoint}/${mesInicio}/${mesFin}/${anioGrabable}/${rowIdTercero}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          swal('Error', e.error.mensaje, 'error');
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  // Crea el pdf despues de seleccionar PCC
  crearPDFRetencion(anioGrabable: string, rowIdTercero: number,
                    ciudadConsignoParam: string, ciudadPracticoParam: string,
                    tipoCertificado: string): Observable<CertificadoRetencionIVA[]> {
    const urlEndPoint = this.url + '/crear-pdf-retencion';
    // tslint:disable-next-line:max-line-length
    return this.http.get<CertificadoRetencionIVA[]>(`${urlEndPoint}/${anioGrabable}
    /${rowIdTercero}/${ciudadConsignoParam}/${ciudadPracticoParam}/${tipoCertificado}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          swal('Error', e.error.mensaje, 'error');
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }



}
