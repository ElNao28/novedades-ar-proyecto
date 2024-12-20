import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataForm } from '../../interfaces/FormData.interface';
import { MLoginService } from '../../services/m-login.service';
import { MessageService } from 'primeng/api';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent implements OnInit{

  //Constructor en el cual se inyectan modulos o servicios que se ocuparan en el componente
  constructor(
    private fb:FormBuilder,
    private router:Router,
    private loginService:MLoginService,
    private messageService:MessageService,
    ){}
  fecha = new Date().toLocaleDateString();
  isLoader:boolean = true;
  private jwtHelper = new JwtHelperService();

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoader = false;
    }, 500);
  }
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
      styles:'login'
    },
  ]
  estilos:string = "w-full"
  //variable que contiene la exprecion regular para validar el correo electronico
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  //variable que contiene la clave para que el REcapcha funcione
  key:string="6Le_PFspAAAAANjtS-GYPRh8xjiU46szehJjNz3u";
  keyProd:string="6Le_PFspAAAAAFjAJ6f-wHhiaqlLLnstow9Bup-Z";
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
    this.loginService.getIp().subscribe(data =>{
        this.loginService.validUser({
          email: this.myForm.controls['email'].value,
          password: this.myForm.controls['password'].value,
          ip:data.ip,
          fecha:this.fecha
        }).subscribe(res=>{
          if(res.status === 200)
          {

            localStorage.setItem('token', res.token);

            const dataToken = this.jwtHelper.decodeToken(res.token);
            console.log(dataToken);

            this.alerts(
              'success',
              'Exito',
              'Login correcto "Bienvenido"'
            )
            setTimeout(() =>{
              window.location.href = 'https://novedades-ar-proyecto.vercel.app/'
            },1000)
          }
          else if(res.status === 400 || res.status === 302){
            this.alerts(
              'warn',
              'Error al iniciar sesion',
              'Los datos ingresados son incorrectos'
            )

          }
          else if(res.status === 409){
            this.alerts(
              'error',
              'Parece que hubo un error',
              'Numero de intentos alcanzado'
            )
          }
        });
    });

  }
  //Funcion que controla el estado del boton de iniciar sesion(si re recpcha es resulto el boton se activa)
  handleSuccess(response:any): void {
    // Este método se ejecutará cuando reCAPTCHA se resuelva con éxito
    this.validButton = false; // Habilitar el botón una vez que reCAPTCHA se haya resuelto
  }
  alerts(tipo:string,encabezado:string,mensaje:string):void {
    this.messageService.add({ severity: tipo, summary: encabezado, detail: mensaje });
}
}
