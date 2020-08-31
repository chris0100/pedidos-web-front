import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Usuario} from './usuario';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public usuario: Usuario;

  constructor(private http: HttpClient, private authService: AuthService) {
  }


  // Permite la actualizacion del usuario a traves de la opcion de Configuracion
  updateUsuarioJava(usuarioModificado: Usuario): Observable<any> {
    const urlEndPoint = 'http://localhost:8082/update-cliente';

    // Se llama al usuario actualmente logueado
    this.usuario = this.authService.usuario;

    // Retorna lo que se obtiene de la peticion
    return this.http.put(`${urlEndPoint}/${this.usuario.id}`, usuarioModificado).pipe(
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


  // Permite el cambio de contraseña en el backend
  cambiarPasswordJava(passwordActual: string, passwordNuevo: string): Observable<any> {
    const urlEndPoint = 'http://localhost:8082/update-pass-cliente';

    // Se llama al usuario actualmente logueado
    this.usuario = this.authService.usuario;

    const pass: string[] = [];
    pass.push(passwordActual);
    pass.push(passwordNuevo);


    // Retorna lo que se obtiene de la peticion
    return this.http.put(`${urlEndPoint}/${this.usuario.id}`, pass)
      .pipe(
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
