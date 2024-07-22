import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './shared/pages/error-404/error-404.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path:'**',
    component:Error404Component
  }

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash:true,
    scrollPositionRestoration:'top'
  })],//{useHash:true}
  exports: [RouterModule]
})
export class AppRoutingModule { }
