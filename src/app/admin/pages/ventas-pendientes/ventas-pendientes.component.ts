import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin-service.service';
import { VentasPendient } from '../../interfaces/GetVentasPendientes.interface';

@Component({
  selector: 'app-ventas-pendientes',
  templateUrl: './ventas-pendientes.component.html',
  styleUrl: './ventas-pendientes.component.css'
})
export class VentasPendientesComponent implements OnInit{
  constructor(private adminService:AdminService) { }
  public ventas:VentasPendient[] = []
  ngOnInit(): void {
    this.adminService.getVentasPendientes('proceso').subscribe(data =>{
      this.ventas = data.data;
    })
  }

}
