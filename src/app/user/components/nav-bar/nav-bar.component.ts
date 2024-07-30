import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MLoginService } from '../../modulo-login/services/m-login.service';
import { ProductsService } from '../../products/services/products.service';
import { AdminService } from '../../../admin/services/admin-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {

  constructor(
    private messageService: MessageService,
    private router: Router,
    private loginService: MLoginService,
    private producstService: ProductsService,
    private adminService:AdminService,
  ) { }

  touchMale: boolean = false;
  touchFemale: boolean = false;
  visible: boolean = false;
  routerUser: string = "login";
  numCard: number = 0;
  isOpen:boolean = false;

  ngOnInit(): void {


    // this.adminService.onMessage('msg').subscribe(message =>{
    //   console.log(message);
    // })


    const userId = localStorage.getItem('token');
    if (userId !== null) {
      this.routerUser = "profile/" + userId;
      this.producstService.getProductByCard({ id: parseInt(userId) }).subscribe(data => {
        this.numCard = data.detallesCarrito.length
      })
    }
  }
  isClass(){
    this.isOpen =! this.isOpen
  }
  closeSesion() {
    this.onConfirm()
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.routerUser = "login";
  }
  showConfirm() {
    if (!this.visible) {
      this.messageService.add(
        {
          key: 'confirm', sticky: true, severity: 'warn', summary: '¿Estas seguro que deseas cerrar sesion?'
        });
      this.visible = true;
    }
  }
  onConfirm() {
    this.messageService.clear('confirm');
    this.visible = false;
  }

  onReject() {
    this.messageService.clear('confirm');
    this.visible = false;
  }
  isLogin(): boolean {
    return this.loginService.checkLogin();
  }

  // sendMessage() {
  //   this.adminService.sendMessage('chat-message', { text: 'Hello Socket.IO!' });
  // }




}
