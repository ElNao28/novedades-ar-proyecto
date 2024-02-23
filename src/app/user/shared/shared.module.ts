import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from '../pages/inicio/inicio.component';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { LayoutPageComponent } from '../pages/layout-page/layout-page.component';



@NgModule({
  declarations: [
    InicioComponent,
    LayoutPageComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
  ],
})
export class SharedModule { }
