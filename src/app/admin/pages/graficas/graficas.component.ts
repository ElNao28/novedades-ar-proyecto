import { Component } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrl: './graficas.component.css',
})
export class GraficasComponent {
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
  public pieChartDatasets = [
    {
      data: [300, 500, 100,100,200],
    },
  ];

  constructor() {}
}
