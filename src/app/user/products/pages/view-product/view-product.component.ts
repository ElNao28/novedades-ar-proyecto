import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Products } from '../../interfaces/products.interface';
import { SendDataCard } from '../../interfaces/SendDataCard.interface';
import { CompraProducto } from '../../interfaces/CompraProduct.iinterface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent implements OnInit{
  constructor(
    private routerLink:ActivatedRoute,
    private productsService:ProductsService,
    private router:Router,
    private messageService:MessageService,
    ){}
  id!: string;
  product:Products = {
    id:0,
    nombre_producto:"",
    precio:0,
    descripccion:"",
    stock:0,
    imagen:"",
    rating:0,
    descuento:0,
  };
  ngOnInit(): void {
    this.id = this.routerLink.snapshot.paramMap.get('id')!;
    console.log(this.id);
    this.productsService.getProductById(this.id).subscribe(data => this.product = data)
  }
  imagenes: string[] = [
    'https://www.esdesignbarcelona.com/sites/default/files/imagenes/haz-crecer-tu-marca-de-ropa-frente-la-competencia_1.jpg',
    'https://www.clikisalud.net/wp-content/uploads/2018/07/el-importante-beneficio-de-usar-ropa-holgada.jpg',
    'https://media.gq.com.mx/photos/6398d2adf773a1a8874e3a12/master/pass/mejor-ropa-de-hombre-en-2023.jpg',
  ];
  addProductToCard(){
    const idUser = localStorage.getItem('token')
    this.productsService.getProductById(this.id).subscribe(data =>{
      const dataCard:SendDataCard = {
        nombre_producto: data.nombre_producto,
        precio: data.precio,
        cantidad: 1,
        img: data.imagen,
        usuarioId: idUser
      }
      this.productsService.addProductToCard(dataCard).subscribe(data =>{
        if(data.status === 200){
          this.messageService.add({
            severity:'success',
            summary: 'Mensaje',
            detail: 'Producto agregado al carrito'
          })
        }
      })
    })
  }

  comprarProduct(){
    const data:CompraProducto = {
      id:this.product.id,
      title:this.product.nombre_producto,
      precio:this.product.precio
    }
    this.productsService.comprarProduct(data).subscribe(data =>{
      console.log(data);
      window.open(data.url);
    })
  }
}
