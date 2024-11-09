export interface RespProfile{
  status:number;
  name:string;
  email:string;
  url_photo:string;
}
export interface RespPersonal{
  status:number;
  name:string;
  lastname:string;
  motherLastname:string;
  gender:string;
  birthdate:string;
}
export interface RespCuenta{
  status:number;
  email:string;
  cellphone:string;
}
export interface RespSeguridad{
  status:number;
  question:number;
  answer:string;
}
export interface RespEnvio{
  status:number;
  estado:string;
  municipio:string;
  cp:number;
  colonia:string;
  referencia:string;
}
export interface RespUpdate{
  status:number;
  message:string;
}
export interface UpdatPersonal{
  name:string;
  lastname:string;
  motherLastname:string;
  gender:string;
  birthdate:string;
}
export interface UpdatCuenta{
  email:string;
  cellphone:string;
}
export interface UpdatSeguridad{
  question:string;
  answer:string;
}
export interface UpdatUbicacion{
  estado:string
  municipio:string;
  cp:number;
  colonia:string;
  referencia:string;
}
export interface RespCopomex {
  error:         boolean;
  code_error:    number;
  error_message: null;
  response:      Response;
}

export interface Response {
  cp:                string;
  asentamiento:      string[];
  tipo_asentamiento: string;
  municipio:         string;
  estado:            string;
  ciudad:            string;
  pais:              string;
}

export interface ResVentas {
  status:        number;
  detallesVenta: ResVentasDetallesVenta[];
}

export interface ResVentasDetallesVenta {
  id:            number;
  total_venta:   number;
  fecha_venta:   string;
  estado:string;
  detallesVenta: DetallesVentaDetallesVenta[];
  envio:{
    id:number;
    numero_guia:string;
    fecha_salida:string;
    fecha_entrega:string;
  } | null
}

export interface DetallesVentaDetallesVenta {
  id:        number;
  cantidad:  number;
  descuento: number;
  precio:    number;
  calificacion: number;
  sub_total: number;
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
  imagen: {
    id:         number;
    url_imagen: string;
  }[];
}
