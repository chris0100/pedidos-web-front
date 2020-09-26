import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuariosService} from '../../../usuario/usuarios.service';
import swal from 'sweetalert2';
import {Usuario} from '../../../usuario/usuario';

@Component({
  selector: 'app-procesar-token',
  templateUrl: './procesar-token.component.html',
  styleUrls: ['./procesar-token.component.css']
})
export class ProcesarTokenComponent implements OnInit {

  usuario: Usuario;
  password: string;
  repetirPassword: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.recibeToken();
    this.usuario = new Usuario();
    this.password = '';
    this.repetirPassword = '';
  }


  // Se carga el token a traves de la ruta
  recibeToken(): void {
    this.activatedRoute.params.subscribe(
      params => {
        const elToken = params['id'];
        this.procesarToken(elToken);
      });
  }


  // Se revisa el token, en la bd
  procesarToken(token: string): void {
    // Se envia el token para verificar la validez
    this.usuariosService.procesarTokenJava(token).subscribe(
      obj => {
        const respuesta = obj[0];
        // Si la respuesta contiene esas palabras significa que no se puede cambiar, porque esta vencido
        if (respuesta.includes('no se')) {
          swal('Error', 'El token se encuentra vencido, por favor intenta nuevamente', 'error');
          this.router.navigate(['/reestablecer-password']);
        }
        // Si la respuesta no co es porque no existe ese token
        else if (respuesta.includes('no co')) {
          swal('Error', 'El token no se encuentra, por favor intenta nuevamente', 'error');
          this.router.navigate(['/reestablecer-password']);
        }
        // Sino el token es correcto
        else {
          console.log('todo bien');
        }
      }
    );
  }


  // Se da clic en procesar token
  guardarPassword(): void {
    console.log('el password a guardar es: ' + this.password);
  }

}
