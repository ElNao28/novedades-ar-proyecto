import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespCopomex, RespCuenta, RespEnvio, RespPersonal, RespProfile, RespSeguridad, RespUpdate, ResVentas, UpdatCuenta, UpdatPersonal, UpdatSeguridad, UpdatUbicacion } from '../interfaces/ResProfile.interface';
import { ResponseBack } from '../../../admin/interfaces/ResponseBack.interface';
import { GetComentarios } from '../interfaces/GetComentarios.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }
  //private urlApi:string = 'http://localhost:3000/';
  private urlApi: string = 'https://back-novedadesar-production.up.railway.app/';

  getProfile(id: string) {
    return this.http.get<RespProfile>(`${this.urlApi}users/profile/` + id);
  }
  getDataPersonal(idUser: string) {
    return this.http.get<RespPersonal>(`${this.urlApi}users/profile/personal/` + idUser);
  }
  updateUserPersonal(idUser: string, data: UpdatPersonal) {
    return this.http.patch<RespUpdate>(`${this.urlApi}users/profile/update-user/` + idUser, data)
  }
  getDataCuenta(idUser: string) {
    return this.http.get<RespCuenta>(`${this.urlApi}users/profile/cuenta/` + idUser);
  }
  updateUserCuenta(idUser: string, data: UpdatCuenta) {
    return this.http.patch<RespUpdate>(`${this.urlApi}users/profile/update-user/` + idUser, data)
  }
  getDataSeguridad(idUser: string) {
    return this.http.get<RespSeguridad>(`${this.urlApi}users/profile/seguridad/` + idUser);
  }
  updateUserSeguridad(idUser: string, data: UpdatSeguridad) {
    return this.http.patch<RespUpdate>(`${this.urlApi}users/profile/update-user/` + idUser, data)
  }
  updateUserPassword(idUser: string, data: { password: string }) {
    return this.http.patch<RespUpdate>(`${this.urlApi}users/profile/update-user/` + idUser, data)
  }
  getDataUbicacion(id: string) {
    return this.http.get<RespEnvio>(`${this.urlApi}users/profile/ubicacion/` + id)
  }
  getDataCopomex(cp: number) {
    return this.http.get<RespCopomex>('https://api.copomex.com/query/info_cp/' + cp + '?type=simplified&token=pruebas')
  }
  updateUserUbicacion(idUser: string, data: UpdatUbicacion) {
    return this.http.patch<RespUpdate>(`${this.urlApi}users/ubicacion/` + idUser, data)
  }
  getVentas(idUser: number) {
    return this.http.get<ResVentas>(`${this.urlApi}ventas/` + idUser)
  }
  addRaking(idVenta: number, raking: number, opinion: string) {
    return this.http.post<ResponseBack>(`${this.urlApi}ventas/add-raking/`, { idVenta, raking, opinion })
  }
  getComentarios(id: string) {
    return this.http.get<GetComentarios>(`${this.urlApi}ventas/get-comentarios/${id}`)
  }
  canceledVenta(id:number){
    return this.http.post<ResponseBack>(`${this.urlApi}ventas/canceled`, { id })
  }

  saveTokenToNotification(token:any){
    return this.http.post(`${this.urlApi}push-notifications/save`,token)
  }

  updatePhoto(id:string,base:string){
    return this.http.patch<ResponseBack>(`${this.urlApi}users/update-photo/`,{ url:base,id:+id })
  }
}
