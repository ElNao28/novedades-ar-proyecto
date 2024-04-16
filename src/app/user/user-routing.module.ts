import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { canActivate, canMatch } from './guards/guards.guard';
import { TerminosCondicionesComponent } from './pages/terminos-condiciones/terminos-condiciones.component';
import { AvisoPrivacidadComponent } from './pages/aviso-privacidad/aviso-privacidad.component';
import { CookiesComponent } from './pages/cookies/cookies.component';

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
        path:'terminos-condiciones',
        component:TerminosCondicionesComponent
      },
      {
        path:'aviso-privacidad',
        component:AvisoPrivacidadComponent
      },
      {
        path:'cookies',
        component:CookiesComponent
      },
      {
        path:'',
        redirectTo:'/inicio',
        pathMatch:'full'
      },
      {
        path: '',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: '',
        loadChildren: () => import('../user/products/products.module').then(m => m.ProductsModule)
      },
      {
        path:'',
        loadChildren: () => import('./modulo-login/modulo-login.module').then(m => m.ModuloLoginModule),
        canActivate: [canActivate],
        canMatch:[canMatch]
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
