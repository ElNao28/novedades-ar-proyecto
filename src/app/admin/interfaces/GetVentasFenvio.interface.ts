export interface VentasFenvio {
  message: string;
  status:  number;
  data:    VentasFenvi[];
}

export interface VentasFenvi {
  id:            number;
  total_venta:   number;
  fecha_venta:   Date | null;
  estado:        string;
  detallesVenta: DetallesVenta[];
  envio:         null;
  usuario:       Usuario;
}

export interface DetallesVenta {
  id:        number;
  cantidad:  number;
  descuento: number;
  precio:    number;
  producto:  Producto;
}

export interface Producto {
  id:              number;
  nombre_producto: string;
  precio:          number;
  descripccion:    string;
  stock:           number;
  categoria:       Categoria;
  rating:          number;
  descuento:       number;
  status:          string;
  tipo:            string;
}

export enum Categoria {
  H = "H",
  M = "M",
}
export interface Usuario{
  id:             number;
  name:         string;
  lastname: string;
  motherLastname: string;
  gender:         string;
  birthdate:      Date;
  email: string;
  cellphone:      string;
  ubicacion: Ubicacion;
}
export interface Ubicacion{
  id:             number;
  cp:             number;
  colonia:        string;
  referencia:     string;
  estado: string;
  municipio: string;
}
