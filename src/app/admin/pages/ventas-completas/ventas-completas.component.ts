import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin-service.service';
import { VentasPendient } from '../../interfaces/GetVentasPendientes.interface';

@Component({
  selector: 'app-ventas-completas',
  templateUrl: './ventas-completas.component.html',
  styleUrl: './ventas-completas.component.css'
})
export class VentasCompletasComponent implements OnInit{
  constructor(private adminService: AdminService) { }
  public ventas: VentasPendient[] = [];
  public order: string = 'asc';

  ngOnInit(): void {
    this.adminService.getVentasPendientes('completo').subscribe(data => {
      this.ventas = data.data;
    })
  }
  orderVentas() {
    this.ventas.sort((a, b) => {
      const fechaVentaA = new Date(a.fecha_venta);
      const fechaVentaB = new Date(b.fecha_venta);
      if (this.order === 'asc') {
        return fechaVentaA.getTime() - fechaVentaB.getTime();
      } else {
        return fechaVentaB.getTime() - fechaVentaA.getTime();
      }
    });
  }
}
