import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ProducsToCard } from '../../interfaces/ProductsCard.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{
  constructor(private producsService:ProductsService){}
  productsCard:ProducsToCard[] = [{
    id: 0,
    nombre_producto: '',
    precio: 0,
    cantidad: 0,
    img: '',
    usuarioId: 0,
  }];
  ngOnInit(): void {
    const idUser = localStorage.getItem('token')
    this.producsService.getProductByCard(idUser).subscribe(data => this.productsCard = data)
  }
}
