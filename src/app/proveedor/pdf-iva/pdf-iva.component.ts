import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CertificadoRetencionIVA} from '../certificado-retencion-iva';


@Component({
  selector: 'app-pdf-iva',
  templateUrl: './pdf-iva.component.html',
  styleUrls: ['./pdf-iva.component.css']
})
export class PdfIvaComponent implements OnInit {

  @Input() listaCertificadoRetencionIva: CertificadoRetencionIVA[];
  @Input() certificadoController: CertificadoRetencionIVA;
  @Input() mesInicio: string;
  @Input() mesFin: string;
  @Input() anioGrabable: number;
  hide: boolean;

  // Variable de salida
  @Output() regresar = new EventEmitter<boolean>();


  constructor() {
  }

  ngOnInit() {
    this.hide = true;
  }


  // Actual forma para realizar la impresion pdf
  printTest(): void {

    // Se ocultan etiquetas para generador del pdf para imprimir.
    this.hide = false;

    // Temporizador para ajustar etiqueta antes de imprimir.(1s)
    setTimeout(() => {
      window.print();
      this.hide = true;
    }, 1000);
  }


  // Ajusta el mes en la plantilla
  ajustarMes(dato: string): string {
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return monthNames[parseInt(dato, 0) - 1];
  }


  // Cuando se da clic en el boton regresar, se emite respuesta para habilitar otros componentes.
  retornar(): void {
    this.regresar.emit(true);
  }








}
