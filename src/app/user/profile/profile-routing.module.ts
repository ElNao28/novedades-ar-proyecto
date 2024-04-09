import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProfileComponent } from './pages/view-profile/view-profile.component';
import { MisComprasComponent } from './pages/mis-compras/mis-compras.component';
import { DataPersonalComponent } from './pages/data-personal/data-personal.component';
import { DataCuentaComponent } from './pages/data-cuenta/data-cuenta.component';
import { DataSeguridadComponent } from './pages/data-seguridad/data-seguridad.component';
import { DataEnvioComponent } from './pages/data-envio/data-envio.component';

const routes: Routes = [
  {
    path:'profile/:id',
    component:ViewProfileComponent,
  },
  {
    path:'profile/:id/personal',
    component:DataPersonalComponent
  },
  {
    path:'profile/:id/cuenta',
    component:DataCuentaComponent
  },
  {
    path:'profile/:id/seguridad',
    component:DataSeguridadComponent
  },
  {
    path:'profile/:id/ubicacion',
    component:DataEnvioComponent
  },
  {
    path:'profile/:id/mis-compras',
    component:MisComprasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
