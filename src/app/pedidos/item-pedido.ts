import {Pedido} from './pedido';

export class ItemPedido {
  codItem: number;
  codCliente: string;
  descripcion: string;
  idExt1Detalle: string;
  idExt2Detalle: string;
  descripcionExt1: string;
  descripcionExt2: string;
  descripcionCompletaItem: string;
  unidadMedida: string;
  precioUnitario: number;
  precioUnitarioUnoee: number;
  notasItem: string;
  idBodega: string;
  idMotivo: string;
  fechaActualizacionPrecioUnoee: string;
  unoeeItem: number;
  unoeePrecios: number;
  unoeePortafolio: number;
  unoeeListasMateriales: number;
  cantidad: number;
}
