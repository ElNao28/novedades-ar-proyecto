export interface RatingResponse {
  status:  number;
  message: string;
  data:    Data;
}

export interface Data {
  cantidadExp:    number[];
  cantidadDetall: number[];
  cantidadOpt:    number[];
}
