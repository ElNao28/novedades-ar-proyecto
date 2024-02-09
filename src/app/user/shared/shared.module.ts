import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';



@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
  ],
})
export class SharedModule { }
