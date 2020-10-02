import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {


  constructor(public authService: AuthService, private router: Router) {}


  // @ts-ignore
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    // Revisa si esta autenticado
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    const role = next.data.role as string;

    // Si encuentra el role correspondiente retorna verdadero
    if (this.authService.hasRole(role)) {
      return true;
    }

    const roles = next.data['roles'] as Array<string>;
    if (roles !== undefined) {
      if (roles.indexOf('ADMIN') !== -1 || roles.indexOf('CLI') !== -1 || roles.indexOf('PRO') !== -1
        || roles.indexOf('JSER') !== -1 || roles.indexOf('SER') !== -1) {
        return true;
      }
    }
    else {
      // Si no tiene el permiso para estar en dicha pagina retorna mensaje de error
      swal('Acceso Denegado', `${this.authService.usuario.nombre}, no tienes permiso para acceder a este recurso`, 'warning');
      this.router.navigate(['/panel-principal']);
      return false;
    }



  }

}
