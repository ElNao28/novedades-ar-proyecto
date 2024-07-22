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
import { VentasPendientesComponent } from './pages/ventas-pendientes/ventas-pendientes.component';
import { VentasCompletasComponent } from './pages/ventas-completas/ventas-completas.component';
import { canMatchGuard } from './guards/can-match.guard';
import { canActivate } from '../user/guards/guards.guard';
import { canActivateGuard } from './guards/can-activate.guard';
import { isLoginMatchGuard } from './guards/is-login-match.guard';
import { isLoginActivateGuard } from './guards/is-login-activate.guard';

const routes: Routes = [
  {
    path:'login-admin',
    component:LoginAdminComponent,
    canMatch:[isLoginMatchGuard],
    canActivate:[isLoginActivateGuard]
  },
  {
  path: '',
  component:LayoutPageComponent,
  children:[
    {
      path:'home',
      component:HomeAdminComponent,
      canMatch:[canMatchGuard],
      canActivate:[canActivateGuard]
    },
    {
      path:'productos',
      component:ListProductsComponent,
      canMatch:[canMatchGuard],
      canActivate:[canActivateGuard]
    },
    {
      path:'edit-product/:id',
      component:EditProductComponent,
      canMatch:[canMatchGuard],
      canActivate:[canActivateGuard]
    },
    {
      path:'descuentos',
      component:ViewDescuentosComponent,
      canMatch:[canMatchGuard],
      canActivate:[canActivateGuard]
    },
    {
      path:'registro-producto',
      component:RegistroProductosComponent,
      canMatch:[canMatchGuard],
      canActivate:[canActivateGuard]
    },
    {
      path:'usuarios',
      component:ListUsersComponent,
      canMatch:[canMatchGuard],
      canActivate:[canActivateGuard]
    },
    {
      path:'ventas-por-enviar',
      component:VentasFenvioComponent,
      canMatch:[canMatchGuard],
      canActivate:[canActivateGuard]
    },
    {
      path:'ventas-pendientes',
      component:VentasPendientesComponent,
      canMatch:[canMatchGuard],
      canActivate:[canActivateGuard]
    },
    {
      path:'ventas-completas',
      component:VentasCompletasComponent,
      canMatch:[canMatchGuard],
      canActivate:[canActivateGuard]
    },
    {
      path:'**',
      redirectTo:'/404'
    }
  ]
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
