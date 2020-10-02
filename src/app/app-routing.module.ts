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
import {AyudaComponent} from './ayuda/ayuda.component';



const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'login-admin', component: LoginAdminComponent},
  {path: 'reestablecer-password/:id', component: ReestablecerPasswordComponent},
  {path: 'procesar-token/:id', component: ProcesarTokenComponent},
  {path: 'actualizar-password', component: ActualizarPasswordComponent, canActivate: [RoleGuard, AuthGuard], data: {roles: ['ADMIN', 'CLI', 'JSER', 'PRO', 'SER']}},
  {path: 'registro-usuario-nuevo', component: RegistroUsuarioNuevoComponent},
  {path: 'ayuda', component: AyudaComponent},
  {path: 'panel-principal', component: PanelClientesComponent, canActivate: [RoleGuard, AuthGuard], data: {roles: ['ADMIN', 'CLI', 'JSER', 'PRO', 'SER']}},
  {path: 'configuracion', component: ConfiguracionComponent, canActivate: [RoleGuard, AuthGuard], data: {roles: ['ADMIN', 'CLI', 'JSER', 'PRO', 'SER']}},
  {path: 'lista-usuarios', component: ListaUsuariosComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'ADMIN'}},
  {path: 'crear-usuario', component: CrearUsuarioComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'ADMIN'}},
  {path: 'editar-usuario/:id', component: CrearUsuarioComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'ADMIN'}},
  {path: 'crear-pedido', component: CrearPedidoComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'CLI'}},
  {path: 'editar-pedido/:id', component: CrearPedidoComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'CLI'}},
  {path: 'pedidos-borrador', component: PedidosBorradorComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'CLI'}},
  {path: 'detalle-pedido-borrador/:id', component: DetallePedidosBorradorComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'CLI'}},
  {path: 'historial-pedidos', component: HistorialPedidosComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'CLI'}},
  {path: 'detalle-historial-pedido/:id', component: DetalleHistorialPedidosComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'CLI'}},
  {path: 'pedidos-verificacion',  component: PedidosVerificacionComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'CLI'}},
  {path: 'detalle-pedidos-verificacion/:id', component: DetallePedidosVerificacionComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'CLI'}},
  {path: 'validacion-items', component: ValidacionItemsComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'ADMIN'}},
  {path: 'lista-errores', component: ListaErroresComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'SER'}},
  {path: 'lista-errores-completo', component: ListaErroresCompletoComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'JSER'}},
  {path: 'prepare-ver-error/:id/:otr', component: PrepareVerErrorComponent, canActivate: [RoleGuard, AuthGuard],  data: {roles: ['JSER', 'SER']}},
  {path: 'editar-item/:idPedido/:idItem/:otr', component: EditarItemComponent, canActivate: [RoleGuard, AuthGuard], data: {roles: ['JSER', 'SER']}},
  {path: 'certificados-proveedor', component: CertificadoProveedorComponent, canActivate: [RoleGuard, AuthGuard], data: {role: 'PRO'}}

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
