import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../login/auth.service';
import {Usuario} from './usuario';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public usuario: Usuario;

  constructor(private http: HttpClient, private authService: AuthService,
              private router: Router) {
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


  updatePasswordOtroUsuarioJava(passwordNuevo: string, id): Observable<any> {
    const urlEndPoint = 'http://localhost:8082/update-pass-otro-usuario';

    // Retorna lo que se obtiene de la peticion
    return this.http.put(`${urlEndPoint}/${id}`, passwordNuevo)
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


  // Crear un usuario de parte del admin
  crearUsuarioJava(usuario: Usuario): Observable<any> {
    const urlEndPoint = 'http://localhost:8082/crear-usuario';
    return this.http.post<Usuario>(urlEndPoint, usuario);
  }


  // Listar usuarios de backend
  listarUsuariosJava(): Observable<any> {
    const urlEndPoint = 'http://localhost:8082/listar-usuarios';
    return this.http.get(urlEndPoint);
  }


  // Obtener un usuario con el id desde el backend
  obtenerUsuarioJava(id): Observable<any> {
    const urlEndPoint = 'http://localhost:8082/obtener-usuario';
    return this.http.get<Usuario>(`${urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/clientes']);
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  // Actualizar otro usuario
  editarUsuarioJava(usuario: Usuario): Observable<any> {
    const urlEndPoint = 'http://localhost:8082/editar-otro-usuario';
    return this.http.put<any>(`${urlEndPoint}/${usuario.id}`, usuario).pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }

        if (e.error.mensaje) {
          console.error(e.error.mesaje);
        }

        return throwError(e);
      })
    );
  }

}
