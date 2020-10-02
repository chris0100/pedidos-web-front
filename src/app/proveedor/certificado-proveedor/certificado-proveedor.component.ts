import {Component, OnInit} from '@angular/core';
import {ProveedorService} from '../proveedor.service';
import {AuthService} from '../../login/auth.service';
import {CertificadoRetencionIVA} from '../certificado-retencion-iva';
import html2canvas from 'html2canvas';
import swal from 'sweetalert2';


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
  consultadoIva: boolean; // se habilita para mostrar el contenido del pdf IVA
  after: boolean; // oculta lo que se muestra al inicio con inputs de consulta

  // PCC
  tituloCertificado: string;
  ciudadConsignoParam: string;
  ciudadPraticoParam: string;
  consultadoRetencion: boolean;  // Se habilita para mostrar el contenido de retencion pdf


  constructor(private proveedorService: ProveedorService, public authService: AuthService) {
  }

  ngOnInit() {
    this.tipoCertificado = 'PCI';
    this.anioGrabable = 2020;
    this.listaCertificadoRetencionIva = [];
    this.certificadoController = new CertificadoRetencionIVA();
    this.mesInicio = '';
    this.mesFin = '';
    this.consultadoIva = false;
    this.after = true;

    // PCC
    this.tituloCertificado = '';
    this.ciudadConsignoParam = '';
    this.ciudadPraticoParam = '';
    this.consultadoRetencion = false;
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
        console.log(this.rowIdTercero + ' este es el rowIdTercero');

        // Se transforman tipos de datos y se suma 1 al fin
        const fin = parseInt(this.mesInicio, 0) + 1;
        this.mesFin = fin + '';

        // Evalua si la seleccion fue PCI(CERTIFICADO RETENCION POR IVA)
        if (this.tipoCertificado === 'PCI') {

          // tslint:disable-next-line:max-line-length
          this.proveedorService.crearPDFIva(this.mesInicio, this.mesFin, this.anioGrabable.toString(),
             this.rowIdTercero).subscribe(
            obj2 => {
              console.log(obj2);
              this.listaCertificadoRetencionIva = obj2;
              this.certificadoController = this.listaCertificadoRetencionIva[0];
              this.consultadoIva = true;
              this.after = false;
            },
            error => {
              if (error.status === 500) {
                swal('Error', 'No se han encontrado datos en la consulta', 'error');
                return;
              }
            });
        }

        // PCC
        else if (this.tipoCertificado === 'PCC') {
          this.tituloCertificado = 'CERTIFICADO DE RENTENCIÓN EN LA FUENTE';
          this.ciudadConsignoParam = 'Cali';
          this.ciudadPraticoParam = 'Cali';

          // Crear pdf retencion
          this.proveedorService.crearPDFRetencion(this.anioGrabable.toString(),
            this.rowIdTercero, this.ciudadConsignoParam, this.ciudadPraticoParam, this.tipoCertificado).subscribe(
              obj3 => {
                console.log(obj3);
                this.listaCertificadoRetencionIva = obj3;
                this.certificadoController = this.listaCertificadoRetencionIva[0];
                this.after = false;
                this.consultadoRetencion = true;
              },
            error => {
              if (error.status === 500) {
                swal('Error', 'No se han encontrado datos en la consulta', 'error');
                return;
              }
            });
        }

        // PPI
        else if (this.tipoCertificado === 'PIC') {
          this.tituloCertificado = 'CERTIFICADO DE RENTENCIÓN EN LA FUENTE - CALI';
          this.ciudadConsignoParam = 'Cali';
          this.ciudadPraticoParam = 'Cali';

          // Crear pdf retencion
          this.proveedorService.crearPDFRetencion(this.anioGrabable.toString(),
            this.rowIdTercero, this.ciudadConsignoParam, this.ciudadPraticoParam, this.tipoCertificado).subscribe(
            obj3 => {
              console.log(obj3);
              this.listaCertificadoRetencionIva = obj3;
              this.certificadoController = this.listaCertificadoRetencionIva[0];
              this.after = false;
              this.consultadoRetencion = true;
            },
            error => {
              if (error.status === 500) {
                swal('Error', 'No se han encontrado datos en la consulta', 'error');
                return;
              }
            });
        }

        // PIY
        else if (this.tipoCertificado === 'PIY') {
          this.tituloCertificado = 'CERTIFICADO DE RENTENCIÓN EN LA FUENTE - YUMBO';
          this.ciudadConsignoParam = 'Yumbo';
          this.ciudadPraticoParam = 'Yumbo';

          // Crear pdf retencion
          this.proveedorService.crearPDFRetencion(this.anioGrabable.toString(),
            this.rowIdTercero, this.ciudadConsignoParam, this.ciudadPraticoParam, this.tipoCertificado).subscribe(
            obj3 => {
              console.log(obj3);
              this.listaCertificadoRetencionIva = obj3;
              this.certificadoController = this.listaCertificadoRetencionIva[0];
              this.after = false;
              this.consultadoRetencion = true;
            },
            error => {
              if (error.status === 500) {
                swal('Error', 'No se han encontrado datos en la consulta', 'error');
                return;
              }
            });
        }
      });
  }




  onOperacionRegreso(regresar: boolean): void {
    this.after = true;
    this.consultadoIva = false;
    this.consultadoRetencion = false;
  }


}
