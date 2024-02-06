import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { DataForm } from '../../interfaces/FormData.interface';
import { MLoginService } from '../../services/m-login.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {

  //Constructor en el cual se inyectan modulos o servicios que se ocuparan en el componente
  constructor(private fb:FormBuilder, private router:Router, private loginService:MLoginService){}

  //Variable que contiene los campos que tendra el formulario y que se envian al componente "layout-form"
  datosForm:DataForm[] = [
    {
      label: "Ingresa tu correo electronico",
      formControlName: "email",
      type:"email",
    },
    {
      label: "Ingresa tu contraseña",
      formControlName: "password",
      type:"password",
    },
  ]
  //variable que contiene la exprecion regular para validar el correo electronico
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  //variable que contiene la clave para que el REcapcha funcione
  key:string="6Le_PFspAAAAANjtS-GYPRh8xjiU46szehJjNz3u";
  //variable que manjea el estado en que se encuentra el boton de inciar sesion(activo o desactivado)
  public validButton: boolean = true;
  //variable que contiene los datos con los que cuenta el formulario y que son enviados al componente "layaut-form"
  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required,Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/)]]
  })

  //funcion que mediante una peticion http valida que el usuario exista y si es así redirecciona a la pantalla de inicio
  public getData(){
    //this.limitAtems()
    if(this.myForm.invalid)
    {
      this.myForm.markAllAsTouched();
      return;
    }

    this.loginService.validUser(this.myForm.value).subscribe(res=>{
      console.log(res)
      if(res.status === 200)
        this.router.navigate(['/inicio'])
      else
        return console.log(false, "ola")
    })
  }
  //Funcion que controla el estado del boton de iniciar sesion(si re recpcha es resulto el boton se activa)
  handleSuccess(response:any): void {
    // Este método se ejecutará cuando reCAPTCHA se resuelva con éxito
    this.validButton = false; // Habilitar el botón una vez que reCAPTCHA se haya resuelto
  }


}