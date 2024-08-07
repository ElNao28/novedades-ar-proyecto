import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { RespPersonal } from '../../interfaces/ResProfile.interface';
import { MessageService } from 'primeng/api';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-data-personal',
  templateUrl: './data-personal.component.html',
  styleUrl: './data-personal.component.css'
})
export class DataPersonalComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private messageService: MessageService
  ) { }
  private jwtHelper = new JwtHelperService();
  isLoader: boolean = true;
  editName: boolean = true;
  dataForm: RespPersonal = {
    status: 0,
    name: '',
    lastname: '',
    motherLastname: '',
    gender: '',
    birthdate: ''
  };

  public nameForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    motherLastname: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    birthdate: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    const userId = localStorage.getItem('token');
    if (userId !== null) {
      const token = this.jwtHelper.decodeToken(userId);
      this.profileService.getDataPersonal(token.sub).subscribe(res => {
        this.dataForm = res;
        this.nameForm = this.fb.group({
          name: [{ value: res.name.toUpperCase(), disabled: true }, [Validators.required, Validators.minLength(3)]],
          lastname: [{ value: res.lastname.toUpperCase(), disabled: true }, [Validators.required, Validators.minLength(3)]],
          motherLastname: [{ value: res.motherLastname.toUpperCase(), disabled: true }, [Validators.required, Validators.minLength(3)]],
          gender: [{ value: res.gender.toUpperCase(), disabled: true }, [Validators.required]],
          birthdate: [{ value: res.birthdate, disabled: true }, [Validators.required, this.validateAge.bind(this)]],
        });
        setTimeout(() => {
          this.isLoader = false;
        }, 500);
      });
    }
  }

  validateAge(control: AbstractControl): ValidationErrors | null {
    const birthdate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();

    return age >= 18 ? null : { underage: true };
  }



  chamgeStateBtnName(edit: number) {
    switch (edit) {
      case 1:
        this.nameForm.controls['name'].enable();
        this.nameForm.controls['lastname'].enable();
        this.nameForm.controls['motherLastname'].enable();
        this.nameForm.controls['gender'].enable();
        this.nameForm.controls['birthdate'].enable();
        this.editName = !this.editName;
        break;
      case 2:
        this.editName = !this.editName;
        this.nameForm.controls['name'].disable();
        this.nameForm.controls['lastname'].disable();
        this.nameForm.controls['motherLastname'].disable();
        this.nameForm.controls['gender'].disable();
        this.nameForm.controls['birthdate'].disable();

        this.nameForm.setValue(
          {
            name: this.dataForm.name.toUpperCase(),
            lastname: this.dataForm.lastname.toUpperCase(),
            motherLastname: this.dataForm.motherLastname.toUpperCase(),
            gender: this.dataForm.gender.toUpperCase(),
            birthdate: this.dataForm.birthdate.toUpperCase(),
          });
        break;
      case 3:
        if (this.nameForm.invalid) return this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No dejes campos vacios y rellena correctamente'
        })
        const userId = localStorage.getItem('token');
        this.nameForm.setValue(
          {
            name: this.nameForm.controls['name'].value.toLowerCase(),
            lastname: this.nameForm.controls['lastname'].value.toLowerCase(),
            motherLastname: this.nameForm.controls['motherLastname'].value.toLowerCase(),
            gender: this.nameForm.controls['gender'].value.toUpperCase(),
            birthdate: this.nameForm.controls['birthdate'].value
          });
        if (userId !== null) {
          const token = this.jwtHelper.decodeToken(userId);
          this.profileService.updateUserPersonal(token.sub, this.nameForm.value).subscribe(data => {
            if (data.status === 200) {
              this.messageService.add({
                severity: 'success',
                summary: 'Información',
                detail: 'Datos actualizados correctamente'
              });
              this.profileService.getDataPersonal(token.sub).subscribe(data => {
                this.dataForm = data;
                this.nameForm = this.fb.group({
                  name: [{ value: data.name.toUpperCase(), disabled: true }, [Validators.required, Validators.minLength(3)]],
                  lastname: [{ value: data.lastname.toUpperCase(), disabled: true }, [Validators.required, Validators.minLength(3)]],
                  motherLastname: [{ value: data.motherLastname.toUpperCase(), disabled: true }, [Validators.required, Validators.minLength(3)]],
                  gender: [{ value: data.gender.toUpperCase(), disabled: true }, [Validators.required]],
                  birthdate: [{ value: data.birthdate, disabled: true }, [Validators.required, this.validateAge.bind(this)]],
                });
              })
              this.editName = !this.editName;
            }
          })
        }
        break;
    }
  }
}
