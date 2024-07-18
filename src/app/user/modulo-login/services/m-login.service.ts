import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PasswordSend, ResponseLogin, ValidUser } from '../interfaces/ValidUser.intereface';
import { Observable } from 'rxjs';
import { CheckEmail, Email, ResponseCreateUser, ResponseEmail, User } from '../interfaces/SendUser.interface';
import { ColoniaData, CpData, EstadoData, MunicipioData } from '../interfaces/ApiCopo.interface';
import { RecoverPassword, RecoverPasswordByQuestion, SendAnser } from '../interfaces/RecoverPassword.interface';

@Injectable({
  providedIn: 'root'
})
export class MLoginService {
  constructor(private http:HttpClient) { }

  tokenApiCopomex:string = "pruebas";//pruebas 313f4530-9ec9-43d8-89c8-a55d9b43ca76
  private urlApi:string = 'http://localhost:3000';
  //https://back-novedadesar-production.up.railway.app
  validUser(data:ValidUser){
    return this.http.post<ResponseLogin>(this.urlApi+'/login', data);
  }
  createUser(user:User){
    return this.http.post<ResponseCreateUser>(this.urlApi+'/users', user);
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
    return this.http.get<User>(this.urlApi+'/users/'+email);
  }
  verifEmail(email:CheckEmail){
    return this.http.post<RecoverPassword>(this.urlApi+'/check-email',email);
  }
  sendCodePassword(email:Email){
    return this.http.post<ResponseEmail>(this.urlApi+'/email',email) ;
   }
   updatePassword(email:string, password:PasswordSend){
    return this.http.patch<ResponseCreateUser>(this.urlApi+'/users/password/'+email,password)
  }

  checkLogin():boolean{
    if ( !localStorage.getItem('token') ) return true;
    const token = localStorage.getItem('token');
    return false
  }

  getQuestion(email:string){
    return this.http.get<RecoverPasswordByQuestion>(this.urlApi+'/recover-password/'+email)
  }

  patito(sendData:SendAnser){
    return this.http.post<RecoverPasswordByQuestion>(this.urlApi+'/recover-password/answer',sendData)
  }
  getIp(){
    return this.http.get<{ip:string}>("https://api.ipify.org/?format=json")
  }
}
