import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path:'**',
    redirectTo:''
  },


  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],//{useHash:true}
  exports: [RouterModule]
})
export class AppRoutingModule { }
