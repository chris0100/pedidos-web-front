import {Component, OnInit} from '@angular/core';
import {ProveedorService} from '../proveedor.service';
import {AuthService} from '../../login/auth.service';
import {CertificadoRetencionIVA} from '../certificado-retencion-iva';

@Component({
  selector: 'app-certificado-proveedor',
  templateUrl: './certificado-proveedor.component.html'
})


export class CertificadoProveedorComponent implements OnInit {

  rowIdTercero: number;
  tipoCertificado: string;
  anioGrabable: number;
  mesInicio: string;
  mesFin: string;
  listaCertificadoRetencionIva: CertificadoRetencionIVA[];
  certificadoController: CertificadoRetencionIVA;
  consultado: boolean;


  constructor(private proveedorService: ProveedorService, private authService: AuthService) {
  }

  ngOnInit() {
    this.tipoCertificado = 'PCI';
    this.anioGrabable = 2020;
    this.listaCertificadoRetencionIva = [];
    this.certificadoController = new CertificadoRetencionIVA();
    this.mesInicio = '';
    this.mesFin = '';
    this.consultado = false;
  }


  // Se da clic en generar PDF.
  generarPDF(): void {
    console.log('se ha dado clic en el boton generar');
    console.log(this.authService.usuario.nit);
    console.log(this.tipoCertificado);
    console.log(this.mesInicio);
    console.log(this.anioGrabable);

    // Se obtiene el row id tercero
    this.proveedorService.obtenerRowIdTercero(this.authService.usuario.nit).subscribe(
      obj => {
        this.rowIdTercero = parseInt(obj[0], 0);
        console.log(this.rowIdTercero);

        // Evalua si la seleccion fue PCI
        if (this.tipoCertificado === 'PCI') {

          // Se transforman tipos de datos y se suma 1 al fin
          const fin = parseInt(this.mesInicio, 0) + 1;
          this.mesFin = fin + '';

          // tslint:disable-next-line:max-line-length
          this.proveedorService.crearPDFIva(this.mesInicio, this.mesFin, this.anioGrabable.toString(),
            this.authService.usuario.nit, this.rowIdTercero).subscribe(
            obj2 => {
              console.log(obj2);
              this.listaCertificadoRetencionIva = obj2;
              console.log(this.listaCertificadoRetencionIva);
              this.certificadoController = this.listaCertificadoRetencionIva[0];
              this.consultado = true;
            });
        }
      });
  }


}
