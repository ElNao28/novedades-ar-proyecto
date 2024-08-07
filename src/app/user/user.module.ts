import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';
import { AvisoPrivacidadComponent } from './pages/aviso-privacidad/aviso-privacidad.component';
import { TerminosCondicionesComponent } from './pages/terminos-condiciones/terminos-condiciones.component';
import { CookiesComponent } from './pages/cookies/cookies.component';
import { MisionComponent } from './pages/mision/mision.component';
import { VisionComponent } from './pages/vision/vision.component';
import { ThanksComponent } from './pages/thanks/thanks.component';

@NgModule({
  declarations: [
      AvisoPrivacidadComponent,
       TerminosCondicionesComponent,
       CookiesComponent,
       MisionComponent,
       VisionComponent,
       ThanksComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    PrimeNgModule,
    SharedModule
  ],
  exports: [
  ]
})
export class UserModule { }
