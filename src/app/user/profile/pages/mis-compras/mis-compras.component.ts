import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ResVentas, ResVentasDetallesVenta } from '../../interfaces/ResProfile.interface';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styleUrl: './mis-compras.component.css'
})
export class MisComprasComponent implements OnInit {
  constructor(
    private profileService: ProfileService,
    private messageService:MessageService,
    private router: Router,
  ) { }
  isLoader: boolean = true;
  filterVenta: ResVentasDetallesVenta[] = [];
  dataBackup: ResVentasDetallesVenta[] = [];
  public type: string = 'all';

  ngOnInit(): void {
    const idUser = localStorage.getItem('token');
    if (idUser !== null)
      this.profileService.getVentas(parseInt(idUser)).subscribe(data => {
        this.dataBackup = data.detallesVenta;
        this.filterVenta = data.detallesVenta;
        setTimeout(() => {
          this.isLoader = false;
        }, 500);
      });
    else
      this.router.navigate(['/login']);
  }

  filterData() {
    if (this.type === 'all') {
      this.filterVenta = this.dataBackup
    }
    else {
      this.filterVenta = this.dataBackup.filter(item => item.estado === this.type);
    }
  }
  alertRating(value:boolean){
    console.log(value);
    if(!value)
      this.messageService.add({
      severity:'warn',
      summary: 'Calificación',
      detail: 'Debes seleccionar una puntuacion y dejar una opinion'})
    else{
      this.messageService.add({
        severity:'success',
        summary: 'Calificación',
        detail: 'Gracias por calificar'})
    }
  }
  canceledVenta(id:number){
    this.profileService.canceledVenta(id).subscribe(data =>{
      console.log(data)
      if(data.status === 200){
        this.messageService.add({
          severity:'success',
          summary: 'Cancelación',
          detail: 'La venta fue cancelada correctamente'})
        this.filterData();
      }else{
        this.messageService.add({
          severity:'error',
          summary: 'Cancelación',
          detail: 'Hubo un error al cancelar la venta'})
      }
    })
    window.location.reload();
  }
}
