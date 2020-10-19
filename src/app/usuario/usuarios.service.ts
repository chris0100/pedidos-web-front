import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../login/auth.service';
import {Usuario} from './usuario';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public usuario: Usuario;

  url = 'http://localhost:8082/api';


  constructor(private http: HttpClient, public authService: AuthService,
              private router: Router) {
  }


  // Permite la actualizacion del usuario a traves de la opcion de Configuracion
  updateUsuarioJava(usuarioModificado: Usuario): Observable<any> {
    const urlEndPoint = this.url + '/update-cliente';

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
    const urlEndPoint = this.url + '/update-pass-cliente';

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


  updatePasswordOtroUsuarioJava(passwordNuevo: string, id, primerLogin: boolean): Observable<any> {
    const urlEndPoint = this.url + '/update-pass-otro-usuario';

    // Retorna lo que se obtiene de la peticion
    return this.http.put(`${urlEndPoint}/${id}/${primerLogin}`, passwordNuevo)
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


  reestablecerPasswordJava(password: string, token: string): Observable<any> {
    const urlEndPoint = this.url + '/reestablecer-password';

    // Retorna lo que se obtiene de la peticion
    return this.http.put(`${urlEndPoint}/${token}`, password)
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
    const urlEndPoint = this.url + '/crear-usuario';
    return this.http.post<Usuario>(urlEndPoint, usuario);
  }


  // Listar usuarios de backend
  listarUsuariosJava(): Observable<any> {
    const urlEndPoint = this.url + '/listar-usuarios';
    return this.http.get(urlEndPoint);
  }


  // Obtener un usuario con el id desde el backend
  obtenerUsuarioJava(id): Observable<any> {
    const urlEndPoint = this.url + '/obtener-usuario';
    return this.http.get<Usuario>(`${urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/clientes']);
        }
        return throwError(e);
      })
    );
  }


  // Actualizar otro usuario
  editarUsuarioJava(usuario: Usuario): Observable<any> {
    const urlEndPoint = this.url + '/editar-otro-usuario';
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


  // Encontrar proveddor por nit y email
  generarTokenProveedorJava(email: string, nit: string): Observable<any> {
    const urlEndPoint = this.url + '/generar-token-proveedor';
    return this.http.get<Usuario>(`${urlEndPoint}/${email}/${nit}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
        }
        return throwError(e);
      })
    );
  }


  // Encontrar cliente por email, nit, sucursal, punto de envio
  generarTokenClienteJava(email: string, nit: string, sucursal: string, puntoEnvio: string): Observable<any> {
    const urlEndPoint = this.url + '/generar-token-cliente';
    return this.http.get<Usuario>(`${urlEndPoint}/${email}/${nit}/${sucursal}/${puntoEnvio}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          swal('Error', 'Error al generar token', 'error');
        }
        return throwError(e);
      })
    );
  }






  // Procesar el token
  procesarTokenJava(token: string): Observable<string[]> {
    const urlEndPoint = this.url + '/procesar-token';
    return this.http.get<string[]>(`${urlEndPoint}/${token}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/clientes']);
        }
        return throwError(e);
      })
    );
  }

}
