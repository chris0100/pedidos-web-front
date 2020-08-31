import {Component, OnInit} from '@angular/core';
import {Usuario} from '../login/usuario';
import {AuthService} from '../login/auth.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html'
})


export class ConfiguracionComponent implements OnInit {

  public usuario: Usuario;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.usuario = this.authService.usuario;
  }


  update(): void {
    console.log('se actualiza');
  }

}
