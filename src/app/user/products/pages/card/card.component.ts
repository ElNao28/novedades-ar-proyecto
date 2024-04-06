import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { MLoginService } from '../../../modulo-login/services/m-login.service';
import { CompraProducto } from '../../interfaces/CompraProduct.iinterface';
import { CardResponse } from '../../interfaces/ProductsCard.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  constructor(
    private producsService: ProductsService,
    private mLoginService: MLoginService
  ) { }

  productsCard: CardResponse = {
    id: 0,
    estado: 0,
    detallesCarrito: []
  };
  total: number = 0;
  islogin = false
  idUser!: string;
  imgNotCard:boolean = true;
  ngOnInit(): void {
    const idUser = localStorage.getItem('token')
    if (idUser !== null) {
      this.getProducts(idUser)
    }
    this.islogin = this.mLoginService.checkLogin()
  }
  changeCantidad(value: string, idProduct: number) {
    switch (value) {
      case '+':
        for (let i = 0; i < this.productsCard.detallesCarrito.length; i++) {
          if (this.productsCard.detallesCarrito[i].id === idProduct) {
            this.productsCard.detallesCarrito[i].cantidad += 1;
            this.producsService.changeCantidad({ id: idProduct, cantidad: this.productsCard.detallesCarrito[i].cantidad }).subscribe(data => {
              console.log(data)
            })
          }

        }
        ;
        break;
      case '-':
        for (let i = 0; i < this.productsCard.detallesCarrito.length; i++) {
          if (this.productsCard.detallesCarrito[i].id === idProduct) {
            this.productsCard.detallesCarrito[i].cantidad -= 1;
            this.producsService.changeCantidad({ id: idProduct, cantidad: this.productsCard.detallesCarrito[i].cantidad }).subscribe(data => {
              console.log(data)
            })
          }
        }
        break;
    }
    this.changeTotal();
  }

  getProducts(idUser: string) {
      this.producsService.getProductByCard({ id: parseInt(idUser) }).subscribe(data => {
        console.log(data);
        this.productsCard = data;
        if(data.detallesCarrito.length >= 1){
          for (let i = 0; i < this.productsCard.detallesCarrito.length; i++) {
            this.total += this.productsCard.detallesCarrito[i].product.precio * this.productsCard.detallesCarrito[i].cantidad
          }
          this.imgNotCard = false;
          console.log(data);
        }
        else{
          this.imgNotCard = true;
        }
      });
  }
  changeTotal() {
    this.total = 0
    for (let i = 0; i < this.productsCard.detallesCarrito.length; i++) {
      this.total += this.productsCard.detallesCarrito[i].product.precio * this.productsCard.detallesCarrito[i].cantidad
    }
  }
  deleteProductByCard(id: number) {
    this.producsService.deleteProductByCard({ id: id }).subscribe(data => {
      if (data.status === 200) {
        const idUser = localStorage.getItem('token')
        if (idUser !== null) {
          this.total = 0;
          this.getProducts(idUser);
        }
      }
      console.log(data);
    })
  }
  comprarCard() {
    const dataByBack: CompraProducto[] = [];
    const userId = localStorage.getItem('token');
    if (userId !== null) {
      for (let i = 0; i < this.productsCard.detallesCarrito.length; i++) {
        dataByBack.push(
          {
            id: this.productsCard.detallesCarrito[i].product.id,
            title: this.productsCard.detallesCarrito[i].product.nombre_producto,
            precio: this.productsCard.detallesCarrito[i].product.precio,
            idUser: userId,
            cantidad: this.productsCard.detallesCarrito[i].cantidad.toString(),
            idCard: this.productsCard.id.toString()
          }
        )
      }
      this.producsService.comprarProduct(dataByBack).subscribe(data => {
        console.log(data);
        window.open(data.url);
      });
    }
  }
}
