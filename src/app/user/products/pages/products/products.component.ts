import { Component, OnInit } from '@angular/core';
import { Products } from '../../interfaces/products.interface';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  products!: Products[];
  layout: string = 'list';
  isLoader:boolean = true;
  constructor(private productService:ProductsService) {}
  ngOnInit(): void
  {
    this.productService.getProducts().subscribe(data => {
      this.products = data
      setTimeout(() => {
        this.isLoader = false
      }, 500);
    })
  }
  ordenarPorPrecio: string = 'asc'; // Por defecto, ordenar de menor a mayor precio

  // Función para ordenar los productos según el precio
  ordenarProductosPorPrecio(): void {
    if (this.ordenarPorPrecio === 'asc') {
      this.products.sort((a, b) => a.precio - b.precio);
    } else {
      this.products.sort((a, b) => b.precio - a.precio);
    }
  }
}
