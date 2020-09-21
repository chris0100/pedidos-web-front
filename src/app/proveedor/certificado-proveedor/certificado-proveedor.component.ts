import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-certificado-proveedor',
  templateUrl: './certificado-proveedor.component.html'
})


export class CertificadoProveedorComponent implements OnInit {

  tipoCertificado: string[];
  periodo: string[];

  constructor() { }

  ngOnInit() {
      this.cargarDatosTipoCertificado();
      this.cargarDatosPeriodo();
  }



  // Se da clic en generar PDF.
  generarPDF(): void {
    console.log('se ha dado clic en el boton generar');
  }


  // Arreglo de tipo certificado
  cargarDatosTipoCertificado(): void {
    this.tipoCertificado = [];
    this.tipoCertificado.push('CERTIFICADO DE RETENCIÓN POR IVA');
    this.tipoCertificado.push('CERTIFICADO DE RETENCIÓN EN LA FUENTE');
    this.tipoCertificado.push('CERTIFICADO DE RETENCIÓN EN LA FUENTE POR ICA - CALI');
    this.tipoCertificado.push('CERTIFICADO DE RETENCIÓN EN LA FUENTE POR ICA - YUMBO');
  }

  // Arreglo de periodo
  cargarDatosPeriodo(): void {
    this.periodo = [];
    this.periodo.push('BIMESTRE ENERO - FEBRERO');
    this.periodo.push('BIMESTRE MARZO - ABRIL');
    this.periodo.push('BIMESTRE MAYO - JUNIO');
    this.periodo.push('BIMESTRE JULIO - AGOSTO');
    this.periodo.push('BIMESTRE SEPTIEMBRE - OCTUBRE');
    this.periodo.push('BIMESTRE NOVIEMBRE - DICIEMBRE');
  }

}
