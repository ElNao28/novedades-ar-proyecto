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
import { FormRatingComponent } from './components/form-rating/form-rating.component';
import { ComentariosComponent } from './pages/comentarios/comentarios.component';
import { ChatUserComponent } from './pages/chat-user/chat-user.component';
import { TakePhotoTestComponent } from './pages/take-photo-test/take-photo-test.component';


@NgModule({
  declarations: [

    ViewProfileComponent,
    MisComprasComponent,
    DataPersonalComponent,
    DataCuentaComponent,
    DataSeguridadComponent,
    DataEnvioComponent,
    MenuRutasProfileComponent,
    FormRatingComponent,
    ComentariosComponent,
    ChatUserComponent,
    TakePhotoTestComponent,
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
