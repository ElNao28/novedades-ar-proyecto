import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { RegistroProductosComponent } from './pages/registro-productos/registro-productos.component';
import { ModuloLoginModule } from '../user/modulo-login/modulo-login.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { ProductsService } from '../user/products/services/products.service';
import { ViewDescuentosComponent } from './pages/view-descuentos/view-descuentos.component';
import { VentasFenvioComponent } from './pages/ventas-fenvio/ventas-fenvio.component';
import { VentasPendientesComponent } from './pages/ventas-pendientes/ventas-pendientes.component';
import { VentasCompletasComponent } from './pages/ventas-completas/ventas-completas.component';
import { FormCodeComponent } from './components/form-code/form-code.component';
import { FormDescuentoComponent } from './components/form-descuento/form-descuento.component';
import { ViewStockComponent } from './pages/view-stock/view-stock.component';
import { FormStockComponent } from './components/form-stock/form-stock.component';
import { EditMisionComponent } from './pages/edit-mision/edit-mision.component';
import { EditVisionComponent } from './pages/edit-vision/edit-vision.component';
import { ChatTestComponent } from './pages/chat-test/chat-test.component';
import { GraficasComponent } from './pages/graficas/graficas.component';
import { BaseChartDirective } from 'ng2-charts';


@NgModule({
  declarations: [
    LayoutPageComponent,
    RegistroProductosComponent,
    ListUsersComponent,
    LoginAdminComponent,
    HomeAdminComponent,
    ListProductsComponent,
    EditProductComponent,
    ViewDescuentosComponent,
    VentasFenvioComponent,
    VentasPendientesComponent,
    VentasCompletasComponent,
    FormCodeComponent,
    FormDescuentoComponent,
    ViewStockComponent,
    FormStockComponent,
    EditMisionComponent,
    EditVisionComponent,
    ChatTestComponent,
    GraficasComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ModuloLoginModule,
    PrimeNgModule,
    ReactiveFormsModule,
    BaseChartDirective
  ],
})
export class AdminModule { }
