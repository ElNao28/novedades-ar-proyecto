import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { CrearCuentaComponent } from './pages/crear-cuenta/crear-cuenta.component';
import { RecuperarPassComponent } from './pages/recuperar-pass/recuperar-pass.component';
import { ModuloLoginRoutingModule } from './modulo-login-routing.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { LayoutFormComponent } from './components/layout-form/layout-form.component';



@NgModule({
  declarations: [
    IniciarSesionComponent,
    CrearCuentaComponent,
    RecuperarPassComponent,
    LayoutComponent,
    LayoutFormComponent
  ],
  imports: [
    CommonModule,
    ModuloLoginRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
  ]
})
export class ModuloLoginModule { }
