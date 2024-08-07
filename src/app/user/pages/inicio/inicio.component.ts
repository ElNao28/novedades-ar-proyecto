import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductsService } from '../../products/services/products.service';
import { Products } from '../../products/interfaces/products.interface';
import { ProductoIni } from '../../products/interfaces/DataInicio.interface';
import { ProductsParaTi } from '../../products/interfaces/GetParaTi.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TagTemplates } from 'primeng/tag';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './inicio.component.css'
  ],

})
export class InicioComponent implements OnInit{
  constructor(
    private productsService: ProductsService,
  ) { }
  isLoader: boolean = true;
  novedades!: ProductoIni[];
  descuento!: ProductoIni[];
  dama!:ProductoIni[];
  caballero!: ProductoIni[];
  paraTi!: ProductsParaTi[];
  private jwt = new JwtHelperService()
  images = [
    'https://res.cloudinary.com/dy5jdb6tv/image/upload/fl_preserve_transparency/v1713151485/portada_ngupek.jpg?_s=public-apps',
    'https://www.bombombom.mx/wp-content/uploads/2021/04/ropa-mayoreo-bombombom.mx_-1.jpg','https://fos.com.mx/cdn/shop/articles/negocio_de_ropa.webp?v=1690921572&width=2000','https://www.clikisalud.net/wp-content/uploads/2018/07/el-importante-beneficio-de-usar-ropa-holgada.jpg'
  ];

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if(token !== null){
      let tokenN = this.jwt.decodeToken(token);
      this.productsService.getProductsByType(tokenN.sub).subscribe(data =>{
        this.paraTi = data.data;
        setTimeout(() => {
          this.isLoader = false;
        }, 500);
      })
    }
    this.productsService.getProductsNovedades().subscribe(
      data => {
        this.novedades = data.novedades;
        this.descuento = data.descuento;
        this.dama = data.dama;
        this.caballero = data.caballero;
        setTimeout(() => {
          this.isLoader = false;
        }, 500);
      },
      error => {
        console.log('Error de conexión');
      }
    );

  }

  addCardProduct(idCard:number){
    this.productsService.addProductToCardSer(idCard.toString());
  }
}
