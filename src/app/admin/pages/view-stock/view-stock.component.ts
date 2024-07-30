import { Component, OnInit } from '@angular/core';
import { ListProducts } from '../../interfaces/GetProducts.interface';
import { AdminService } from '../../services/admin-service.service';

@Component({
  selector: 'app-view-stock',
  templateUrl: './view-stock.component.html',
  styleUrl: './view-stock.component.css'
})
export class ViewStockComponent implements OnInit{

  constructor(private adminService:AdminService){}

  public listProducts:ListProducts[] = [];
  public order:string = "asc";

  ngOnInit(): void {
    this.adminService.getAllProducts().subscribe(data => {
      this.listProducts = data;
    }
  );
  }

  orderData(){
    if(this.order === "asc"){
      this.listProducts.sort((a,b) => a.stock - b.stock);
    }else{
      this.listProducts.sort((a,b) => b.stock - a.stock);
    }
  }
}
