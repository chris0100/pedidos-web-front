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
import {MatAutocompleteModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {registerLocaleData} from '@angular/common';
import localeES from '@angular/common/locales/es';
import { DetalleHistorialPedidosComponent } from './pedidos/historial-pedidos/detalle-historial-pedidos/detalle-historial-pedidos.component';
import { DetallePedidosVerificacionComponent } from './pedidos/pedidos-verificacion/detalle-pedidos-verificacion/detalle-pedidos-verificacion.component';
import { DetallePedidosBorradorComponent } from './pedidos/pedidos-borrador/detalle-pedidos-borrador/detalle-pedidos-borrador.component';
import { ValidacionItemsComponent } from './usuario/validacion-items/validacion-items.component';


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
    ValidacionItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSelectModule,
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es' },
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
