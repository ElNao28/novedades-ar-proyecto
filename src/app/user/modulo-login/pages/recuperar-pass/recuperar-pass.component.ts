import { Component } from '@angular/core';
import { CheckEmail, Email, User } from '../../interfaces/SendUser.interface';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MLoginService } from '../../services/m-login.service';
import { DataForm } from '../../interfaces/FormData.interface';
import { PasswordSend } from '../../interfaces/ValidUser.intereface';
import { RecoverPassword, SendAnser } from '../../interfaces/RecoverPassword.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.component.html',
  styleUrl: './recuperar-pass.component.css'
})
export class RecuperarPassComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: MLoginService,
    private messageService: MessageService) { }

  //variable que controla la visualizacion del primer formulario si esta en false el formulario se mostrara de lo contrario se ocultara
  validStatus: boolean = false;
  responseVerEmail!: RecoverPassword;
  newPassword!: string;
  code!: string;
  validCode: boolean = false;
  validQuestion: boolean = true;
  caseBtnRec: boolean = true;
  typeRecover: boolean = true;
  typeSelect: boolean = true;
  dataSend!: Email;
  checkEmail!: CheckEmail;
  answerIsValid: boolean = true;
  validAllForms: boolean = false;
  //--------------------Decaracion de todos los formularios-------------------//
  //Formulario donde se ingresa el correo electronico
  formEmail: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  })
  //Formulario donde se ingresa el codigo enviado por correo
  formCode: FormGroup = this.fb.group({
    code: ['', [Validators.required, Validators.minLength(10)]],
  })
  //Formulario donde se ingresa la respuesta de la pregunta
  formQuestion: FormGroup = this.fb.group({
    answer: ['', [Validators.required, Validators.minLength(4)]],
  })
  //Formulario donde se ingresa la nueva contraseña y su respectiva repeticion
  formNewPassword: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/)]],
    confirmPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/)]]
  },
    {
      validators: [
        this.isFieldOneEqualFieldTwo('password', 'confirmPassword')
      ]
    })
  //-----------------Fin de los formularios---------------------------------//

  //Declaracion de las variables que contienen el label, formcontrol y tipo de dato de los formularios//
  datosFormEmail: DataForm[] = [
    {
      label: "Correo electronico",
      formControlName: "email",
      type: "email",
    }
  ]
  datosFormToken: DataForm[] = [
    {
      label: "Ingrese el codigo enviado a su correo",
      formControlName: "code",
      type: "text",
    }
  ]
  datosFormQuestion: DataForm[] = [
    {
      label: "pregunta",
      formControlName: "answer",
      type: "text",
    }
  ]
  datosFormRes: DataForm[] = [
    {
      label: "Respuesta",
      formControlName: "respuesta",
      type: "text",
    }
  ]
  datosFormPassword: DataForm[] = [
    {
      label: "Contraseña",
      formControlName: "password",
      type: "password",
    },
    {
      label: "Repita la contraseña",
      formControlName: "confirmPassword",
      type: "password",
    }
  ]
  styles: string = "w-full"
  //funcion que manda a llamar al servicio para hacer la peticion al API y validar que el correo introducido sea correcto
  public verifEmail() {
    if (this.formEmail.invalid) {
      this.formEmail.markAllAsTouched();
      return;
    }
    this.caseBtnRec = false;
    //Se llama al servicio para obter los datos del usuario con el email ingresado
    this.checkEmail = {
      email: this.formEmail.controls['email'].value
    }
    this.loginService.verifEmail(this.checkEmail).subscribe(data => {
      this.responseVerEmail = data;
      console.log(data)
      if (this.responseVerEmail.status === 404) {
        this.caseBtnRec = true
        return this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No existe el correo'
        })
      }

      if (data.status === 202) {
        this.validStatus = true;
      }

    })
  }

  chageValueBtnTypeRecover(value: number) {
    switch (value) {
      case 1:
        this.typeRecover = false;
        this.typeSelect = true;
        this.messageService.add({
          severity: 'success',
          summary: 'Exito',
          detail: 'Se a enviado un codigo a su correo'
        })
        this.dataSend =
        {
          to: this.formEmail.controls['email'].value,
        }
        this.loginService.sendCodePassword(this.dataSend).subscribe(data => {
          if (data.status === 200) {
            this.code = data.codigo;
            console.log(this.code)
          }
        })
        break;
      case 2:
        const email = this.formEmail.controls['email'].value;
        this.loginService.getQuestion(email).subscribe(data => {
          if (data.status === 200) {
            this.dataSend =
            {
              to: this.formEmail.controls['email'].value,
            }
            switch (data.response) {
              case 'mascota':
                this.datosFormQuestion[0].label = '¿Cual es el nombre de tu perro?';
                break;
              case 'comida':
                this.datosFormQuestion[0].label = '¿Cual es tu comida favorita?';
                break
              case 'pelicula':
                this.datosFormQuestion[0].label = '¿Cual es tu pelicula favorita?';
                break;
              case 'color':
                this.datosFormQuestion[0].label = '¿Cual es tu color favorito?';
                break;
            }
          }
        });

        this.typeRecover = false;
        this.typeSelect = false;
        break;
    }
  }

  verificAnswer() {
    if (this.formQuestion.invalid) return
    let sendAnswer: SendAnser = {
      email: this.formEmail.controls['email'].value,
      anwer: this.formQuestion.controls['answer'].value
    }
    this.loginService.patito(sendAnswer).subscribe(data => {
      if (data.status === 409) return console.log("respuesta incorrecta")
      this.validAllForms = true;
      this.answerIsValid = false;
    })
  }

  //Funcion para validar que las contraseñas ingresadas en el formulario sean iguales
  public isFieldOneEqualFieldTwo(field1: string, field2: string) {

    return (formGroup: AbstractControl): ValidationErrors | null => {

      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true }
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    }

  }

  validButton(): boolean {
    if (this.formEmail.invalid)
      return true
    else
      return false
  }

  validatedCode() {
    if (this.code === this.formCode.controls['code'].value) {
      this.messageService.add({
        severity: 'success',
        summary: 'Exito',
        detail: 'El codigo ingresado es correcto'
      })
      this.validAllForms = true;
      this.validCode = true;
    }
    return
  }

  validButtonCode() {
    if (this.formCode.invalid)
      return true
    else
      return false
  }

  validUpdate() {
    if (this.formNewPassword.invalid)
      return true
    else
      return false
  }



  updatePassword() {
    let fecha = new Date().toLocaleDateString();
    this.loginService.getIp().subscribe(data => {
      const password: PasswordSend = {
        password: this.formNewPassword.controls['password'].value,
        ip: data.ip,
        fecha: fecha
      }
      this.loginService.updatePassword(this.dataSend.to, password).subscribe(data => {
        if (data.status === 202) {
          this.messageService.add({
            severity: 'success',
            summary: 'Exito',
            detail: 'Contraseña actualizada'
          })
          setTimeout(() => {
            this.router.navigate(['/inicio'])
          }, 1000);

        }
      })
    })

  }
}
