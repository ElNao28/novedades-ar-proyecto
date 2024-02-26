import { Component } from '@angular/core';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent {
  imagenes: string[] = [
    'https://www.esdesignbarcelona.com/sites/default/files/imagenes/haz-crecer-tu-marca-de-ropa-frente-la-competencia_1.jpg',
    'https://www.clikisalud.net/wp-content/uploads/2018/07/el-importante-beneficio-de-usar-ropa-holgada.jpg',
    'https://media.gq.com.mx/photos/6398d2adf773a1a8874e3a12/master/pass/mejor-ropa-de-hombre-en-2023.jpg',
  ];
}
