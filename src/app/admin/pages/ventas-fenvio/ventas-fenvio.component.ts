import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin-service.service';
import { VentasFenvi } from '../../interfaces/GetVentasFenvio.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-ventas-fenvio',
  templateUrl: './ventas-fenvio.component.html',
  styleUrl: './ventas-fenvio.component.css'
})
export class VentasFenvioComponent implements OnInit {
  constructor(
    private adminService: AdminService,
  ) { }
  public ventas: VentasFenvi[] = [];

  ngOnInit(): void {
    this.adminService.getVentasFenvio('Fenvio').subscribe(ventas => {
      this.ventas = ventas.data;
    });
  }
  updateVentas(ventas:VentasFenvi[]){
    this.ventas = ventas;
  }
}
