import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { CardComponent } from './pages/card/card.component';
import { ViewProductComponent } from './pages/view-product/view-product.component';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { ProductsComponent } from './pages/products/products.component';
import { MisComprasComponent } from './pages/mis-compras/mis-compras.component';


@NgModule({
  declarations: [
    CardComponent,
    ViewProductComponent,
    ProductsComponent,
    MisComprasComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    PrimeNgModule,
  ]
})
export class ProductsModule { }
