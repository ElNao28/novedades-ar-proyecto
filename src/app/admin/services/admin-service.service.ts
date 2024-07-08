import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductCategory } from '../interfaces/ProductCategory.interface';
import { ResponseCreateUser } from '../../user/modulo-login/interfaces/SendUser.interface';
import { GetUsers } from '../interfaces/GetUsers.interface';
import { ListProducts } from '../interfaces/GetProducts.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  addProduct(newProduct:any){
    return this.http.post<ResponseCreateUser>('http://localhost:3000/products',newProduct)
  }

  getProductByCategory(type:string){
    return this.http.get<ProductCategory[]>('http://localhost:3000/products/category/'+type)
  }
  getAllUsers(){
    return this.http.get<GetUsers[]>('http://localhost:3000/users')
  }
  getAllProducts(){
    return this.http.get<ListProducts[]>('http://localhost:3000/products/all-products-admin')
  }
}
