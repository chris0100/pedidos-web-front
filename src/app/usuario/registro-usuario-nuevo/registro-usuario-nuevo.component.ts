import { Component, OnInit } from '@angular/core';
import {Usuario} from '../usuario';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../data.service';
import swal from 'sweetalert2';
import {UsuariosService} from '../usuarios.service';

@Component({
  selector: 'app-registro-usuario-nuevo',
  templateUrl: './registro-usuario-nuevo.component.html'
})


export class RegistroUsuarioNuevoComponent implements OnInit {

  usuario: Usuario;
  showSpinner: boolean;
  repetirPassword: string;
  condicionesRestricciones: boolean;

  constructor(private data: DataService, private usuariosService: UsuariosService,
              private router: Router) {
  }


  ngOnInit() {
    this.condicionesRestricciones = false;

    // Revisa si el data storage de servicio tiene datos
    if (this.data.storage === undefined) {
      console.log('toma del session storage');
      this.usuario = JSON.parse(sessionStorage.getItem('usuarioTemp'));
    }

    // sino encuentra los datos previamente cargados, va al session storage.
    else {
      console.log('guarda en el session storage');
      this.usuario = this.data.storage;
      this.usuario.password = '';
      sessionStorage.setItem('usuarioTemp', JSON.stringify(this.usuario));
    }

    this.showSpinner = false;
    this.repetirPassword = '';
  }



  enviarDatos(): void {
   console.log('se ha dado clic en enviar datos');

   // Si existe un valor incorrecto, genera error
   if (this.usuario.nombre.trim().length === 0 || this.usuario.email.trim().length === 0 ||
   this.usuario.password.trim().length === 0 || this.repetirPassword.trim().length === 0
     && (this.usuario.password !== this.repetirPassword)) {
     swal('Error', 'Por favor comprueba los datos ingresados', 'error');
     return;
   }
   else {
     this.usuariosService.crearUsuarioJava(this.usuario).subscribe(
       obj => {
         console.log(obj);
         // Aqui me redirecciona a la pagina de login
         swal('Correcto', 'Proceso de registro correcto, ingresa para continuar', 'success');
         this.router.navigate(['/login']);
       });

   }


  }
}
