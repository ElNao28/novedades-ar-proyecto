import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../interfaces/products.interface';
import { SendDataCard } from '../interfaces/SendDataCard.interface';
import { CardResponse } from '../interfaces/ProductsCard.interface';
import { CompraProducto, urlPago } from '../interfaces/CompraProduct.iinterface';
import { ResponseAddCard } from '../interfaces/ResponseCard.interface';
import { Domicilio } from '../interfaces/Domicilio.interface';
import { DataInicio } from '../interfaces/DataInicio.interface';
import { MessageService } from 'primeng/api';
import { ResponseProduct } from '../interfaces/ProductsOne.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }
  //private urlApi:string = 'http://localhost:3000/';
  private urlApi: string = 'https://back-novedadesar-production.up.railway.app/';

  getProducts() {
    return this.http.get<Products[]>(`${this.urlApi}products`);
  }
  getProductsNovedades() {
    return this.http.get<DataInicio>(`${this.urlApi}products/data-inicio`);
  }
  getProductById(id: string) {
    return this.http.get<Products>(`${this.urlApi}products/` + id);
  }
  getProductByIdOne(id: string) {
    return this.http.get<ResponseProduct>(`${this.urlApi}products/one/` + id);
  }
  searchAutocomplete(query: string) {
    return this.http.get<Products[]>(`${this.urlApi}products?q=${{ query }}`);
  }
  addProductToCard(dataCard: SendDataCard) {
    return this.http.post<ResponseAddCard>(`${this.urlApi}carrito/`, dataCard)
  }
  getProductByCard(data: { id: number }) {
    return this.http.post<CardResponse>(`${this.urlApi}carrito/get_card`, data)
  }
  comprarProduct(data: CompraProducto[]) {
    return this.http.post<urlPago>(`${this.urlApi}products/stripe-pago`, data)
  }
  deleteProductByCard(data: { id: number }) {
    return this.http.post<ResponseAddCard>(`${this.urlApi}carrito/delete_card`, data)
  }
  changeCantidad(data: { id: number, cantidad: number }) {
    return this.http.post<ResponseAddCard>(`${this.urlApi}carrito/update_cantidad`, data)
  }
  getUbicacion(id: string) {
    return this.http.get<Domicilio>(`${this.urlApi}users/ubicacion/` + id)
  }
  getProductsByFilter(data: any) {
    return this.http.post<Products[]>(`${this.urlApi}products/filter`, data)
  }
  getProductsByGender(gender: string, tipo: string) {
    return this.http.get<Products[]>(`${this.urlApi}products/gender/` + gender + '/category/' + tipo)
  }

  addProductToCardSer(id: string) {
    const idUser = localStorage.getItem('token');

    if (idUser !== null) {
      const dataCard: SendDataCard = {
        cantidad: 1,
        idProduct: parseInt(id),
        idUser: parseInt(idUser)
      }
      this.addProductToCard(dataCard).subscribe(data => {
        if (data.status === 200) {
          this.messageService.add({
            severity: 'success',
            detail: 'Producto agregado al carrito'
          })
        }
        else if (data.status === 409) {
          this.messageService.add({
            severity: 'warn',
            detail: 'El producto ya esta en el carrito'
          })
        }
      })
    }
    else {
      this.messageService.add({
        severity: 'warn',
        detail: 'Debes iniciar sesion para poder agregar al carrito'
      })
    }
  }

}
