import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';

const routes: Routes = [
  {
    path: 'user',
    component: LayoutPageComponent,
    children:[
      {
        path:'inicio',
        component:InicioComponent
      },
      {
        path:'ola',
        loadChildren: () => import('./modulo-login/modulo-login.module').then(m => m.ModuloLoginModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
