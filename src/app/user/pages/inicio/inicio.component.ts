import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductsService } from '../../products/services/products.service';
import { Products } from '../../products/interfaces/products.interface';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './inicio.component.css'
  ],

})
export class InicioComponent  implements OnInit{
  constructor(private productsService:ProductsService){}
  isLoader:boolean = true;
  products!:Products[];
  images = [
    'https://www.tooltyp.com/wp-content/uploads/2014/10/1900x920-8-beneficios-de-usar-imagenes-en-nuestros-sitios-web.jpg',
    'https://img.freepik.com/foto-gratis/pintura-lago-montana-montana-al-fondo_188544-9126.jpg'
  ];

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(data => {
      this.products = data
      setTimeout(() => {
        this.isLoader = false;
      }, 500);
    })
  }

}
