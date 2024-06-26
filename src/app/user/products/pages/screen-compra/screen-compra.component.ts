import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CompraProducto } from '../../interfaces/CompraProduct.iinterface';
import { Product } from '../../interfaces/ProductsCard.interface';
import { Domicilio } from '../../interfaces/Domicilio.interface';

@Component({
  selector: 'app-screen-compra',
  templateUrl: './screen-compra.component.html',
  styleUrl: './screen-compra.component.css'
})
export class ScreenCompraComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private router: Router,
    private routerLink: ActivatedRoute
  ) { }
  idProduct!: string;
  product!: Product;
  domicilio:Domicilio = {
    id: 0,
    estado: "",
    municipio: "",
    cp: 0,
    colonia: "",
    referencia: ""
  };
  cantidad:number = 0;
  dataByback:CompraProducto[] = [];
  ngOnInit(): void {
    const user = localStorage.getItem('token');
    const productId = localStorage.getItem('product');
    const cantStorage = localStorage.getItem('cantidad');

    if (user === null)
      this.router.navigate(['404'])
    if(productId === null)
      this.router.navigate(['404'])

    this.idProduct = this.routerLink.snapshot.paramMap.get('id')!;
    if(productId !== this.idProduct)
      this.router.navigate(['404'])

    this.productService.getProductById(this.idProduct).subscribe(data => {
      this.product = data;
      console.log(this.product)
    })
    if(user !== null)
    this.productService.getUbicacion(user).subscribe(data => {
      this.domicilio = data;
    })
    if(cantStorage!== null){
      this.cantidad = parseInt(cantStorage)
    }

  }
  compraProducto() {
    if(this.idProduct === '') this.router.navigate(['/404'])
    if (this.idProduct !== null) {
      const idUser = localStorage.getItem('token');
      const cantidad = localStorage.getItem('cantidad');
      if (idUser !== null && cantidad !== null) {
        const data: CompraProducto = {
          id: this.product.id,
          title: this.product.nombre_producto,
          precio: this.product.precio,
          idUser: idUser,
          cantidad:cantidad,
          idCard:'null'
        }
        this.dataByback.push(data);
        this.productService.comprarProduct(this.dataByback).subscribe(data => {
          console.log(data);
          window.open(data.url);
          localStorage.removeItem('product');
          localStorage.removeItem('cantidad');
          this.idProduct = '';
        })
      }
    }
  }

  cancellCompra(){
    localStorage.removeItem('product');
    localStorage.removeItem('cantidad');
    this.router.navigate(['/view',this.idProduct])
  }
}
