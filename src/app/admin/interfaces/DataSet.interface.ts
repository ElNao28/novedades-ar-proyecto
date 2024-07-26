export interface ResponseBackData{
  message: string;
  status: number;
  data:Data[];
}
export interface Data{
  id:             number;
  name:           string;
  lastname:       string;
  motherLastname: string;
  gender:         string;
  email:          string;
  cellphone:      string;
}
