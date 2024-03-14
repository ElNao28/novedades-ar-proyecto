import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { RegistroProductosComponent } from './pages/registro-productos/registro-productos.component';
import { ModuloLoginModule } from '../user/modulo-login/modulo-login.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LayoutPageComponent,
    RegistroProductosComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ModuloLoginModule,
    PrimeNgModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
