import { Component } from '@angular/core';
import { RespSeguridad } from '../../interfaces/ResProfile.interface';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-data-seguridad',
  templateUrl: './data-seguridad.component.html',
  styleUrl: './data-seguridad.component.css'
})
export class DataSeguridadComponent {
  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private messageService: MessageService
  ) { }
  isLoader:boolean = true;
  editName: boolean = true;
  editPassword: boolean = true;
  dataForm: RespSeguridad = {
    status: 0,
    question: 0,
    answer: '',
  };

  public seguridadForm: FormGroup = new FormGroup({
    question: new FormControl('', [Validators.required]),
    answer: new FormControl('', [Validators.required]),
  });
  public passForm:FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/)]],
    confirmPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/)]]
  },
  {
    validators: [
      this.isFieldOneEqualFieldTwo('password','password2')
    ]
  });

  ngOnInit(): void {
    const userId = localStorage.getItem('token');
    if (userId !== null) {
      this.profileService.getDataSeguridad(userId).subscribe(res => {
        this.dataForm = res;
        this.seguridadForm = this.fb.group({
          question: [res.question, [Validators.required, Validators.minLength(3)]],
          answer: [res.answer, [Validators.required, Validators.minLength(10)]],
        });
        setTimeout(() => {
          this.isLoader = false;
        }, 500);
      });
    }
  }
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
  chamgeStateBtnName(edit: number) {
    switch (edit) {
      case 1:
        this.editName = !this.editName;
        break;
      case 2:
        this.editName = !this.editName;
        this.seguridadForm.setValue(
          {
            questionId: this.dataForm.question,
            answer: this.dataForm.answer,
          });
        break;
      case 3:
        const userId = localStorage.getItem('token');
        if (userId !== null) {
          this.profileService.updateUserSeguridad(userId, this.seguridadForm.value).subscribe(data => {
            if (data.status === 200) {
              this.messageService.add({
                severity: 'success',
                summary: 'Información',
                detail: 'Datos actualizados correctamente'
              });
              this.profileService.getDataSeguridad(userId).subscribe(data => {
                this.dataForm = data;
                this.seguridadForm = this.fb.group({
                  question: [data.question, [Validators.required, Validators.minLength(3)]],
                  answer: [data.answer, [Validators.required, Validators.minLength(3)]],
                });
              })
              this.editName = !this.editName;
            }
          })
        }
        break;
    }
  }
  chamgeStateBtnPass(edit: number) {
    switch (edit) {
      case 1:
        this.editPassword = !this.editPassword;
        break;
      case 2:
        this.editPassword = !this.editPassword;
        this.seguridadForm.setValue(
          {
            questionId: this.dataForm.question,
            answer: this.dataForm.answer,
          });
        break;
      case 3:
        const userId = localStorage.getItem('token');
        if (userId !== null) {
          this.profileService.updateUserPassword(userId, {password:this.passForm.controls['password'].value}).subscribe(data => {
            if (data.status === 200) {
              this.messageService.add({
                severity: 'success',
                summary: 'Información',
                detail: 'Datos actualizados correctamente'
              });
              this.passForm.setValue({
                password: '',
                confirmPassword: '',
              })
              this.editPassword = !this.editPassword;
            }
          })
        }
        break;
    }
  }
}
