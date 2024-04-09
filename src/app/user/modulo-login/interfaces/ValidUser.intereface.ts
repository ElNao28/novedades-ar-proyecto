export interface ValidUser {
  email: string;
  password: number;
  ip: string;
  fecha:string;
}
export interface ResponseLogin{
  status:number;
  message:string;
  token:string;
}
export interface PasswordSend{
  password:string;
}
