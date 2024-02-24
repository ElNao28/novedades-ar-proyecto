import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';

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
        loadChildren: () => import('./modulo-login/modulo-login.module').then(m => m.ModuloLoginModule)
      },
      {
        path:'**',
        redirectTo:'inicio'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
