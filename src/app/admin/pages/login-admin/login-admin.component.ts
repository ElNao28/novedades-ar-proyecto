import { Component } from '@angular/core';
import { AdminService } from '../../services/admin-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {
  constructor(
    private adminService:AdminService,
    private fb:FormBuilder,
    private router:Router,
    private messageService:MessageService
  ){}
  formLogin:FormGroup = this.fb.group({
    email:['',[Validators.required]],
    password:['',[Validators.required]],
  });

  loginAdmin(){
    console.log(this.formLogin.value)
    if(this.formLogin.invalid)return this.messageService.add({
      severity:'error',
      summary:'Error',
      detail:'Todos los campos son obligatorios'
    });
    this.adminService.loginAdmin(this.formLogin.value).subscribe(res=>{
      if(res.status === 200){
        localStorage.setItem('tokenAdmin',res.data.id.toString());
        this.router.navigate(['/admin/home']);
      }else{
        this.messageService.add({
          severity:'error',
          summary:'Error',
          detail:'Usuario o contraseña incorrectos'
        });
      }
    });
  }
}
