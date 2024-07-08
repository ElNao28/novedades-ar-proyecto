export interface ListProducts {
  id:              number;
  nombre_producto: string;
  precio:          number;
  descripccion:    string;
  stock:           number;
  categoria:       Categoria;
  rating:          number;
  descuento:       number;
  status:          Status;
  tipo:            string;
  imagen:          Imagen[];
}

export enum Categoria {
  H = "H",
  M = "M",
}

export interface Imagen {
  id:         number;
  url_imagen: string;
}

export enum Status {
  Activo = "activo",
  Inactivo = "inactivo",
}
