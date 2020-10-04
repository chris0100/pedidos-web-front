import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public authService: AuthService, private router: Router) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError(err => {
        if (err.status === 401) {

          // Si ha vencido el token, pero sigue autenticado por parte de angular
          // se debe cerrar por el metodo logout
          if (this.authService.isAuthenticated()) {
            const tipologin = this.authService.usuario.roles.findIndex(obj => obj === 'ADMIN');
            this.authService.logout();

            if (tipologin < 0) {
              this.router.navigate(['/login']);
            }
            else {
              this.router.navigate(['/login-admin']);
            }
          }
          // Redirecciona a la pagina de login
          this.router.navigate(['/login']);
        }


        // Si el error de status es 403
        if (err.status === 403) {
          swal('Acceso denegado', `${this.authService.usuario.username}, tienes permiso para acceder a este recurso`, 'warning');
          this.router.navigate(['/panel-principal']);
        }
        return throwError(err);
      })
    );
  }


}
