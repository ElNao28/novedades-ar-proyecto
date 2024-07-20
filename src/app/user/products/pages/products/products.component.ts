import { Component, OnInit } from '@angular/core';
import { Products } from '../../interfaces/products.interface';
import { ProductsService } from '../../services/products.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  constructor(private productService: ProductsService, private fb: FormBuilder,private messageService:MessageService) { }
  products!: Products[];
  productsFilter!: Products[];
  layout: string = 'list';
  isLoader: boolean = true;
  formFilter: FormGroup = this.fb.group({
    dama: [false],
    caballero: [false],
    pantalon: [false],
    playera: [false],
    blusa: [false],
    falda: [false],
    vestido:[false],
    jean: [false],
    short: [false],
    sudadera: [false],
    camisa: [false],
    polo: [false],
    sueter: [false],
  });
  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
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
  cleanFilters() {
    this.formFilter.reset();
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    })
  }
  filtrarProducts() {
    if(
      !this.formFilter.controls['pantalon'].value &&
      !this.formFilter.controls['playera'].value &&
      !this.formFilter.controls['blusa'].value &&
      !this.formFilter.controls['falda'].value &&
      !this.formFilter.controls['caballero'].value &&
      !this.formFilter.controls['dama'].value &&
      !this.formFilter.controls['vestido'].value &&
      !this.formFilter.controls['jean'].value &&
      !this.formFilter.controls['short'].value &&
      !this.formFilter.controls['sudadera'].value &&
      !this.formFilter.controls['camisa'].value &&
      !this.formFilter.controls['polo'].value &&
      !this.formFilter.controls['sueter'].value
    )return this.messageService.add({
      severity: 'info',
      summary: 'Filtrado',
      detail: 'No se han seleccionado ningún filtro'
    })
    if(
      !this.formFilter.controls['pantalon'].value &&
      !this.formFilter.controls['playera'].value &&
      !this.formFilter.controls['blusa'].value &&
      !this.formFilter.controls['falda'].value &&
      !this.formFilter.controls['vestido'].value &&
      !this.formFilter.controls['jean'].value &&
      !this.formFilter.controls['short'].value &&
      !this.formFilter.controls['sudadera'].value &&
      !this.formFilter.controls['camisa'].value &&
      !this.formFilter.controls['polo'].value &&
      !this.formFilter.controls['sueter'].value
    )return this.messageService.add({
      severity: 'info',
      summary: 'Filtrado',
      detail: 'Debe seleccionar al menos un tipo'
    })
    let filter = [
      this.formFilter.controls['pantalon'].value ? 'Pantalon' : '',
      this.formFilter.controls['playera'].value ? 'Playera' : '',
      this.formFilter.controls['blusa'].value ? 'Blusa' : '',
      this.formFilter.controls['falda'].value ? 'Falda' : '',
      this.formFilter.controls['vestido'].value ? 'Vestido' : '',
      this.formFilter.controls['jean'].value ? 'Jean' : '',
      this.formFilter.controls['short'].value ? 'Short' : '',
      this.formFilter.controls['sudadera'].value ? 'Sudadera' : '',
      this.formFilter.controls['camisa'].value ? 'Camisa' : '',
      this.formFilter.controls['polo'].value ? 'Polo' : '',
      this.formFilter.controls['sueter'].value ? 'Sueter' : '',
    ]
    let dataSend = {
      dama: this.formFilter.controls['dama'].value,
      caballero: this.formFilter.controls['caballero'].value,
      datos: filter
    }
    this.productService.getProductsByFilter(dataSend).subscribe(data => {
      this.products = [];
      this.products = data
      console.log(this.products)
    })
  }
}
