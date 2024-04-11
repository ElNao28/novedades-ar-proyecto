import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.css'
})
export class CalculadoraComponent {
  constructor(private fb: FormBuilder) { }

  isSave: boolean = false;
  isSelect: boolean = false;
  tipo: boolean = true;
  horasNecesarias: number = 0;
  visitas: number = 0;
  p: number = 0;
  c: number = 0;
  k: number = 0;

  public formData: FormGroup = this.fb.group({
    vistas_primera: ['', [Validators.required]],
    visitas_segunda: ['', [Validators.required]],
    horas_segunda: ['', [Validators.required]],
  });

  public form: FormGroup = this.fb.group({
    visitas_alcanzar: ['', [Validators.required]],
  });
  public formvistas: FormGroup = this.fb.group({
    horas_alcanzar: ['', [Validators.required]],
  });

  public calcularHoras() {
    this.p = this.form.controls['visitas_alcanzar'].value;
    this.horasNecesarias = Math.log(this.p / this.c) / this.k;
    this.horasNecesarias = Math.round(this.horasNecesarias);
    this.crearGraficaHoras();
  }
  public calcularVisitas() {
    this.visitas = Math.round(this.visitas);
    const c =  this.formData.controls['vistas_primera'].value;
    const t = this.formvistas.controls['horas_alcanzar'].value;

    this.visitas = c * Math.exp(this.k * t);
    this.visitas = Math.round(this.visitas);
    this.crearGraficaVisitas();
  }
  public isSelectType(option: number) {
    this.isSelect = !this.isSelect;
    switch (option) {
      case 1:
        this.tipo = true;
        break;
      case 2:
        this.tipo = false;
        break;
    }
  }
  public changeType() {
    this.isSelect = !this.isSelect;
  }
  public calcularK() {
    if (this.formData.invalid) return
    this.k = Math.log(this.formData.controls['visitas_segunda'].value / this.formData.controls['vistas_primera'].value) / this.formData.controls['horas_segunda'].value;
    this.c = this.formData.controls['vistas_primera'].value;
    this.isSave = !this.isSave;
    console.log("El valor de k es:", this.k);
  }
  changeSave() {
    this.isSave = !this.isSave;
  }
  limpiarTabla() {
    this.formData.patchValue({
      vistas_primera: '',
      visitas_segunda: '',
      horas_segunda: '',
    })
  }




  public chart! : Chart;

  crearGraficaHoras(){
    let datos = ['1hra',this.formData.controls['horas_segunda'].value+'hra',this.horasNecesarias+'horas'];
    let vistas = [this.formData.controls['vistas_primera'].value,this.formData.controls['visitas_segunda'].value,this.p]
    const data = {
      labels: datos,
      datasets: [{
        label: 'Grafica de visitas',
        data: vistas,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };
    // Creamos la gráfica
    this.chart = new Chart("chart", {
      type: 'line' as ChartType, // tipo de la gráfica
      data: data // datos
    });
  }

  public chart2! : Chart;

  crearGraficaVisitas(){
    let datos = ['1hra',this.formData.controls['horas_segunda'].value+'hra',this.formvistas.controls['horas_alcanzar'].value+'hra'];
    let vistas = [this.formData.controls['vistas_primera'].value,this.formData.controls['visitas_segunda'].value,this.visitas]
    const data = {
      labels: datos,
      datasets: [{
        label: 'Grafica de visitas',
        data: vistas,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };
    // Creamos la gráfica
    this.chart2 = new Chart("chart", {
      type: 'line' as ChartType, // tipo de la gráfica
      data: data // datos
    });
  }
}
