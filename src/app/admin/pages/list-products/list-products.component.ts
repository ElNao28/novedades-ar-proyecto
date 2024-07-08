import { Component, OnInit } from '@angular/core';
import { ListProducts } from '../../interfaces/GetProducts.interface';
import { AdminService } from '../../services/admin-service.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit{
  constructor(private adminService:AdminService) { }
  listProducts:ListProducts[] = [];

  ngOnInit(): void {
    this.adminService.getAllProducts().subscribe(products => {
      console.log(products)
      this.listProducts = products;
    });
  }

}
