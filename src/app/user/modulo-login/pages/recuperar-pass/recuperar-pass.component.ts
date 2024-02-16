import { Component } from '@angular/core';
import { Email, User } from '../../interfaces/SendUser.interface';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MLoginService } from '../../services/m-login.service';
import { DataForm } from '../../interfaces/FormData.interface';
import { PasswordSend } from '../../interfaces/ValidUser.intereface';
import { RecoverPassword } from '../../interfaces/RecoverPassword.interface';

@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.component.html',
  styleUrl: './recuperar-pass.component.css'
})
export class RecuperarPassComponent {
  constructor(private fb:FormBuilder,private router:Router, private loginService:MLoginService){}

  //variable que controla la visualizacion del primer formulario si esta en false el formulario se mostrara de lo contrario se ocultara
  validStatus:boolean = false;
  responseVerEmail!:RecoverPassword;
  newPassword!:string;
  code!:string;
  validCode:boolean = false;
  validQuestion:boolean = true;
  yaquedo:boolean = true;
  caseBtnRec:boolean = true;
  dataSend!:Email;
  //--------------------Decaracion de todos los formularios-------------------//
 //Formulario donde se ingresa el correo electronico
 formEmail:FormGroup = this.fb.group({
    email:['', [Validators.required, Validators.email]],
  })
  //Formulario donde se ingresa el codigo enviado por correo
  formCode:FormGroup = this.fb.group({
    code:['',[Validators.required, Validators.minLength(10)]],
  })
  //Formulario donde se ingresa la nueva contraseña y su respectiva repeticion
  formNewPassword:FormGroup = this.fb.group({
      password:['',[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/)]],
      confirmPassword:['',[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/)]]
    },
    {
      validators: [
        this.isFieldOneEqualFieldTwo('password','confirmPassword')
      ]
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
  datosFormPassword:DataForm[] = [
    {
      label: "Contraseña",
      formControlName: "password",
      type:"password",
    },
    {
      label: "Repita la contraseña",
      formControlName: "confirmPassword",
      type:"password",
    }
  ]
  styles:string = "w-full"
    //funcion que manda a llamar al servicio para hacer la peticion al API y validar que el correo introducido sea correcto
    public verifEmail(){
      if(this.formEmail.invalid)
      {
        this.formEmail.markAllAsTouched();
        return;
      }
      this.disabledButtonSendCode();
      //Se llama al servicio para obter los datos del usuario con el email ingresado
      this.loginService.verifEmail(this.formEmail.controls['email'].value).subscribe(data =>{
          this.responseVerEmail = data
          if(this.responseVerEmail.status === 404) return console.log("No existe")

            this.dataSend =
            {
              to:this.formEmail.controls['email'].value,
            }
            this.loginService.sendCodePassword(this.dataSend).subscribe( data =>{
              if(data.status === 200){
                this.validStatus = true;
                this.code = data.codigo;
                console.log(this.code)
              }
            })
        })
    }

  //Funcion para validar que las contraseñas ingresadas en el formulario sean iguales
  public isFieldOneEqualFieldTwo( field1: string, field2: string ) {

    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if ( fieldValue1 !== fieldValue2 ) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true }
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    }

  }

    validButton():boolean{
      if(this.formEmail.invalid)
        return true
      else
        return false
    }

    disabledButtonSendCode(){
        this.caseBtnRec = false
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

    validUpdate(){
      if(this.formNewPassword.invalid)
        return true
      else
        return false
    }

     updatePassword(){
       const password:PasswordSend = {
         password: this.formNewPassword.controls['password'].value
       }
       this.loginService.updatePassword(this.dataSend.to,password).subscribe(data =>{
         this.router.navigate(['/user/Inicio'])
       })
     }
}
