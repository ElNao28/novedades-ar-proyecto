export interface EstadoData {
  error: boolean;
  code_error: number;
  error_message: null;
  response: {
    estado: string;
  }
}

export interface MunicipioData {
  error: boolean;
  code_error: number;
  error_message: null;
  response: {
    municipios: string;
  }
}

export interface CpData {
  error: boolean;
  code_error: number;
  error_message: null;
  response: {
    cp: string;
  }
}

export interface ColoniaData {
  error: boolean;
  code_error: number;
  error_message: null;
  response: {
    colonia: string;
  }
}
