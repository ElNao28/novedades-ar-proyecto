import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { MLoginService } from '../../../modulo-login/services/m-login.service';
import { CompraProducto } from '../../interfaces/CompraProduct.iinterface';
import { CardResponse } from '../../interfaces/ProductsCard.interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  constructor(
    private producsService: ProductsService,
    private mLoginService: MLoginService,
    private loginService: MLoginService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }
  private jwtHelper = new JwtHelperService();
  productsCard: CardResponse = {
    id: 0,
    estado: 0,
    detallesCarrito: []
  };
  total: number = 0;
  islogin = false
  idUser!: string;
  imgNotCard: boolean = true;
  desactiveBtn: boolean = false;
  isLoader: boolean = true;
  btnDisabled: boolean = false;
  ngOnInit(): void {
    const idUser = localStorage.getItem('token')
    if (idUser !== null) {
      const token = this.jwtHelper.decodeToken(idUser)
      this.getProducts(token.sub)
    }
    else {
      setTimeout(() => {
        this.isLoader = false;
      }, 500);
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
            })
          }
        }
        break;
    }
    this.changeTotal();
  }

  getProducts(idUser: string) {
    this.producsService.getProductByCard({ id: parseInt(idUser) }).subscribe(data => {
      this.productsCard = data;
      setTimeout(() => {
        this.isLoader = false;
      }, 500);
      if (data.detallesCarrito.length >= 1) {
        for (let i = 0; i < this.productsCard.detallesCarrito.length; i++) {
          this.total += this.productsCard.detallesCarrito[i].product.precio * this.productsCard.detallesCarrito[i].cantidad
        }
        this.imgNotCard = false;
      }
      else {
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
    })
  }
  comprarCard() {
    const dataByBack: CompraProducto[] = [];
    const userId = localStorage.getItem('token');
    this.confirmationService.confirm({
      header: 'Confirmar compra',
      message: '¿Estás seguro de que deseas comprar?',
      acceptLabel: 'Comprar',
      rejectLabel: 'Cancelar',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        if (userId !== null) {
          const token = this.jwtHelper.decodeToken(userId)
          this.loginService.checkUbicacion(token.sub).subscribe(resp => {
            if (resp.status === 404) {
              return this.messageService.add({
                severity: 'warn',
                detail: 'Debes agregar tus datos de envio para poder comprar'
              });
            }
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
            this.btnDisabled = true;
            this.producsService.comprarProduct(dataByBack).subscribe(data => {
              window.location.href = data.url;
            });
          });
        }
      },
      reject: () => {
        this.btnDisabled = false;
      }
    })

  }


}
