import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';


import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { PanelClientesComponent } from './panel-clientes/panel-clientes.component';
import { LoginClientesComponent } from './login/login-clientes/login-clientes.component';
import { LoginProveedoresComponent } from './login/login-proveedores/login-proveedores.component';
import { HeaderComponent } from './header/header.component';
import { ConfiguracionComponent } from './usuario/configuracion/configuracion.component';
import { ListaUsuariosComponent } from './usuario/lista-usuarios/lista-usuarios.component';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';
import {CrearPedidoComponent} from './pedidos/crear-pedido/crear-pedido.component';
import { CodigoEkaComponent } from './pedidos/crear-pedido/codigo-eka/codigo-eka.component';
import { TuCodigoComponent } from './pedidos/crear-pedido/tu-codigo/tu-codigo.component';
import { HojaCalculoComponent } from './pedidos/crear-pedido/hoja-calculo/hoja-calculo.component';
import { PedidosBorradorComponent } from './pedidos/pedidos-borrador/pedidos-borrador.component';
import { HistorialPedidosComponent } from './pedidos/historial-pedidos/historial-pedidos.component';
import { PedidosVerificacionComponent } from './pedidos/pedidos-verificacion/pedidos-verificacion.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './login/interceptors/token.interceptor';
import {AuthInterceptor} from './login/interceptors/auth.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import localeES from '@angular/common/locales/es';
import { DetalleHistorialPedidosComponent } from './pedidos/historial-pedidos/detalle-historial-pedidos/detalle-historial-pedidos.component';
import { DetallePedidosVerificacionComponent } from './pedidos/pedidos-verificacion/detalle-pedidos-verificacion/detalle-pedidos-verificacion.component';
import { DetallePedidosBorradorComponent } from './pedidos/pedidos-borrador/detalle-pedidos-borrador/detalle-pedidos-borrador.component';
import { ValidacionItemsComponent } from './usuario/validacion-items/validacion-items.component';
import { ListaErroresComponent } from './admin/lista-errores/lista-errores.component';
import { ListaErroresCompletoComponent } from './admin/lista-errores-completo/lista-errores-completo.component';
import { PrepareVerErrorComponent } from './admin/prepare-ver-error/prepare-ver-error.component';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { EditarItemComponent } from './admin/editar-item/editar-item.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { CertificadoProveedorComponent } from './proveedor/certificado-proveedor/certificado-proveedor.component';
import { PdfIvaComponent } from './proveedor/pdf-iva/pdf-iva.component';
import { PdfRetencionComponent } from './proveedor/pdf-retencion/pdf-retencion.component';
import { ReestablecerPasswordComponent } from './login/reestablecer-password/reestablecer-password.component';
import { ReestablecerClientesComponent } from './login/reestablecer-password/reestablecer-clientes/reestablecer-clientes.component';
import { ReestablecerProveedoresComponent } from './login/reestablecer-password/reestablecer-proveedores/reestablecer-proveedores.component';
import { ProcesarTokenComponent } from './login/reestablecer-password/procesar-token/procesar-token.component';



registerLocaleData(localeES, 'es');




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PanelClientesComponent,
    LoginClientesComponent,
    LoginProveedoresComponent,
    HeaderComponent,
    ConfiguracionComponent,
    ListaUsuariosComponent,
    CrearUsuarioComponent,
    CrearPedidoComponent,
    CodigoEkaComponent,
    TuCodigoComponent,
    HojaCalculoComponent,
    PedidosBorradorComponent,
    HistorialPedidosComponent,
    PedidosVerificacionComponent,
    DetalleHistorialPedidosComponent,
    DetallePedidosVerificacionComponent,
    DetallePedidosBorradorComponent,
    ValidacionItemsComponent,
    ListaErroresComponent,
    ListaErroresCompletoComponent,
    PrepareVerErrorComponent,
    LoadingSpinnerComponent,
    EditarItemComponent,
    LoginAdminComponent,
    CertificadoProveedorComponent,
    PdfIvaComponent,
    PdfRetencionComponent,
    ReestablecerPasswordComponent,
    ReestablecerClientesComponent,
    ReestablecerProveedoresComponent,
    ProcesarTokenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es' },
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
