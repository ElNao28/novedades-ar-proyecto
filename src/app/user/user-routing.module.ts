import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { canActivate, canMatch } from './guards/guards.guard';
import { Error404Component } from './shared/pages/error-404/error-404.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children:[
      {
        path:'inicio',
        component:InicioComponent
      },
      {
        path:'',
        loadChildren: () => import('./modulo-login/modulo-login.module').then(m => m.ModuloLoginModule),
        canActivate: [canActivate],
        canMatch:[canMatch]
      },
      {
        path: '',
        loadChildren: () => import('../user/products/products.module').then(m => m.ProductsModule)
      },
      {
        path:'**',
        component:Error404Component
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
