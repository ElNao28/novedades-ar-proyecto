export interface RecoverPassword{
  mensaje: string;
  status:number;
}

export interface RecoverPasswordByQuestion{
  response: string;
  status:number;
}

export interface SendAnser{
  email:string,
  anwer:string
}
