import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { AdminService } from '../../services/admin-service.service';

interface Grafica {
  data:number[]
}
@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrl: './graficas.component.css',
})
export class GraficasComponent implements OnInit{
  constructor(private adminService:AdminService) {}

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [
    ['Muy satisfecho'],
    ['Satisfecho'],
    ['Neutral'],
    ['Insatisfecho'],
    ['Muy insatisfecho'],
  ];
  public expCompra:Grafica[] = [{
    data:[]
  }
  ];
  public detalles:Grafica[] = [];
  public satOptimizacion:Grafica[] = [];
  ngOnInit(): void {
    this.getRating();
  }

  private getRating(){
    return this.adminService.getRating().subscribe(res => {
      this.expCompra[0].data = res.data.cantidadExp;
      console.log(this.expCompra)
    })
  }

}
