export class Usuario {
  id: number;
  username: string;
  nit: string;
  password: string;
  nombre: string;
  id_sucursal: string;
  idSucursal: string;
  descripcion_punto_envio: string;
  descripcionPuntoEnvio: string;
  descripcion_sucursal: string;
  descripcionSucursal: string;
  cliente: string;
  email: string;
  primerLogin: boolean;
  id_punto_envio: string;
  idPuntoEnvio: string;
  roles: string[] = [];
  rolesPrincipal: string[] = [];   // Se usa para pasar correctamente los roles al crearlos
}
