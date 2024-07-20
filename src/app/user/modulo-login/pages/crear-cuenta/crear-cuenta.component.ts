import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MLoginService } from '../../services/m-login.service';
import { ColoniaData, CpData, EstadoData, MunicipioData } from '../../interfaces/ApiCopo.interface';
import { User } from '../../interfaces/SendUser.interface';
import { DataForm } from '../../interfaces/FormData.interface';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrl: './crear-cuenta.component.css'
})
export class CrearCuentaComponent {

  constructor(
    private fb:FormBuilder,
    private loginService:MLoginService,
    private router:Router,
    private messageService:MessageService
    ){}

  validButton:boolean = true;
  formValue:boolean = true;
  key:string="6Le_PFspAAAAANjtS-GYPRh8xjiU46szehJjNz3u";
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  newUser:User[] = [];

  datosForm:DataForm[] = [
    {
      label: "Nombre",
      formControlName: "name",
      type:"text",
    },
    {
      label: "Primer apellido",
      formControlName: "lastname",
      type:"text",
    },
    {
      label: "Segundo apellido",
      formControlName: "motherLastname",
      type:"text",
    },
    {
      label: "Genero",
      formControlName: "gender",
      type:"select",
      typeSelect:[
        {
          option:"M"
        },
        {
          option:"F"
        }
    ]
    },
    {
      label: "Fecha de nacimiento",
      formControlName: "birthdate",
      type:"date",
    }
  ]
  datosFormDos:DataForm[] = [
    {
      label: "Correo electronico",
      formControlName: "email",
      type:"email",
    },
    {
      label: "Numero de telefono",
      formControlName: "cellphone",
      type:"number",
    },
    {
      label: "Contraseña",
      formControlName: "password",
      type:"password",
    },
    {
      label: "Repita la contraseña",
      formControlName: "password2",
      type:"password",
    },
    {
      label: "Pregunta",
      formControlName: "question",
      type:"select",
      typeSelect:[
        {
          option:"¿Nombre de su perro?",
          value:1
        },
        {
          option:"¿Comida favortita?",
          value:2
        },
        {
          option:"¿Pelicula favorita?",
          value:3
        },
        {
          option:"¿Color favorito?",
          value:4
        }
      ]
    },
    {
      label: "Respuesta",
      formControlName: "answer",
      type:"text",
    }
  ]
  myForm:FormGroup = this.fb.group({
    name:['', [Validators.required, Validators.minLength(3)]],
    lastname:['', [Validators.required, Validators.minLength(3)]],
    motherLastname:['', [Validators.required, Validators.minLength(3)]],
    gender:['',[Validators.required]],
    birthdate: ['', [Validators.required, this.validateAge.bind(this)]],
    question:['',[Validators.required]],
    answer:['', [Validators.required, Validators.minLength(3)]],
    email:['', [Validators.required, Validators.pattern(this.emailPattern)]],
    cellphone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    password:['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/)]],
    password2: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/)],],
  }, {
    validators: [
      this.isFieldOneEqualFieldTwo('password','password2')
    ]
  })

  //Funcion que toma los datos del formulario y los envia mediante el metodo post al back para su registro
  createNewUser(){
    if(this.myForm.valid){
      let formData = this.myForm.value;
      formData = {
        name: formData.name.toLowerCase(),
        lastname: formData.lastname.toLowerCase(),
        motherLastname: formData.motherLastname.toLowerCase(),
        gender: formData.gender.toUpperCase(),
        birthdate: formData.birthdate.toLowerCase(),
        email: formData.email.toLowerCase(),
        cellphone: formData.cellphone,
        password: formData.password,
        question: formData.question,
        answer: formData.answer,
      }
      try {
       this.loginService.createUser(formData).subscribe(data =>{
         if(data.status === 409){
           this.messageService.add({
             severity: 'error',
             summary: 'Error',
             detail: 'Ya existe un usuario con ese correo electronico o numero de telefono'
           });
         }
         else if(data.status === 202){
           this.messageService.add({
             severity:'success',
             summary: 'Exito',
             detail: 'Usuario creado correctamente'
           });
           setTimeout(() => {
             this.router.navigate(['/inicio']);
           }, 1000);
         }
       })
      } catch (error) {
       console.log(error)
      }
    }
  }

  //Funcion que valida si la edad ingresada es mayor o igual a 18
  validateAge(control: AbstractControl): ValidationErrors | null {
    const birthdate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();

    return age >= 18 ? null : { underage: true };
  }
  //Funcion que valida que las 2 contraseñas ingresadas sean validas
  isFieldOneEqualFieldTwo( field1: string, field2: string ) {

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
  //Funcion que cambia el estado de las variables que controla que botones se muestran en el formulario
  formValueChangue(){
    if(this.formValue === true)
    this.formValue = false;
    else
    this.formValue = true;
    this.validButton = true
  }
  //Funcion que cambia el estado de la variable para mostrar la ya sea la primera o segunda seccion del fornulario
  validBtn():boolean{
    if(
    !this.myForm.controls['name'].invalid &&
    !this.myForm.controls['lastname'].invalid &&
    !this.myForm.controls['motherLastname'].invalid &&
    !this.myForm.controls['gender'].invalid &&
    !this.myForm.controls['birthdate'].invalid)
    return false

    return true;
  }
  //Funcion que cambia el estado de la variable que controla el boton de crear cuenta, cambia cuando el recapcha es resuelto
  handleSuccess(response:any): void {
    // Este método se ejecutará cuando reCAPTCHA se resuelva con éxito
    this.validButton = false; // Habilitar el botón una vez que reCAPTCHA se haya resuelto
  }
  //Funcion que cambia el estado de la variable que controla el boton de crear cuenta, cambia cuando el recapcha a expirado
  handleexpired(response:any): void {
    this.validButton = true;
  }
  //Funcion que cambia el estado de la variable que controla el boton de crear cuenta, cambia cuando el recapcha es reiniciado
  handlereset(response:string): void {
    this.validButton = true;
  }
  //Funcion que cambia el estado del boton de crear cuenta si se cumplen las sentencias dictadas
  validCreateButton(){
    if(this.myForm.invalid === false && this.validButton === false){
      return false
    }
    else{
      return true
    }
  }

}
