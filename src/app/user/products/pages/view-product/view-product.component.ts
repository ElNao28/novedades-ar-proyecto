import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { MessageService } from 'primeng/api';
import { MLoginService } from '../../../modulo-login/services/m-login.service';
import { Data } from '../../interfaces/ProductsOne.interface';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent implements OnInit {
  constructor(
    private routerLink: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router,
    private messageService: MessageService,
    private loginService: MLoginService
  ) { }
  id!: string;
  rating: number = 0;
  product: Data = {
    id: 0,
    nombre_producto: "",
    precio: 0,
    descripccion: "",
    stock: 0,
    categoria: '',
    rating: 0,
    descuento: 0,
    status: '',
    imagen: [],
    tipo: '',
    comentarios: []
  };
  isLoader: boolean = true;
  cantidad: number = 1;
  imagenCarrucel: string = "";
  ngOnInit(): void {
    this.id = this.routerLink.snapshot.paramMap.get('id')!;
    this.productsService.getProductByIdOne(this.id).subscribe(data => {
      if (data.status === 404) {
        this.router.navigate(['/404']);
        return
      }
      this.product = data.data
      this.rating = 5;
      setTimeout(() => {
        this.isLoader = false;
      }, 500);
      this.imagenCarrucel = data.data.imagen[0].url_imagen;
    });
  }
  addProductToCard() {
    this.productsService.addProductToCardSer(this.id)
  }

  async comprarProduct() {
    if (this.loginService.checkLogin()) {
      return this.messageService.add(
        {
          severity: 'warn',
          detail: 'Debes iniciar sesion para poder comprar el producto'
        }
      )
    }
    let id = localStorage.getItem('token');
    if (id !== null) {
      this.loginService.checkUbicacion(id).subscribe(resp => {
        if (resp.status === 404) {
          return this.messageService.add({
            severity: 'warn',
            detail: 'Debes agregar tus datos de envio para poder comprar'
          })
        }

        this.router.navigate(['compra/', this.id]);
        localStorage.setItem('product', this.id);
        localStorage.setItem('cantidad', this.cantidad.toString());
      })
    }
  }

  changeCantidad(value: string) {
    switch (value) {
      case '+':
        this.cantidad++;
        ;
        break;
      case '-':
        this.cantidad--;
        break;
    }
  }

  changeImgCarrucel(id: number) {
    for (let i = 0; i < this.imagenCarrucel.length; i++) {
      if (id === this.product.imagen[i].id) {
        this.imagenCarrucel = this.product.imagen[i].url_imagen;
      }
    }
  }
  calDes(precio: number, descuento: number) {
    let dato = precio - (precio * descuento / 100);
    return Math.floor(dato);
  }
}
