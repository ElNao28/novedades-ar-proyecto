import { Component } from '@angular/core';
import { MLoginService } from '../../modulo-login/services/m-login.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {
  constructor(private loginService:MLoginService){}

  isLogin():boolean{
    return this.loginService.checkLogin();
  }
  closeSesion(){
    localStorage.removeItem('token')
  }

}
