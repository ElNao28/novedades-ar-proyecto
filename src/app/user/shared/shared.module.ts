import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from '../pages/inicio/inicio.component';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { LayoutPageComponent } from '../pages/layout-page/layout-page.component';
import { Error404Component } from './pages/error-404/error-404.component';



@NgModule({
  declarations: [
    InicioComponent,
    LayoutPageComponent,
    Error404Component
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
  ],
})
export class SharedModule { }
