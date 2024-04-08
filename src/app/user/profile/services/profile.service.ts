import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespCopomex, RespCuenta, RespEnvio, RespPersonal, RespProfile, RespSeguridad, RespUpdate, UpdatCuenta, UpdatPersonal, UpdatSeguridad, UpdatUbicacion } from '../interfaces/ResProfile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }

  getProfile(id:string) {
    return this.http.get<RespProfile>('http://localhost:3000/users/profile/'+id);
  }
  getDataPersonal(idUser:string){
    return this.http.get<RespPersonal>('http://localhost:3000/users/profile/personal/'+idUser);
  }
  updateUserPersonal(idUser:string,data:UpdatPersonal){
    return this.http.patch<RespUpdate>('http://localhost:3000/users/profile/update-user/'+idUser,data)
  }
  getDataCuenta(idUser:string){
    return this.http.get<RespCuenta>('http://localhost:3000/users/profile/cuenta/'+idUser);
  }
  updateUserCuenta(idUser:string,data:UpdatCuenta){
    return this.http.patch<RespUpdate>('http://localhost:3000/users/profile/update-user/'+idUser,data)
  }
  getDataSeguridad(idUser:string){
    return this.http.get<RespSeguridad>('http://localhost:3000/users/profile/seguridad/'+idUser);
  }
  updateUserSeguridad(idUser:string,data:UpdatSeguridad){
    return this.http.patch<RespUpdate>('http://localhost:3000/users/profile/update-user/'+idUser,data)
  }
  updateUserPassword(idUser:string,data:{password:string}){
    return this.http.patch<RespUpdate>('http://localhost:3000/users/profile/update-user/'+idUser,data)
  }
  getDataUbicacion(id:string){
    return this.http.get<RespEnvio>('http://localhost:3000/users/profile/ubicacion/'+id)
  }
  getDataCopomex(cp:number){
    return this.http.get<RespCopomex>('https://api.copomex.com/query/info_cp/'+cp+'?type=simplified&token=pruebas')
  }
  updateUserUbicacion(idUser:string,data:UpdatUbicacion){
    return this.http.patch<RespUpdate>('http://localhost:3000/users/ubicacion/'+idUser,data)
  }
}
