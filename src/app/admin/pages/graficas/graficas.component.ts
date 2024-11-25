import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { AdminService } from '../../services/admin-service.service';

interface Grafica {
  data: number[];
}
@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrl: './graficas.component.css',
})
export class GraficasComponent implements OnInit {
  constructor(private adminService: AdminService) {}

  public pieChartLabels = [
    ['Nada satisfecho'],
    ['Poco satisfecho'],
    ['Neutral'],
    ['Satisfecho'],
    ['Muy satisfecho'],
  ];
  public expCompra: Grafica[] = [];
  public detalles: Grafica[] = [];
  public satOptimizacion: Grafica[] = [];
  public totalEnc:number = 0;
  ngOnInit(): void {
    this.getRating();
  }
  private getRating() {
    this.adminService.getRating().subscribe(res => {
      res.data.cantidadDetall.map(data => {
        this.totalEnc += data
      });
      const exp = [
        {
          data:res.data.cantidadExp
        }
      ]
      const detail = [
        {
          data:res.data.cantidadDetall
        }
      ]
      const opt = [
        {
          data:res.data.cantidadOpt
        }
      ]
      this.expCompra = exp;
      this.detalles = detail;
      this.satOptimizacion = opt;
    })
  }
}
