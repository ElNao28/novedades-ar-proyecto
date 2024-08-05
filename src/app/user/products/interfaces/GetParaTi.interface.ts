export interface GetParaTI {
  message: string;
  status:  number;
  data:    ProductsParaTi[];
}

export interface ProductsParaTi {
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
  imagen:          Imagen[];
}

export interface Imagen {
  id:         number;
  url_imagen: string;
}
