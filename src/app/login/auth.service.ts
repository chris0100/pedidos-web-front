import {Injectable} from '@angular/core';
import {Usuario} from '../usuario/usuario';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  // tslint:disable-next-line:variable-name
  private _usuario: Usuario;
  // tslint:disable-next-line:variable-name
  private _token: string;

  url = 'http://192.168.160.156:8080';

  constructor(private http: HttpClient) {
  }


  // ***************************
  // Metodos get y set
  // ***************************

  // Metodo get para el usuario
  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    }

      // Si el usuario es nulo pero existe en el sessionStorage
    // tslint:disable-next-line:one-line
    else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }


  // Metodo get para el token
  public get token(): string {
    if (this._token != null) {
      return this._token;
    }

      // Si el token es nulo pero existe en el sessionStorage
    // tslint:disable-next-line:one-line
    else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }


  // Se realiza login del usuario
  login(usuario: Usuario): Observable<any> {
    const urlEndPoint = this.url + '/oauth/token';

    // credenciales para entrada desde angular
    const credenciales = btoa('angularapp' + ':' + '12345');

    // cabeceras
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + credenciales
    });

    // Parametros de inicio de sesion
    const params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);


    return this.http.post<any>(urlEndPoint, params.toString(), {headers: httpHeaders});
  }


  // Valida si es un usuario nuevo el que intenta ingresar.
  validaUsuarioNuevoHabilitado(nit: string, password: string, username: string): Observable<string[]> {
    const urlEndPoint = this.url + '/nit-password-usuario-nuevo';
    return this.http.get<string[]>(`${urlEndPoint}/${nit}/${password}/${username}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          console.log('error encontrado');
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  // Valida si es un proveedor nuevo el que intenta ingresar (username = nit para proveedor)
  validarProveedorNuevoHabilitado(nit: string, password: string): Observable<string[]> {
    const urlEndPoint = this.url  + '/nit-password-proveedor-nuevo';
    return this.http.get<string[]>(`${urlEndPoint}/${nit}/${password}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          console.log('error encontrado');
          console.log(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }




  // Se guarda el usuario en el sessionStorage
  guardarUsuario(accessToken: string): void {
    const objPayload = this.obtenerDatosToken(accessToken);
    console.log(objPayload);
    this._usuario = new Usuario();
    this._usuario.nombre = objPayload.nombre.trim();
    this._usuario.cliente = objPayload.cliente;
    this._usuario.email = objPayload.email.trim();
    this._usuario.username = objPayload.user_name.trim();
    this._usuario.nit = objPayload.nit;
    this._usuario.roles = objPayload.authorities;
    this._usuario.id_sucursal = objPayload.id_sucursal;
    this._usuario.descripcion_punto_envio = objPayload.descripcion_punto_envio;
    this._usuario.descripcion_sucursal = objPayload.descripcion_sucursal;
    this._usuario.id = objPayload.id_usuario;
    this._usuario.id_punto_envio = objPayload.id_punto_envio;
    this._usuario.primerLogin = objPayload.primerLogin;

    // Se guarda en el session como un string
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }


  ModificarDatosUsuarioSessionStorage(objPayload: any, nombre: string, email: string) {
    this._usuario = new Usuario();
    this._usuario.nombre = nombre.trim();
    this._usuario.cliente = objPayload.cliente;
    this._usuario.email = email.trim();
    this._usuario.username = objPayload.user_name.trim();
    this._usuario.nit = objPayload.nit;
    this._usuario.roles = objPayload.authorities;
    this._usuario.id_sucursal = objPayload.id_sucursal;
    this._usuario.descripcion_punto_envio = objPayload.descripcion_punto_envio;
    this._usuario.descripcion_sucursal = objPayload.descripcion_sucursal;
    this._usuario.id = objPayload.id_usuario;
    this._usuario.id_punto_envio = objPayload.id_punto_envio;
    this._usuario.primerLogin = objPayload.primerLogin;

    // Se guarda en el session como un string
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }


  // Se guarda el token en el sessionStorage
  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }


  // Obtener token guardado
  obtenerTokenGuardado(): any {
    return sessionStorage.getItem('token');
  }


  // Obtener los datos del token
  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;
  }


  // Revisar si el usuario esta autenticado
  isAuthenticated(): boolean {
    const objPayload = this.obtenerDatosToken(this.token);
    return objPayload != null && objPayload.user_name.length > 0;
  }


  // Cierra la sesion limpiando los datos del token y del session storage
  logout(): void {
    this._token = null;
    this._usuario = null;

    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }


  // Revisa si el usuario tiene un rol incluido
  hasRole(role: string): boolean {
    if (this.usuario.roles.includes(role)) {
      return true;
    }
    return false;
  }


  // Obtener la sucursal desde el backend
  obtenerSucursalJava(nitCliente: string): Observable<string[]> {
    const urlEndPoint = this.url  + '/obtener-sucursal';
    return this.http.get<string[]>(`${urlEndPoint}/${nitCliente}`);
  }


  // Obtener el punto de envio desde el backend
  obtenerPuntoEnvioJava(nitCliente: string, sucursal: string): Observable<string[]> {
    const urlEndPoint = this.url  + '/obtener-punto-envio';
    return this.http.get<string[]>(`${urlEndPoint}/${nitCliente}/${sucursal.substring(0, 3)}`);
  }


  // Validar la entidad dinamica en el backend
  validarEntidadDinamicaJava(nitCliente: string, sucursal: string): Observable<string[]> {
    const urlEndPoint = this.url + '/validar-entidad-dinamica';
    return this.http.get<string[]>(`${urlEndPoint}/${nitCliente}/${sucursal.substring(0, 3)}`);
  }


}
