import { NgModule } from "@angular/core";
import { InicioComponent } from "../user/pages/inicio/inicio.component";
import { LayoutPageComponent } from "../user/pages/layout-page/layout-page.component";
import { Error404Component } from "./pages/error-404/error-404.component";
import { LoaderComponent } from "./pages/loader/loader.component";
import { CommonModule } from "@angular/common";
import { PrimeNgModule } from "../prime-ng/prime-ng.module";

@NgModule({
  declarations: [
    InicioComponent,
    LayoutPageComponent,
    Error404Component,
    LoaderComponent,
  ],
  exports:[
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
  ],
})
export class SharedModule { }
