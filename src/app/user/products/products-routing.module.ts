import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './pages/card/card.component';
import { ProductsComponent } from './pages/products/products.component';
import { ViewProductComponent } from './pages/view-product/view-product.component';
import { MisComprasComponent } from './pages/mis-compras/mis-compras.component';
import { canActivate, canMatch } from '../guards/guards.guard';

const routes: Routes = [
  {
    path: 'carrito',
    component: CardComponent
  },
  {
    path: 'productos',
    component: ProductsComponent
  },
  {
    path: 'mis-compras',
    component: MisComprasComponent
  },
  {
    path:'view/:id',
    component: ViewProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
