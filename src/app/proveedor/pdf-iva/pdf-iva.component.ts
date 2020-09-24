import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CertificadoRetencionIVA} from '../certificado-retencion-iva';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as html2pdf from 'html2pdf.js';
// @ts-ignore
import printJS from 'print-js';
import * as es6printJS from 'print-js';
import {startTimeRange} from '@angular/core/src/profile/wtf_impl';

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

    // es6printJS('contentToConvert', 'html');
    function print() {
      printJS({
        printable: 'contentToConvert',
        type: 'html',
        targetStyles: ['*']
      });
    }

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




  // ******************************************************************************
  // *****************************************************************************

  // NO SE ESTA UTILIZANDO EN ESTE MOMENTO
  // Prueba de impresion 2
  descargarPDF(): void {
    // Realizar la generacion del pdf
    const data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');

      let pdf: jsPDF;
      pdf = new jsPDF('p', 'mm', 'a4'); // A4 size of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);

      pdf.save('documento.pdf'); // Generated PDF
    });
  }


  // NO SE ESTA UTILIZANDO ACTUALMENTE
  // Prueba de impresion 1
  downloadPDF(): void {
    const options = {
      filename: 'example.pdf',
      image: {type: 'jpeg'},
      html2canvas: {},
      jsPDF: {orientation: 'landscape', unit: 'mm', format: 'a4'}
    };

    const content: Element = document.getElementById('contentToConvert');

    html2pdf()
      .from(content)
      .set(options)
      .save();
  }


}
