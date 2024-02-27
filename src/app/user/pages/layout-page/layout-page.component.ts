import { Component, OnInit } from '@angular/core';
import { MLoginService } from '../../modulo-login/services/m-login.service';
import { Product } from '../../products/interfaces/products.interface';
import { ProductsService } from '../../products/services/products.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent implements OnInit{
  constructor(private loginService:MLoginService, private producstService:ProductsService){}
  ngOnInit(): void {
    this.producstService.getProducts().subscribe(data =>{
      this.products = data;
      this.products.forEach(element => {
        this.opciones.push(element.title)
      });
    })
  }

  inputValue: string = '';
  opciones: string[] = [];
  opcionesFiltradas: string[] = [];
  products!:Product[];
  isLogin():boolean{
    return this.loginService.checkLogin();
  }
  closeSesion(){
    localStorage.removeItem('token')
  }
  filtrarOpciones(): void {
    this.opcionesFiltradas = this.opciones.filter(opcion =>
      opcion.toLowerCase().includes(this.inputValue.toLowerCase())
    );
  }
}
