import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ProducsToCard } from '../../interfaces/ProductsCard.interface';
import { MLoginService } from '../../../modulo-login/services/m-login.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{
  constructor(
    private producsService:ProductsService,
    private mLoginService:MLoginService
    ){}

  productsCard:ProducsToCard[] = [{
    id: 0,
    nombre_producto: '',
    precio: 0,
    cantidad: 0,
    img: '',
    usuarioId: 0,
  }];
  total:number = 0;
  islogin = false
  ngOnInit(): void {
    const idUser = localStorage.getItem('token')

    if(idUser){
      this.producsService.getProductByCard(idUser).subscribe(data => {
      this.productsCard = data
      for (let i = 0; i < this.productsCard.length;i++){
        this.total += this.productsCard[i].precio * this.productsCard[i].cantidad
      }
    })}

    this.islogin = this.mLoginService.checkLogin()
    console.log(this.islogin)
  }

  changeCantidad(value:string, idProduct:number){
    switch(value){
      case '+':
        for(let i = 0; i < this.productsCard.length; i++){
          if(this.productsCard[i].id === idProduct)
            this.productsCard[i].cantidad+=1;
          }
        ;
        break;
      case '-':
        for(let i = 0; i < this.productsCard.length; i++){
          if(this.productsCard[i].id === idProduct)
            this.productsCard[i].cantidad-=1;
          }
        break;
    }
    this.changeTotal(value);
  }

  changeTotal(value:string){
    this.total = 0
    switch(value){
      case '+':
        for(let i = 0; i < this.productsCard.length; i++){
          this.total += this.productsCard[i].precio * this.productsCard[i].cantidad
        }
        break;
      case '-':
        for(let i = 0; i < this.productsCard.length; i++){
          this.total += this.productsCard[i].precio * this.productsCard[i].cantidad
        }

        break;
    }

  }
}
