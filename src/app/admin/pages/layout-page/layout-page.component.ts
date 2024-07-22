import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {
  constructor(
    private confirmationService:ConfirmationService,
    private router:Router,
  ) { }
  public showNosotrosList: boolean = false;
  public showProductosList: boolean = false;
  public showVentassList: boolean = false;

  closeSesion(){
    this.confirmationService.confirm({
      message: '¿Estás seguro de cerrar sesión?',
      header: 'Cerrar Sesión',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass:'p-button-text',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        localStorage.removeItem('tokenAdmin');
        this.router.navigate(['/admin/login-admin']);
      },
      reject: () => {
      }
    })
  }

}
