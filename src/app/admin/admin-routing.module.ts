import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { RegistroProductosComponent } from './pages/registro-productos/registro-productos.component';
import { CalculadoraComponent } from './pages/calculadora/calculadora.component';

const routes: Routes = [{
  path: '',
  component:LayoutPageComponent,
  children:[
    {
      path:'registro-producto',
      component:RegistroProductosComponent
    },
    {
      path:'calculadora',
      component:CalculadoraComponent
    }
  ]
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
