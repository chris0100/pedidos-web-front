import {Component, OnInit} from '@angular/core';
import {Usuario} from '../login/usuario';
import {AuthService} from '../login/auth.service';
import {UsuariosService} from '../login/usuarios.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html'
})


export class ConfiguracionComponent implements OnInit {

  public usuario: Usuario;
  public usuarioModificado: Usuario;
  errores: string[];

  constructor(private authService: AuthService, private usuariosService: UsuariosService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.usuario = this.authService.usuario;
    this.usuarioModificado = new Usuario();
  }


  // Se actualizan los datos del usuario
  update(): void {
    this.usuarioModificado.nombre = this.usuario.nombre;
    this.usuarioModificado.email = this.usuario.email;

    console.log('se actualiza' + this.usuario.nombre + ' : ' + this.usuario.email);
    this.usuariosService.updateUsuarioJava(this.usuarioModificado)
      .subscribe(
        json => {
          this.router.navigate(['/panel-clientes']);
          swal('Usuario Actualizado', `${json.mensaje}: ${json.usuario.nombre}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo de error desde backend' + err.status);
          console.error(err.error.errors);
        }
      );
  }
}
