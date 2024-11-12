import { NavBarComponent } from './../user/components/nav-bar/nav-bar.component';
import { NgModule } from "@angular/core";
import { InicioComponent } from "../user/pages/inicio/inicio.component";
import { LayoutPageComponent } from "../user/pages/layout-page/layout-page.component";
import { Error404Component } from "./pages/error-404/error-404.component";
import { LoaderComponent } from "./pages/loader/loader.component";
import { CommonModule } from "@angular/common";
import { PrimeNgModule } from "../prime-ng/prime-ng.module";
import { JwtHelperService } from '@auth0/angular-jwt';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InicioComponent,
    LayoutPageComponent,
    Error404Component,
    LoaderComponent,
    NavBarComponent
  ],
  exports:[
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
