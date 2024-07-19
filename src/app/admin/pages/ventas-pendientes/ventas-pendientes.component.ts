import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin-service.service';
import { VentasPendient } from '../../interfaces/GetVentasPendientes.interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DetallesVenta } from '../../interfaces/GetVentasFenvio.interface';

@Component({
  selector: 'app-ventas-pendientes',
  templateUrl: './ventas-pendientes.component.html',
  styleUrl: './ventas-pendientes.component.css'
})
export class VentasPendientesComponent implements OnInit{
  constructor(private adminService:AdminService, private confirmationService:ConfirmationService, private messageService:MessageService) { }
  public ventas:VentasPendient[] = []
  ngOnInit(): void {
    this.adminService.getVentasPendientes('proceso').subscribe(data =>{
      this.ventas = data.data;
    })
  }

  confirm1(idEnvio:number,idVenta:number) {
    this.confirmationService.confirm({
        message: 'Deseas confirmar la entrega?',
        header: 'Confirmacion',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        acceptLabel: 'Si',
        rejectButtonStyleClass:"p-button-text",
        accept:()=>{
          const fecha = new Date().toISOString();
          this.adminService.ventaComplete(idEnvio,fecha,idVenta).subscribe(data =>{
            if(data.status === 200){
              this.messageService.add({severity:'success', summary:'Exito', detail:'La venta ha sido completada'});
              this.ngOnInit();
            }
          })
        }
    });
}


}
