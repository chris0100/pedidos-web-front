import { NgModule } from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PanelClientesComponent} from './panel-clientes/panel-clientes.component';
import {ConfiguracionComponent} from './usuario/configuracion/configuracion.component';
import {ListaUsuariosComponent} from './usuario/lista-usuarios/lista-usuarios.component';
import {CrearUsuarioComponent} from './usuario/crear-usuario/crear-usuario.component';
import {CrearPedidoComponent} from './pedidos/crear-pedido/crear-pedido.component';
import {PedidosBorradorComponent} from './pedidos/pedidos-borrador/pedidos-borrador.component';
import {HistorialPedidosComponent} from './pedidos/historial-pedidos/historial-pedidos.component';
import {PedidosVerificacionComponent} from './pedidos/pedidos-verificacion/pedidos-verificacion.component';
import {RoleGuard} from './login/guards/role.guard';
import {AuthGuard} from './login/guards/auth.guard';
import {DetalleHistorialPedidosComponent} from './pedidos/historial-pedidos/detalle-historial-pedidos/detalle-historial-pedidos.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'panel-clientes', component: PanelClientesComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'proveedor'}},
  {path: 'configuracion', component: ConfiguracionComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'proveedor'}},
  {path: 'lista-usuarios', component: ListaUsuariosComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'proveedor'}},
  {path: 'crear-usuario', component: CrearUsuarioComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'proveedor'}},
  {path: 'editar-usuario/:id', component: CrearUsuarioComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'proveedor'}},
  {path: 'crear-pedido', component: CrearPedidoComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'proveedor'}},
  {path: 'pedidos-borrador', component: PedidosBorradorComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'proveedor'}},
  {path: 'historial-pedidos', component: HistorialPedidosComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'proveedor'}},
  {path: 'detalle-historial-pedido/:id', component: DetalleHistorialPedidosComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'proveedor'}},
  {path: 'pedidos-verificacion',  component: PedidosVerificacionComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'proveedor'}}
];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      routes
    )
  ],
  exports: [RouterModule]
})


export class AppRoutingModule { }
