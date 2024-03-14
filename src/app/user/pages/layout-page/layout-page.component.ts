import { Component, ViewEncapsulation } from '@angular/core';
import { MLoginService } from '../../modulo-login/services/m-login.service';
import { Products } from '../../products/interfaces/products.interface';
import { ProductsService } from '../../products/services/products.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {

  constructor(
    private loginService: MLoginService,
    private producstService: ProductsService,
    ) { }
  items!: Products[];
  itemsS!: Products[];

  isLogin(): boolean {
    return this.loginService.checkLogin();
  }
    selectedItem: any;


  search(event: AutoCompleteCompleteEvent) {
    this.producstService.searchAutocomplete(event.query).subscribe(data => {
      this.items = data
      this.itemsS = this.items.filter(item => item.nombre_producto.toLowerCase().includes(event.query.toLowerCase()));
      console.log(this.itemsS)
    }
    )
  }




    closeSesion() {
      localStorage.removeItem('token')
    }

}
