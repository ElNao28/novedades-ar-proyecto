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
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { GetMision, GetVision, Mision, Vision } from '../interfaces/GetMision.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private socket!: Socket;
  constructor(
    private http: HttpClient,
  ) {}
  //private urlApi:string = 'http://localhost:3000/';
  private urlApi: string = 'https://back-novedadesar-production.up.railway.app/';

  addProduct(newProduct: any) {
    return this.http.post<ResponseCreateUser>(`${this.urlApi}products`, newProduct)
  }

  getProductByCategory(type: string) {
    return this.http.get<ProductCategory[]>(`${this.urlApi}products/category/` + type)
  }
  getAllUsers() {
    return this.http.get<GetUsers[]>(`${this.urlApi}users`)
  }
  getAllProducts() {
    return this.http.get<ListProducts[]>(`${this.urlApi}products/all-products-admin`)
  }
  changeStatus(id: number, action: boolean) {
    return this.http.patch<ResponseBack>(`${this.urlApi}products/change-status`, { id: id, action: action })
  }
  updateProduct(id: number, dataUp: any) {
    return this.http.patch<ResponseBack>(`${this.urlApi}products/update-product/` + id, dataUp)
  }
  getAllProductsByDes() {
    return this.http.get<Promociones>(`${this.urlApi}products/get-promociones`)
  }
  getVentasFenvio(type: string) {
    return this.http.get<VentasFenvio>(`${this.urlApi}ventas/ventas-status/` + type)
  }
  getVentasPendientes(type: string) {
    return this.http.get<VentasPendientes>(`${this.urlApi}ventas/ventas-status/` + type)
  }
  addCodeRastreo(id: number, code: number) {
    return this.http.post<ResponseBack>(`${this.urlApi}ventas/add-code-rastreo/` + id, { code: code })
  }
  ventaComplete(idEnvio: number, fecha: string, idVenta: number) {
    return this.http.post<ResponseBack>(`${this.urlApi}ventas/venta-complete/`, { idEnvio, fecha, idVenta })
  }
  loginAdmin(data: { email: string, password: string }) {
    return this.http.post<ResponseBackLogin>(`${this.urlApi}admin/login`, data)
  }
  updateDescuento(descuento:number,id:number){
    return this.http.patch<ResponseBack>(`${this.urlApi}products/update-descuento`, { id:id,descuento: descuento })
  }
  updateStock(stock:number,id:number){
    return this.http.patch<ResponseBack>(`${this.urlApi}products/update-stock`, { id:id,stock: stock })
  }
  getMision(){
    return this.http.get<GetMision>(`${this.urlApi}about-us/mision`)
  }
  getVision(){
    return this.http.get<GetVision>(`${this.urlApi}about-us/vision`)
  }
  updateMision(mision:Mision){
    return this.http.patch<ResponseBack>(`${this.urlApi}about-us/update-mision`, mision)
  }
  updateVision(vision:Vision){
    return this.http.patch<ResponseBack>(`${this.urlApi}about-us/update-vision`, vision)
  }
  public sendMessage(event: string, message: any): void {
    this.socket.emit(event, message);
  }

  public onMessage(event: string): Observable<any> {
    return new Observable(observer => {
      this.socket.on(event, (data) => observer.next(data));
      return () => this.socket.off(event);
    });
  }







}
