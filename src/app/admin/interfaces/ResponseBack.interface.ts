export interface ResponseBack{
  message: string;
  status: number;
}
export interface ResponseBackLogin{
  message: string;
  status: number;
  data:{
    id:string;
    nombre:string;
  }
}
