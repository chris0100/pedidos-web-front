import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CertificadoRetencionIVA} from '../certificado-retencion-iva';

@Component({
  selector: 'app-pdf-retencion',
  templateUrl: './pdf-retencion.component.html',
  styleUrls: ['./pdf-retencion.component.css']
})
export class PdfRetencionComponent implements OnInit {

  @Input() listaCertificadoRetencionIva: CertificadoRetencionIVA[];
  @Input() certificadoController: CertificadoRetencionIVA;
  @Input() mesInicio: string;
  @Input() mesFin: string;
  @Input() anioGrabable: number;
  @Input() tituloCertificado: string;

  hide: boolean;

  // Variable de salida
  @Output() regresar = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  this.hide = true;
  }


  printTest(): void {
    // Se ocultan etiquetas para generador del pdf para imprimir
    this.hide = false;

    // Temporizador para ajustar etiqueta antes de imprimir.(1s)
    setTimeout(() => {
      window.print();
      this.hide = true;
    }, 1000);
  }


  // Cuando se da clic en el boton regresar, se emite respuesta para habilitar otros componentes.
  retornar(): void {
    this.regresar.emit(true);
  }



}
