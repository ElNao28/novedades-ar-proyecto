import { Component, OnInit } from '@angular/core';
import { ListProducts } from '../../interfaces/GetProducts.interface';
import { AdminService } from '../../services/admin-service.service';

@Component({
  selector: 'app-view-descuentos',
  templateUrl: './view-descuentos.component.html',
  styleUrl: './view-descuentos.component.css'
})
export class ViewDescuentosComponent implements OnInit{

  constructor(private adminService:AdminService){}

  public listProducts:ListProducts[] = [];
  public order:string = "asc";

  ngOnInit(): void {
    this.adminService.getAllProductsByDes().subscribe(data => {
      this.listProducts = data.data;
    });
  }

  orderData(){
    if(this.order === "asc"){
      this.listProducts.sort((a,b) => a.descuento - b.descuento);
    }else{
      this.listProducts.sort((a,b) => b.descuento - a.descuento);
    }
  }
}
