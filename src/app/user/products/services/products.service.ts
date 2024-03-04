import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../interfaces/products.interface';
import { SendDataCard } from '../interfaces/SendDataCard.interface';
import { ProducsToCard } from '../interfaces/ProductsCard.interface';

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
    return this.http.get<Products[]>(`http://localhost:3000/products?q=${{query}}&_limit=5`);
  }
  addProductToCard(dataCard:SendDataCard){
    return this.http.post('http://localhost:3000/carrito/', dataCard)
  }
  getProductByCard(id:string | null){
    return this.http.get<ProducsToCard[]>('http://localhost:3000/carrito/'+id)
  }
}
