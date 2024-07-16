export interface VentasPendientes {
  message: string;
  status:  number;
  data:    VentasPendient[];
}

export interface VentasPendient {
  id:            number;
  total_venta:   number;
  fecha_venta:   Date;
  estado:        string;
  detallesVenta: DetallesVenta[];
  envio:         Envio;
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
  categoria:       string;
  rating:          number;
  descuento:       number;
  status:          string;
  tipo:            string;
}

export interface Envio {
  id:            number;
  numero_guia:   number;
  fecha_salida:  Date | null;
  fecha_entrega: null;
}

export interface Usuario {
  id:             number;
  name:           string;
  lastname:       string;
  motherLastname: string;
  gender:         string;
  birthdate:      Date;
  email:          string;
  cellphone:      string;
  password:       string;
  answer:         string;
  ubicacion:      Ubicacion;
}

export interface Ubicacion {
  id:         number;
  estado:     string;
  municipio:  string;
  cp:         number;
  colonia:    string;
  referencia: string;
}
