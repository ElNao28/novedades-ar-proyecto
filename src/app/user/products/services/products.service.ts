import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../interfaces/products.interface';
import { SendDataCard } from '../interfaces/SendDataCard.interface';
import { CardResponse } from '../interfaces/ProductsCard.interface';
import { CompraProducto, urlPago } from '../interfaces/CompraProduct.iinterface';
import { ResponseAddCard } from '../interfaces/ResponseCard.interface';
import { Domicilio } from '../interfaces/Domicilio.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getProducts() {
    return this.http.get<Products[]>('http://localhost:3000/products');
  }
  getProductById(id:string) {
    return this.http.get<Products>('http://localhost:3000/products/'+id);
  }
  searchAutocomplete(query:string){
    return this.http.get<Products[]>(`http://localhost:3000/products?q=${{query}}`);
  }
  addProductToCard(dataCard:SendDataCard){
    return this.http.post<ResponseAddCard>('http://localhost:3000/carrito/', dataCard)
  }
  getProductByCard(data:{id:number}){
    return this.http.post<CardResponse>('http://localhost:3000/carrito/get_card',data)
  }
  comprarProduct(data:CompraProducto[]){
    return this.http.post<urlPago>('http://localhost:3000/products/pago', data)
  }
  deleteProductByCard(data:{id:number}){
    return this.http.post<ResponseAddCard>('http://localhost:3000/carrito/delete_card',data)
  }
  changeCantidad(data:{id:number,cantidad:number}){
    return this.http.post<ResponseAddCard>('http://localhost:3000/carrito/update_cantidad',data)
  }
  getUbicacion(id:string){
    return this.http.get<Domicilio>('http://localhost:3000/users/ubicacion/'+id)
  }
  getProductsByFilter(data:any){
    return this.http.post<Products[]>('http://localhost:3000/products/filter',data)
  }
  getProductsByGender(gender:string,tipo:string){
    return this.http.get<Products[]>('http://localhost:3000/products/gender/'+gender+'/category/'+tipo)
  }
}
