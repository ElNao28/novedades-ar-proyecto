import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModuloLoginModule } from './user/modulo-login/modulo-login.module';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ServiceWorkerModule } from '@angular/service-worker';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModuloLoginModule,
    PrimeNgModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    MessageService,
    ConfirmationService,
    provideCharts(withDefaultRegisterables()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
