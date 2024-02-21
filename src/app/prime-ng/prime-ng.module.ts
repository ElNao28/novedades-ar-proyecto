import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SpeedDialModule } from 'primeng/speeddial';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { TreeModule } from 'primeng/tree';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PaginatorModule } from 'primeng/paginator';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { PasswordModule } from 'primeng/password';
import {DividerModule} from 'primeng/divider';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    CarouselModule,
    TagModule,
    ButtonModule,
    InputTextModule,
    SplitButtonModule,
    SpeedDialModule,
    MenubarModule,
    CardModule,
    DataViewModule,
    RatingModule,
    TreeModule,
    BreadcrumbModule,
    PaginatorModule,
    CascadeSelectModule,
    InputTextareaModule,
    CalendarModule,
    PasswordModule,
    DividerModule,
    AutoCompleteModule,
    DialogModule,
    ToastModule
  ]
})
export class PrimeNgModule { }
