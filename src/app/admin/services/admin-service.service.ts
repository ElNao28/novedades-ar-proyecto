import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductCategory } from '../interfaces/ProductCategory.interface';
import { ResponseCreateUser } from '../../user/modulo-login/interfaces/SendUser.interface';
import { GetUsers } from '../interfaces/GetUsers.interface';
import { ListProducts } from '../interfaces/GetProducts.interface';
import { ResponseBack, ResponseBackLogin } from '../interfaces/ResponseBack.interface';
import { Promociones } from '../interfaces/GetPromociones.interface';
import { DetallesVenta, VentasFenvio } from '../interfaces/GetVentasFenvio.interface';
import { VentasPendientes } from '../interfaces/GetVentasPendientes.interface';
import { ResponseBackData } from '../interfaces/DataSet.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  //private urlApi:string = 'http://localhost:3000/';
  private urlApi:string = 'https://back-novedadesar-production.up.railway.app/';

  addProduct(newProduct:any){
    return this.http.post<ResponseCreateUser>(`${this.urlApi}products`,newProduct)
  }

  getProductByCategory(type:string){
    return this.http.get<ProductCategory[]>(`${this.urlApi}products/category/`+type)
  }
  getAllUsers(){
    return this.http.get<GetUsers[]>(`${this.urlApi}users`)
  }
  getAllProducts(){
    return this.http.get<ListProducts[]>(`${this.urlApi}products/all-products-admin`)
  }
  changeStatus(id:number,action:boolean){
    return this.http.patch<ResponseBack>(`${this.urlApi}products/change-status`,{id:id,action:action})
  }
  updateProduct(id:number,dataUp:any){
    return this.http.patch<ResponseBack>(`${this.urlApi}products/update-product/`+id,dataUp)
  }
  getAllProductsByDes(){
    return this.http.get<Promociones>(`${this.urlApi}products/get-promociones`)
  }
  getVentasFenvio(type:string){
    return this.http.get<VentasFenvio>(`${this.urlApi}ventas/ventas-status/`+type)
  }
  getVentasPendientes(type:string){
    return this.http.get<VentasPendientes>(`${this.urlApi}ventas/ventas-status/`+type)
  }
  addCodeRastreo(id:number,code:number){
    return this.http.post<ResponseBack>(`${this.urlApi}ventas/add-code-rastreo/`+id,{code:code})
  }
  ventaComplete(idEnvio:number,fecha:string,idVenta:number){
    return this.http.post<ResponseBack>(`${this.urlApi}ventas/venta-complete/`,{idEnvio,fecha,idVenta})
  }
  loginAdmin(data:{email:string,password:string}){
    return this.http.post<ResponseBackLogin>(`${this.urlApi}admin/login`,data)
  }
  getUsers(){
    return this.http.get<{idUsers:number[]}>(`https://m3-proyect.onrender.com/predict`)
  }
  getUserData(ids:number[]){
    return this.http.post<ResponseBackData>(`${this.urlApi}users/dataSet`,{ids})
  }
  sendEmails(ids:number[]){
    return this.http.post<ResponseBack>(`${this.urlApi}email/promociones`,{ids})
  }
}
