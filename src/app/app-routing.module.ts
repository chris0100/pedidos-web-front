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
import {DetallePedidosVerificacionComponent} from './pedidos/pedidos-verificacion/detalle-pedidos-verificacion/detalle-pedidos-verificacion.component';
import {DetallePedidosBorradorComponent} from './pedidos/pedidos-borrador/detalle-pedidos-borrador/detalle-pedidos-borrador.component';
import {ValidacionItemsComponent} from './usuario/validacion-items/validacion-items.component';
import {ListaErroresComponent} from './admin/lista-errores/lista-errores.component';
import {ListaErroresCompletoComponent} from './admin/lista-errores-completo/lista-errores-completo.component';
import {PrepareVerErrorComponent} from './admin/prepare-ver-error/prepare-ver-error.component';
import {EditarItemComponent} from './admin/editar-item/editar-item.component';
import {LoginAdminComponent} from './admin/login-admin/login-admin.component';
import {CertificadoProveedorComponent} from './proveedor/certificado-proveedor/certificado-proveedor.component';
import {ReestablecerPasswordComponent} from './login/reestablecer-password/reestablecer-password.component';
import {ProcesarTokenComponent} from './login/reestablecer-password/procesar-token/procesar-token.component';
import {ActualizarPasswordComponent} from './login/actualizar-password/actualizar-password.component';
import {RegistroUsuarioNuevoComponent} from './usuario/registro-usuario-nuevo/registro-usuario-nuevo.component';



const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'login-admin', component: LoginAdminComponent},
  {path: 'reestablecer-password', component: ReestablecerPasswordComponent},
  {path: 'procesar-token/:id', component: ProcesarTokenComponent},
  {path: 'actualizar-password', component: ActualizarPasswordComponent},
  {path: 'registro-usuario-nuevo', component: RegistroUsuarioNuevoComponent},
  {path: 'panel-clientes', component: PanelClientesComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'configuracion', component: ConfiguracionComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'lista-usuarios', component: ListaUsuariosComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'crear-usuario', component: CrearUsuarioComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'editar-usuario/:id', component: CrearUsuarioComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'crear-pedido', component: CrearPedidoComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'editar-pedido/:id', component: CrearPedidoComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'pedidos-borrador', component: PedidosBorradorComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'detalle-pedido-borrador/:id', component: DetallePedidosBorradorComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'historial-pedidos', component: HistorialPedidosComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'detalle-historial-pedido/:id', component: DetalleHistorialPedidosComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'pedidos-verificacion',  component: PedidosVerificacionComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'detalle-pedidos-verificacion/:id', component: DetallePedidosVerificacionComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'validacion-items', component: ValidacionItemsComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'lista-errores', component: ListaErroresComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'lista-errores-completo', component: ListaErroresCompletoComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'prepare-ver-error/:id/:otr', component: PrepareVerErrorComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'editar-item/:idPedido/:idItem/:otr', component: EditarItemComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'certificados-proveedor', component: CertificadoProveedorComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'ROLE_ADMIN'}}

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
