import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin-service.service';
import { Data } from '../../interfaces/DataSet.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-promociones-user',
  templateUrl: './promociones-user.component.html',
  styleUrl: './promociones-user.component.css'
})
export class PromocionesUserComponent implements OnInit{
  constructor(private adminService:AdminService, private messageService:MessageService) { }
  public users:Data[] = [];
  public ids:number[] = [];
  ngOnInit(): void {
    this.adminService.getUsers().subscribe(data => {
      this.ids = data.idUsers;
      this.adminService.getUserData(data.idUsers).subscribe(data =>{
        this.users = data.data;
      })
    });
  }
  sendEmail(){
    this.adminService.sendEmails(this.ids).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Enviado!', detail: 'Correo electrónico enviado con éxito' });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al enviar el correo electrónico' });
    });
  }
}
