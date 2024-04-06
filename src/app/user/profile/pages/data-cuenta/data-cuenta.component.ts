import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { MessageService } from 'primeng/api';
import { RespCuenta, RespPersonal } from '../../interfaces/ResProfile.interface';

@Component({
  selector: 'app-data-cuenta',
  templateUrl: './data-cuenta.component.html',
  styleUrl: './data-cuenta.component.css'
})
export class DataCuentaComponent {
  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private messageService: MessageService
  ) { }
  editName: boolean = true;
  dataForm: RespCuenta = {
    status: 0,
    email: '',
    cellphone: '',
  };

  public cuentaForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    cellphone: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    const userId = localStorage.getItem('token');
    if (userId !== null) {
      this.profileService.getDataCuenta(userId).subscribe(res => {
        this.dataForm = res;
        this.cuentaForm = this.fb.group({
          email: [{ value: res.email, disabled: true }, [Validators.required, Validators.minLength(3)]],
          cellphone: [{ value: res.cellphone, disabled: true }, [Validators.required, Validators.minLength(10)]]
        });
      })
    }
  }
  chamgeStateBtnName(edit: number) {
    switch (edit) {
      case 1:
        this.cuentaForm.controls['email'].enable();
        this.cuentaForm.controls['cellphone'].enable();

        this.editName = !this.editName;
        break;
      case 2:
        this.editName = !this.editName;
        this.cuentaForm.controls['email'].disable();
        this.cuentaForm.controls['cellphone'].disable();

        this.cuentaForm.setValue(
          {
            email: this.dataForm.email,
            cellphone: this.dataForm.cellphone,
          });
        break;
      case 3:
        const userId = localStorage.getItem('token');
        if (userId !== null)
          this.profileService.updateUserPersonal(userId, this.cuentaForm.value).subscribe(data => {
            if (data.status === 200) {
              this.messageService.add({
                severity: 'success',
                summary: 'Información',
                detail: 'Datos actualizados correctamente'
              });
              this.profileService.getDataCuenta(userId).subscribe(data => {
                this.dataForm = data;
                this.cuentaForm = this.fb.group({
                  email: [{ value: data.email, disabled: true }, [Validators.required, Validators.minLength(3)]],
                  cellphone: [{ value: data.cellphone, disabled: true }, [Validators.required, Validators.minLength(3)]],
                });
              })
              this.editName = !this.editName;
            }
          })
        break;
    }
  }
}
