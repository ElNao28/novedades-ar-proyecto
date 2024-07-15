import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { CardComponent } from './pages/card/card.component';
import { ViewProductComponent } from './pages/view-product/view-product.component';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { ProductsComponent } from './pages/products/products.component';
import { ScreenCompraComponent } from './pages/screen-compra/screen-compra.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsFilterComponent } from './pages/products-filter/products-filter.component';


@NgModule({
  declarations: [
    CardComponent,
    ViewProductComponent,
    ProductsComponent,
    ScreenCompraComponent,
    ProductsFilterComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    PrimeNgModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
