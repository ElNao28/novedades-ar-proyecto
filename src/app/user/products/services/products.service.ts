import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../interfaces/products.interface';
import { SendDataCard } from '../interfaces/SendDataCard.interface';
import { CardResponse } from '../interfaces/ProductsCard.interface';
import { CompraProducto, urlPago } from '../interfaces/CompraProduct.iinterface';
import { ResponseAddCard } from '../interfaces/ResponseCard.interface';
import { Domicilio } from '../interfaces/Domicilio.interface';
import { DataInicio } from '../interfaces/DataInicio.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
  private urlApi:string = 'http://localhost:3000/'; //'https://back-novedadesar-production.up.railway.app/';

  getProducts() {
    return this.http.get<Products[]>(`${this.urlApi}products`);
  }
  getProductsNovedades() {
    return this.http.get<DataInicio>(`${this.urlApi}products/data-inicio`);
  }
  getProductById(id:string) {
    return this.http.get<Products>(`${this.urlApi}products/`+id);
  }
  searchAutocomplete(query:string){
    return this.http.get<Products[]>(`${this.urlApi}products?q=${{query}}`);
  }
  addProductToCard(dataCard:SendDataCard){
    return this.http.post<ResponseAddCard>(`${this.urlApi}carrito/`, dataCard)
  }
  getProductByCard(data:{id:number}){
    return this.http.post<CardResponse>(`${this.urlApi}carrito/get_card`,data)
  }
  comprarProduct(data:CompraProducto[]){
    return this.http.post<urlPago>(`${this.urlApi}products/pago`, data)
  }
  deleteProductByCard(data:{id:number}){
    return this.http.post<ResponseAddCard>(`${this.urlApi}carrito/delete_card`,data)
  }
  changeCantidad(data:{id:number,cantidad:number}){
    return this.http.post<ResponseAddCard>(`${this.urlApi}carrito/update_cantidad`,data)
  }
  getUbicacion(id:string){
    return this.http.get<Domicilio>(`${this.urlApi}users/ubicacion/`+id)
  }
  getProductsByFilter(data:any){
    return this.http.post<Products[]>(`${this.urlApi}products/filter`,data)
  }
  getProductsByGender(gender:string,tipo:string){
    return this.http.get<Products[]>(`${this.urlApi}products/gender/`+gender+'/category/'+tipo)
  }

}
