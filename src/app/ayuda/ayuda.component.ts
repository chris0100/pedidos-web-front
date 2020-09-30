import { Component, OnInit } from '@angular/core';
import {AuthService} from '../login/auth.service';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html'
})


export class AyudaComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
