import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-procesar-token',
  templateUrl: './procesar-token.component.html',
  styleUrls: ['./procesar-token.component.css']
})
export class ProcesarTokenComponent implements OnInit {

  token: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.revisarToken();
  }


  // Se carga el token a traves de la ruta
  revisarToken(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.token = params['id'];
        console.log(this.token);
      });
  }

}
