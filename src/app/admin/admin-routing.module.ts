import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { RegistroProductosComponent } from './pages/registro-productos/registro-productos.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { ViewDescuentosComponent } from './pages/view-descuentos/view-descuentos.component';
import { VentasFenvioComponent } from './pages/ventas-fenvio/ventas-fenvio.component';

const routes: Routes = [
  {
    path:'login-admin',
    component:LoginAdminComponent
  },
  {
  path: '',
  component:LayoutPageComponent,
  children:[
    {
      path:'home',
      component:HomeAdminComponent
    },
    {
      path:'productos',
      component:ListProductsComponent
    },
    {
      path:'edit-product/:id',
      component:EditProductComponent
    },
    {
      path:'descuentos',
      component:ViewDescuentosComponent
    },
    {
      path:'registro-producto',
      component:RegistroProductosComponent
    },
    {
      path:'usuarios',
      component:ListUsersComponent
    },
    {
      path:'ventas-por-enviar',
      component:VentasFenvioComponent
    },
    {
      path:'**',
      redirectTo:'home'
    }
  ]
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
