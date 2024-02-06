import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { CrearCuentaComponent } from './pages/crear-cuenta/crear-cuenta.component';
import { RecuperarPassComponent } from './pages/recuperar-pass/recuperar-pass.component';
import { LayoutComponent } from './pages/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component:LayoutComponent,
    children:[
      {
        path:'login',
        component:IniciarSesionComponent
      },
      {
        path:'crear-cuenta',
        component:CrearCuentaComponent
      },
      {
        path:'recuperar-password',
        component:RecuperarPassComponent
      },
      {
        path:'**',
        redirectTo:'login'
      },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloLoginRoutingModule { }
