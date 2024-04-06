export interface RespProfile{
  status:number;
  name:string;
  email:string;
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
