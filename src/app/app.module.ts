import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';


import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { PanelClientesComponent } from './panel-clientes/panel-clientes.component';
import { LoginClientesComponent } from './login/login-clientes/login-clientes.component';
import { LoginProveedoresComponent } from './login/login-proveedores/login-proveedores.component';
import { HeaderComponent } from './header/header.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import {CrearPedidoComponent} from './crear-pedido/crear-pedido.component';
import { CodigoEkaComponent } from './crear-pedido/codigo-eka/codigo-eka.component';
import { TuCodigoComponent } from './crear-pedido/tu-codigo/tu-codigo.component';
import { HojaCalculoComponent } from './crear-pedido/hoja-calculo/hoja-calculo.component';
import { PedidosBorradorComponent } from './pedidos-borrador/pedidos-borrador.component';
import { HistorialPedidosComponent } from './historial-pedidos/historial-pedidos.component';
import { PedidosVerificacionComponent } from './pedidos-verificacion/pedidos-verificacion.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './login/interceptors/token.interceptor';
import {AuthInterceptor} from './login/interceptors/auth.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';
import {MatMomentDateModule} from '@angular/material-moment-adapter';






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
    PedidosVerificacionComponent
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
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
