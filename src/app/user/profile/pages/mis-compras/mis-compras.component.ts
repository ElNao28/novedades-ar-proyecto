import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ResVentas } from '../../interfaces/ResProfile.interface';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styleUrl: './mis-compras.component.css'
})
export class MisComprasComponent implements OnInit {
  constructor(private profileService: ProfileService) { }
  isLoader:boolean = true;
  dataVentas: ResVentas = {
    status: 200,
    detallesVenta: [
      {
        id: 59,
        total_venta: 245,
        fecha_venta: "2024-04-05",
        detallesVenta: [
          {
            id: 80,
            cantidad: 1,
            descuento: 0,
            precio: 245,
            sub_total: 0,
            producto: {
              id: 1,
              nombre_producto: "Blusa sin mangas",
              precio: 245,
              descripccion: "Blusa color naranja sin mangas",
              stock: 38,
              categoria: "M",
              rating: 0,
              descuento: 8,
              status: "activo"
            }
          }
        ]
      }]
  }
  ngOnInit(): void {
    const idUser = localStorage.getItem('token');
    if (idUser !== null)
      this.profileService.getVentas(parseInt(idUser)).subscribe(data => {
        this.dataVentas = data;
        setTimeout(() => {
          this.isLoader = false;
        }, 500);
      });
  }

}
