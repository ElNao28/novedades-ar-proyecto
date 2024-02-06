export interface DataForm{
  label:string;
  formControlName:string;
  type:string;
  typeSelect?:{
    option:string
  }[];

}
