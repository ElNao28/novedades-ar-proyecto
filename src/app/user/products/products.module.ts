import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { CardComponent } from './pages/card/card.component';
import { ViewProductComponent } from './pages/view-product/view-product.component';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { ProductsComponent } from './pages/products/products.component';
import { ScreenCompraComponent } from './pages/screen-compra/screen-compra.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    CardComponent,
    ViewProductComponent,
    ProductsComponent,
    ScreenCompraComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    PrimeNgModule,
    SharedModule
  ]
})
export class ProductsModule { }
