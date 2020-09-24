import {Component, Input, OnInit} from '@angular/core';
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

  constructor() { }

  ngOnInit() {
  }

}
