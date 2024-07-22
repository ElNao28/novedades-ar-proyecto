export interface ResponseProduct {
  message: string;
  status:  number;
  data:    Data;
}

export interface Data {
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
  comentarios:     Comentario[];
}

export interface Comentario {
  comentario: string;
  fecha:      Date;
  usuario:    string;
}

export interface Imagen {
  id:         number;
  url_imagen: string;
}
