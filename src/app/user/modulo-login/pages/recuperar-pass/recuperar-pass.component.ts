import { Component } from '@angular/core';
import { Email, User } from '../../interfaces/SendUser.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MLoginService } from '../../services/m-login.service';
import { DataForm } from '../../interfaces/FormData.interface';

@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.component.html',
  styleUrl: './recuperar-pass.component.css'
})
export class RecuperarPassComponent {
  constructor(private fb:FormBuilder,private router:Router, private loginService:MLoginService){}

  //variable que controla la visualizacion del primer formulario si esta en false el formulario se mostrara de lo contrario se ocultara
  validStatus:boolean = false;
  user!:User;
  newPassword!:string;
  code!:string;
  validCode:boolean = false;
  validQuestion:boolean = true;
  yaquedo:boolean = true;

  //--------------------Decaracion de todos los formularios-------------------//
 //Formulario donde se ingresa el correo electronico
 formEmail:FormGroup = this.fb.group({
    email:['', [Validators.required, Validators.email]],
  })
  //Formulario donde se ingresa el codigo enviado por correo
  formCode:FormGroup = this.fb.group({
    code:['',[Validators.required, Validators.minLength(10)]],
  })
  //Formulario donde se ingresa la respuesta de la pregunta secreta
  formQuestion:FormGroup = this.fb.group({
    respuesta:['', [Validators.required, Validators.minLength(3)]]
  })
  //-----------------Fin de los formularios---------------------------------//

  //Declaracion de las variables que contienen el label, formcontrol y tipo de dato de los formularios//
  datosFormEmail:DataForm[] = [
    {
      label: "Correo electronico",
      formControlName: "email",
      type:"email",
    }
  ]
  datosFormToken:DataForm[] = [
    {
      label: "Ingrese el codigo enviado a su correo",
      formControlName: "code",
      type:"text",
    }
  ]
  datosFormRes:DataForm[] = [
    {
      label: "Respuesta",
      formControlName: "respuesta",
      type:"text",
    }
  ]
    //funcion que manda a llamar al servicio para hacer la peticion al API y validar que el correo introducido sea correcto
    public getData(){
      if(this.formEmail.invalid)
      {
        this.formEmail.markAllAsTouched();
        return;
      }
      //Se llama al servicio para obter los datos del usuario con el email ingresado
      this.loginService.getUser(this.formEmail.controls['email'].value).subscribe(data =>{
          this.user = data
          if(!this.user) return console.log("No existe")

          if(
              this.formEmail.controls['email'].value === this.user.email
            ){
              const dataSend:Email = {
                to:this.formEmail.controls['email'].value,
              }
              this.loginService.sendCodePassword(dataSend).subscribe( data =>{
                if(data.status === 200){
                  this.validStatus = true;

                  this.code = data.codigo;
                  console.log(this.code)
                }
              })
            }
        })
    }

    validButton():boolean{
      if(this.formEmail.invalid)
        return true
      else
      return false
    }

    validatedCode(){
      if(this.code === this.formCode.controls['code'].value){
        this.validCode = true;
      }
      return
    }

    validButtonCode(){
      if(this.formCode.invalid)
        return true
      else
        return false
    }

    validBtnQuestion(){
      if(this.formQuestion.invalid)return
      if(this.user.answer === this.formQuestion.controls['respuesta'].value){
        this.validQuestion = false;
        this.yaquedo = false
      }
    }
}
