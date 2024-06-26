import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { CrearCuentaComponent } from './pages/crear-cuenta/crear-cuenta.component';
import { RecuperarPassComponent } from './pages/recuperar-pass/recuperar-pass.component';
import { ModuloLoginRoutingModule } from './modulo-login-routing.module';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { LayoutFormComponent } from './components/layout-form/layout-form.component';
import { SharedModule } from 'primeng/api';

@NgModule({
  declarations: [
    IniciarSesionComponent,
    CrearCuentaComponent,
    RecuperarPassComponent,
    LayoutFormComponent,
  ],
  imports: [
    CommonModule,
    ModuloLoginRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
  ],
  exports:[
    LayoutFormComponent,
  ],
  providers:[
  ]
})
export class ModuloLoginModule { }
