import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MLoginService } from '../../services/m-login.service';
import { ColoniaData, CpData, EstadoData, MunicipioData } from '../../interfaces/ApiCopo.interface';
import { User } from '../../interfaces/SendUser.interface';
import { DataForm } from '../../interfaces/FormData.interface';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrl: './crear-cuenta.component.css'
})
export class CrearCuentaComponent {

  constructor(private fb:FormBuilder, private loginService:MLoginService){}

  validButton:boolean = true;
  formValue:boolean = true;
  key:string="6Le_PFspAAAAANjtS-GYPRh8xjiU46szehJjNz3u";
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  newUser:User[] = [];

  /*Inicializacion de las variables que contienen los estados, municipios, codigo postal y colonias traidas del api de copomex*/
  estados:EstadoData = {
  error: false,
  code_error: 0,
  error_message: null,
  response: {
      estado: "",
  }};
  municipios:MunicipioData = {
    error: false,
    code_error: 0,
    error_message: null,
    response: {
        municipios: "",
    }};
  cp:CpData = {
    error: false,
    code_error: 0,
    error_message: null,
    response: {
        cp: "",
    }};
  colonias:ColoniaData = {
    error: false,
    code_error: 0,
    error_message: null,
    response: {
        colonia: "",
    }};
  /*-----------------------Fin de las varibles relacionadas con la api de copomex--------------------------------*/

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
          option:"Masculino"
        },
        {
          option:"Femenino"
        }
    ]
    },
    {
      label: "Fecha de nacimiento",
      formControlName: "birthdate",
      type:"date",
    },
    {
      label: "Estado",
      formControlName: "estado",
      type:"select",
    },
    {
      label: "Municipio",
      formControlName: "municipio",
      type:"select",
    },
    {
      label: "Codigo postal",
      formControlName: "cp",
      type:"text",
    },
    {
      label: "Colonia",
      formControlName: "colonia",
      type:"select",
    },
    {
      label: "Calle",
      formControlName: "calle",
      type:"text",
    },
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
      label: "Eliga regunta secreta",
      formControlName: "question",
      type:"select",
      typeSelect:[
        {
          option:"¿Nombre de mascota?"
        },
        {
          option:"¿Color favorito?"
        },
        {
          option:"¿Pelicula favorita?"
        },
        {
          option:"¿Comida favorita?"
        }
      ]
    },
    {
      label: "Respuesta",
      formControlName: "answer",
      type:"text",
    },
  ]
  myForm:FormGroup = this.fb.group({
    name:['', [Validators.required, Validators.minLength(3)]],
    lastname:['', [Validators.required, Validators.minLength(3)]],
    motherLastname:['', [Validators.required, Validators.minLength(3)]],
    gender:['',[Validators.required]],
    birthdate: ['', [Validators.required, this.validateAge.bind(this)]],
    estado:['',[Validators.required]],
    municipio:['',[Validators.required]],
    cp:['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
    colonia:['',[Validators.required]],
    calle:['', [Validators.required, Validators.minLength(5)]],
    email:['', [Validators.required, Validators.pattern(this.emailPattern)]],
    cellphone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    password:['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/)]],
    password2: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/)],],
    question:['',[Validators.required]],
    answer:['', [Validators.required, Validators.minLength(3)]],
  }, {
    validators: [
      this.isFieldOneEqualFieldTwo('password','password2')
    ]
  })

  ngOnInit(): void {
      // this.loginService.getEstado().subscribe(data =>{
      //     console.log(data)
      //     this.estados = data;
      //   })
  }
  getMunicipios(){
    // if(this.myForm.controls['estado'].invalid) return
    // this.userService.getMunicipio(this.myForm.controls['estado'].value).subscribe(data =>{
    //   console.log(data)
    //   this.municipios = data;
    // })
  }
  getCp(){
    // if(this.myForm.controls['municipio'].invalid) return
    // this.userService.getCp(this.myForm.controls['municipio'].value).subscribe(data =>{
    //   console.log(data)
    //   this.cp = data;
    // })
  }
  getColonia(){
    // if(this.myForm.controls['cp'].invalid) return
    // this.userService.getColonia(this.myForm.controls['cp'].value).subscribe(data =>{
    //   console.log(data)
    //   this.colonias = data;
    // })
  }

  //Funcion que toma los datos del formulario y los envia mediante el metodo post al back para su registro
  createNewUser(){
     if(this.myForm.valid){
       console.log(this.myForm.value)
       const formData = this.myForm.value;
       this.loginService.createUser(formData).subscribe(data => console.log("Listo papu"))
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
    !this.myForm.controls['birthdate'].invalid &&
    !this.myForm.controls['estado'].invalid &&
    !this.myForm.controls['municipio'].invalid &&
    !this.myForm.controls['cp'].invalid &&
    !this.myForm.controls['colonia'].invalid &&
    !this.myForm.controls['calle'].invalid )
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
  handlereset(response:any): void {
    this.validButton = true;
  }
  //Funcion que cambia el estado del boton de crear cuenta si se cumplen las sentencias dictadas
  validCreateButton(){
    if(this.myForm.invalid === false && this.validButton === false){
      console.log("3:", this.myForm.invalid, this.validButton)
      return false
    }
    else{
      return true
    }
  }

}