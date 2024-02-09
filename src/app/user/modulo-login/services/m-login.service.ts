import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PasswordSend, ResponseLogin, ValidUser } from '../interfaces/ValidUser.intereface';
import { Observable } from 'rxjs';
import { Email, ResponseEmail, User } from '../interfaces/SendUser.interface';
import { ColoniaData, CpData, EstadoData, MunicipioData } from '../interfaces/ApiCopo.interface';

@Injectable({
  providedIn: 'root'
})
export class MLoginService {

  //Se inyecta el modulo de HttpCliente que sirve para hacer las peticiones POST,GET,PATCH.....
  constructor(private http:HttpClient) { }

  tokenApiCopomex:string = "pruebas";

  //funcion que sirve para enviar los datos del formulario al back y regresa un estatus dependiendo de la respuesta del back
  validUser(data:ValidUser){
    return this.http.post<ResponseLogin>('http://localhost:3000/login', data);
  }
  createUser(user:User):Observable<User>{
    return this.http.post<User>('http://localhost:3000/users', user);
  }
  getEstado(){
    return this.http.get<EstadoData>("https://api.copomex.com/query/get_estados?token="+this.tokenApiCopomex+"")
  }
  getMunicipio(estado:string){
    return this.http.get<MunicipioData>("https://api.copomex.com/query/get_municipio_por_estado/"+estado+"?token="+this.tokenApiCopomex+"")
  }
  getCp(municipio:string){
    return this.http.get<CpData>("https://api.copomex.com/query/get_cp_por_municipio/"+municipio+"?token="+this.tokenApiCopomex+"")
  }
  getColonia(cp:string){
    return this.http.get<ColoniaData>("https://api.copomex.com/query/get_colonia_por_cp/"+cp+"?token="+this.tokenApiCopomex+"")
  }

  getUser(email:string):Observable<User>{
    return this.http.get<User>('http://localhost:3000/users/'+email);
  }
  sendCodePassword(email:Email){
    return this.http.post<ResponseEmail>('http://localhost:3000/email',email) ;
   }
   updatePassword(id:number, password:PasswordSend){
    return this.http.patch('http://localhost:3000/users/'+id,password)
  }

}
