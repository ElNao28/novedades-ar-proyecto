export interface User {
  name:           string;
  lastname:       string;
  motherLastname: string;
  gender:         string;
  birthdate:      string;
  estado:         string;
  municipio:      string;
  cp:             number;
  colonia:        string;
  email:          string;
  cellphone:      number;
  password:       string;
  question:       string;
  answer:         string;
}
 export interface ValidUser {
  email: string;
  password: number;
}

export interface ResponseLogin{
  status:number;
  message:string;
}
