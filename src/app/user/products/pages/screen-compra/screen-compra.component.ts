import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CompraProducto } from '../../interfaces/CompraProduct.iinterface';
import { Product } from '../../interfaces/ProductsCard.interface';
import { Domicilio } from '../../interfaces/Domicilio.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

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
  private jwtHelper = new JwtHelperService();
  idProduct!: string;
  desactiveBtn: boolean = false;
  product: Product = {
    id: 0,
    nombre_producto: "",
    precio: 0,
    descripccion: "",
    stock: 0,
    categoria: "",
    rating: 0,
    descuento: 0,
    status: "",
    imagen: [{
      id: 0,
      url_imagen: ""
    }]
  }
  domicilio: Domicilio = {
    id: 0,
    estado: "",
    municipio: "",
    cp: 0,
    colonia: "",
    referencia: ""
  };
  cantidad: number = 0;
  dataByback: CompraProducto[] = [];
  ngOnInit(): void {
    const user = localStorage.getItem('token');
    const productId = localStorage.getItem('product');
    const cantStorage = localStorage.getItem('cantidad');

    if (user === null)
      this.router.navigate(['404'])
    if (productId === null)
      this.router.navigate(['404'])

    this.idProduct = this.routerLink.snapshot.paramMap.get('id')!;
    if (productId !== this.idProduct)
      this.router.navigate(['404'])

    this.productService.getProductById(this.idProduct).subscribe(data => {
      this.product = data;
    })
    if (user !== null){
      const token = this.jwtHelper.decodeToken(user)
      this.productService.getUbicacion(token.sub).subscribe(data => {
        this.domicilio = data;
      })}
    if (cantStorage !== null) {
      this.cantidad = parseInt(cantStorage)
    }

  }
  compraProducto() {
    this.desactiveBtn = true;
    if (this.idProduct === '') this.router.navigate(['/404'])
    if (this.idProduct !== null) {
      const idUser = localStorage.getItem('token');
      const cantidad = localStorage.getItem('cantidad');
      if (idUser !== null && cantidad !== null) {
        const token = this.jwtHelper.decodeToken(idUser)
        const data: CompraProducto = {
          id: this.product.id,
          title: this.product.nombre_producto,
          precio: this.calDesByBack(this.product.precio, this.product.descuento),
          idUser: token.sub,
          cantidad: cantidad,
          idCard: 'null'
        }
        this.dataByback.push(data);
        this.productService.comprarProduct(this.dataByback).subscribe(data => {
          localStorage.removeItem('product');
          localStorage.removeItem('cantidad');
          this.idProduct = '';
          window.location.href = data.url;
        })
      }
    }
  }

  cancellCompra() {
    localStorage.removeItem('product');
    localStorage.removeItem('cantidad');
    this.router.navigate(['/view', this.idProduct])
  }

  calDes(precio: number, descuento: number) {
    let total: number = precio * this.cantidad;
    let desc = (precio * descuento / 100) * this.cantidad;
    return Math.floor(total - desc);
  }
  calDesByBack(precio: number, descuento: number) {
    let desc = precio - (precio * descuento / 100);
    return Math.floor(desc);
  }
}
