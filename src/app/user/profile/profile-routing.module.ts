import { profileGuardGuardActivate, profileGuardGuardMatch } from './../guards/profile-guard.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProfileComponent } from './pages/view-profile/view-profile.component';
import { MisComprasComponent } from './pages/mis-compras/mis-compras.component';
import { DataPersonalComponent } from './pages/data-personal/data-personal.component';
import { DataCuentaComponent } from './pages/data-cuenta/data-cuenta.component';
import { DataSeguridadComponent } from './pages/data-seguridad/data-seguridad.component';
import { DataEnvioComponent } from './pages/data-envio/data-envio.component';
import { ComentariosComponent } from './pages/comentarios/comentarios.component';
import { ChatUserComponent } from './pages/chat-user/chat-user.component';
import { TakePhotoTestComponent } from './pages/take-photo-test/take-photo-test.component';

const routes: Routes = [
  {
    path:'profile/mis-compras',
    component:MisComprasComponent,
  },
  {
    path:'profile/opiniones',
    component:ComentariosComponent,
    canActivate: [profileGuardGuardActivate],
    canMatch:[profileGuardGuardMatch]
  },
  {
    path:'profile',
    component:ViewProfileComponent,
    canActivate: [profileGuardGuardActivate],
    canMatch:[profileGuardGuardMatch]
  },
  {
    path:'profile/personal',
    component:DataPersonalComponent,
    canActivate: [profileGuardGuardActivate],
    canMatch:[profileGuardGuardMatch]
  },
  {
    path:'profile/cuenta',
    component:DataCuentaComponent,
    canActivate: [profileGuardGuardActivate],
    canMatch:[profileGuardGuardMatch]
  },
  {
    path:'profile/seguridad',
    component:DataSeguridadComponent,
    canActivate: [profileGuardGuardActivate],
    canMatch:[profileGuardGuardMatch]
  },
  {
    path:'profile/ubicacion',
    component:DataEnvioComponent,
    canActivate: [profileGuardGuardActivate],
    canMatch:[profileGuardGuardMatch]
  },
  {
    path:'profile/chat/:id',
    component:ChatUserComponent,
    canActivate: [profileGuardGuardActivate],
    canMatch:[profileGuardGuardMatch]
  },
  {
    path:'foto',
    component:TakePhotoTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
