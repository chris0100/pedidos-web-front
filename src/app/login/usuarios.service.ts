import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Usuario} from './usuario';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }


  updateUsuarioJava(usuario: Usuario): Observable<any> {
    const urlEndPoint = 'http://localhost:8082/update-cliente';

    return this.http.put(`${urlEndPoint}/${usuario.id}`, usuario).pipe(
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


}
