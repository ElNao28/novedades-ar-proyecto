import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {
  public showNosotrosList: boolean = false;
  public showProductosList: boolean = false;
  public showVentassList: boolean = false;

}
