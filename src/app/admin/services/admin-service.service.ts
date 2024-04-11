import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductCategory } from '../interfaces/ProductCategory.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  addProduct(newProduct:any){
    return this.http.post('http://localhost:3000/products',newProduct)
  }

  getProductByCategory(type:string){
    return this.http.get<ProductCategory[]>('http://localhost:3000/products/category/'+type)
  }
}
