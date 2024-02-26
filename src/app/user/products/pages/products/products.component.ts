import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/products.interface';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  products!: Product[];

  constructor(private productService:ProductsService) {}
  ngOnInit(): void
  {
    this.productService.getProducts().subscribe(data => this.products = data)
  }


}
