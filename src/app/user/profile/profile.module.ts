import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ViewProfileComponent } from './pages/view-profile/view-profile.component';
import { MisComprasComponent } from './pages/mis-compras/mis-compras.component';
import { DataPersonalComponent } from './pages/data-personal/data-personal.component';
import { DataCuentaComponent } from './pages/data-cuenta/data-cuenta.component';
import { DataSeguridadComponent } from './pages/data-seguridad/data-seguridad.component';
import { DataEnvioComponent } from './pages/data-envio/data-envio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { MenuRutasProfileComponent } from './components/menu-rutas-profile/menu-rutas-profile.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [

    ViewProfileComponent,
    MisComprasComponent,
    DataPersonalComponent,
    DataCuentaComponent,
    DataSeguridadComponent,
    DataEnvioComponent,
    MenuRutasProfileComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    PrimeNgModule,
    SharedModule
  ]
})
export class ProfileModule { }
