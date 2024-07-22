import { Component, OnInit } from '@angular/core';
import { ListProducts } from '../../interfaces/GetProducts.interface';
import { AdminService } from '../../services/admin-service.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }
  listProducts: ListProducts[] = [];
  filter: ListProducts[] = [];
  type: string = 'T';
  estado:string = 'T';

  ngOnInit(): void {
    this.adminService.getAllProducts().subscribe(products => {
      this.listProducts = products;
      this.filter = this.listProducts;
    });
  }

  changeStatus(id: number, action: boolean) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de cambiar el estado?',
      header: 'Cambiar Estado',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.adminService.changeStatus(id, action).subscribe(resp => {
          if (resp.status === 200) {
            this.messageService.add({
              severity:'success',
              detail: 'El estado ha sido cambiado'
            })
            this.ngOnInit();
          }
          else if (resp.status === 400) {
            alert(resp.message)
          }
        })
      }
    })

  }
  filtrarByGender() {
    switch (this.type) {
      case 'T':
        this.filter = this.listProducts;
        break;
      case 'M':
        if(this.estado === 'T')
          this.filter = this.listProducts.filter(product => product.categoria === 'M');
        else
          this.filter = this.listProducts.filter(product => product.categoria === 'M' && product.status === this.estado);
        break;
      case 'H':
        if(this.estado === 'T')
          this.filter = this.listProducts.filter(product => product.categoria === 'H');
        else
          this.filter = this.listProducts.filter(product => product.categoria === 'H' && product.status === this.estado);
        break;
    }
  }
  filterByStatus(){
    switch (this.estado) {
      case 'T':
        this.filter = this.listProducts;
        break;
      case 'activo':
        if(this.type === 'T')
          this.filter = this.listProducts.filter(product => product.status === 'activo');
        else
          this.filter = this.listProducts.filter(product => product.status === 'activo' && product.categoria === this.type);
        break;
      case 'inactivo':
        if(this.type === 'T')
          this.filter = this.listProducts.filter(product => product.status === 'inactivo');
        else
          this.filter = this.listProducts.filter(product => product.status === 'inactivo' && product.categoria === this.type);
        break;
    }
  }
  resetFilter(){
    this.filter = this.listProducts
    this.type = 'T';
    this.estado = 'T';
  }
}
