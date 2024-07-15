import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../interfaces/ProductsCard.interface';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrl: './products-filter.component.css'
})
export class ProductsFilterComponent implements OnInit,OnChanges{
  gender!:string;
  tipo!:string;
  products!:Product[];
  isLoader: boolean = true;
  constructor(
    private activate:ActivatedRoute,
    private productsService:ProductsService,
    private router:Router
  ){}
  ngOnChanges(changes: SimpleChanges): void {
    console.log("cambios")
  }
  ngOnInit(): void {
    console.log("entrs")
    this.activate.params.subscribe(params => {
      this.gender = params['gender'];
      this.tipo = params['category'];
      this.productsService.getProductsByGender(this.gender, this.tipo).subscribe(data => {
        this.products = data;
        console.log(this.products);
        setTimeout(() => {
          this.isLoader = false
        }, 500);
      });
    });
  }

}
