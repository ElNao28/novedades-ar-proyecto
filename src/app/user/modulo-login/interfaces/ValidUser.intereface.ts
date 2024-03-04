export interface ValidUser {
  email: string;
  password: number;
}
export interface ResponseLogin{
  status:number;
  message:string;
  token:string;
}
export interface PasswordSend{
  password:string;
}
