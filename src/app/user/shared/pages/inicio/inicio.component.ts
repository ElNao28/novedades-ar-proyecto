import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  login: MenuItem[] = [
    {
      label: 'Iniciar sesión',
      icon: 'pi pi-sign-in',
      routerLink: '/user/login'
    },
    {
      label: 'Crear cuenta',
      icon: 'pi pi-user-plus',
      routerLink: '/user/crear-cuenta'

    },
    {
      label: 'Ver perfil',
      icon: 'pi pi-eye',
    },
  ];
}
