import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './user/pages/inicio/inicio.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  },
  { path: '', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  {
    path:'**',
    redirectTo:'inicio'
  },

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],//{useHash:true}
  exports: [RouterModule]
})
export class AppRoutingModule { }
