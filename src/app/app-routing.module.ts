import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './user/shared/pages/inicio/inicio.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'user',
    loadChildren: () => import('./user/modulo-login/modulo-login.module').then(m => m.ModuloLoginModule)
  },
  {
    path:'**',
    redirectTo:'inicio'
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  }

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
