import {Usuario} from '../usuario/usuario';
import {ItemPedido} from './item-pedido';

export class Pedido {
  id: number;
  codPedido: string;
  nota: string;
  estado: number;
  fechaPedido: string;
  totalBruto: number;
  descuentos: number;
  impuestos: number;
  total: number;
  sucursalRemisionar: string;
  sucursalFacturar: string;
  terceroVendedor: string;
  contacto: string;
  direccion: string;
  oc: string;
  idUsuario: Usuario;
  terceroAsesor: string;
  estadoWB: number;
  mensajeWB: string;
  puntoEnvio: string;
  listaItemPedido: Array<ItemPedido> = [];
  emailAsesor: string;
}
