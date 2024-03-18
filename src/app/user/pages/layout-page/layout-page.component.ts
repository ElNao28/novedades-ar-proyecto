import { Component, ViewEncapsulation } from '@angular/core';
import { MLoginService } from '../../modulo-login/services/m-login.service';
import { Products } from '../../products/interfaces/products.interface';
import { ProductsService } from '../../products/services/products.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { MessageService } from 'primeng/api';

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
    private messageService:MessageService
    ) { }
  items!: Products[];
  itemsS!: Products[];
  products!:string[];
  selectedItem: any;
  isLogin(): boolean {
    return this.loginService.checkLogin();
  }

  search(event: AutoCompleteCompleteEvent) {
    this.producstService.getProducts().subscribe(data => {
      this.items = data
      this.itemsS = this.items.filter(item => item.nombre_producto.toLowerCase().includes(event.query.toLowerCase()));
      console.log(this.itemsS)
    }
    )
  }
    closeSesion() {
      this.onConfirm()
      localStorage.removeItem('token')
    }



    visible: boolean = false;

    showConfirm() {
        if (!this.visible) {
            this.messageService.add(
              {
                key: 'confirm', sticky: true, severity: 'warn', summary: '¿Estas seguro que deseas cerrar sesion?'
              });
            this.visible = true;
        }
    }

    onConfirm() {
        this.messageService.clear('confirm');
        this.visible = false;
    }

    onReject() {
        this.messageService.clear('confirm');
        this.visible = false;
    }

}
