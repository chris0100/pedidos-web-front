export class Usuario {
  id: number;
  username: string;
  nit: string;
  password: string;
  nombre: string;
  id_sucursal: string;
  descripcion_punto_envio: string;
  descripcion_sucursal: string;
  cliente: string;
  email: string;
  primer_login: boolean;
  id_punto_envio: string;
  roles: string[] = [];
  rolesPrincipal: string[] = [];   // Se usa para pasar correctamente los roles al crearlos
}
