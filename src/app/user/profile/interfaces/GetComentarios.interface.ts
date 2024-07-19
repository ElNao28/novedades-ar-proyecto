export interface GetComentarios {
  message: string;
  status:  number;
  data:    ComentarioS[];
}

export interface ComentarioS {
  producto:     string;
  precio:       number;
  cantidad:     number;
  calificacion: number;
  comentario:   Comentario;
  imagen_url:string;
}

export interface Comentario {
  id:         number;
  comentario: string;
  fecha:      Date;
}
