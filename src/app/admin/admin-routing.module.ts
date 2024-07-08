import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { RegistroProductosComponent } from './pages/registro-productos/registro-productos.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';

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
      path:'registro-producto',
      component:RegistroProductosComponent
    },
    {
      path:'usuarios',
      component:ListUsersComponent
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
