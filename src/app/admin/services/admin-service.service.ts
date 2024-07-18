import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductCategory } from '../interfaces/ProductCategory.interface';
import { ResponseCreateUser } from '../../user/modulo-login/interfaces/SendUser.interface';
import { GetUsers } from '../interfaces/GetUsers.interface';
import { ListProducts } from '../interfaces/GetProducts.interface';
import { ResponseBack } from '../interfaces/ResponseBack.interface';
import { Promociones } from '../interfaces/GetPromociones.interface';
import { VentasFenvio } from '../interfaces/GetVentasFenvio.interface';
import { VentasPendientes } from '../interfaces/GetVentasPendientes.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  private urlApi:string = 'https://back-novedadesar-production.up.railway.app/'

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
}
