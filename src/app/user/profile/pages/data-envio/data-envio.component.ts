import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { MessageService } from 'primeng/api';
import { RespCopomex, RespCuenta, RespEnvio, RespPersonal } from '../../interfaces/ResProfile.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-data-envio',
  templateUrl: './data-envio.component.html',
  styleUrl: './data-envio.component.css'
})
export class DataEnvioComponent {
  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private messageService: MessageService
  ) { }
  private jwtHelper = new JwtHelperService();
  isLoader: boolean = true;
  editName: boolean = true;
  dataForm: RespEnvio = {
    status: 0,
    estado: '',
    municipio: '',
    cp: 0,
    colonia: '',
    referencia: ''
  };
  dataByCopomex: RespCopomex = {
    error: false,
    code_error: 0,
    error_message: null,
    response: {
      cp: '',
      asentamiento: [],
      tipo_asentamiento: '',
      municipio: '',
      estado: '',
      ciudad: '',
      pais: '',
    }
  }
  idDisabled: boolean = false;
  public ubicacionForm: FormGroup = new FormGroup({
    estado: new FormControl('', [Validators.required]),
    municipio: new FormControl('', [Validators.required]),
    cp: new FormControl('0', [Validators.required,Validators.minLength(5)]),
    colonia: new FormControl('', [Validators.required]),
    referencia: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    const userId = localStorage.getItem('token');
    if (userId !== null) {
      const token = this.jwtHelper.decodeToken(userId);
      this.profileService.getDataUbicacion(token.sub).subscribe(res => {
        this.dataForm = res;
        this.ubicacionForm = this.fb.group({
          estado: [res.estado, [Validators.required]],
          municipio: [res.municipio, [Validators.required]],
          cp: [res.cp, [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
          colonia: [res.colonia, [Validators.required]],
          referencia: [res.referencia, [Validators.required, Validators.minLength(10)]],
        });
        if (res.cp !== 0) {
          this.profileService.getDataCopomex(res.cp).subscribe(data => {
            this.dataByCopomex = data;
          });
        }
        setTimeout(() => {
          this.isLoader = false;
        }, 500);
      });
    }

  }
  searchDataByCp() {
    console.log(this.ubicacionForm.invalid)
    if (this.ubicacionForm.controls['cp'].valid) {
      this.profileService.getDataCopomex(this.ubicacionForm.controls['cp'].value).subscribe(data => {
        this.dataByCopomex = data;
        this.ubicacionForm.patchValue({ estado: data.response.estado });
        this.ubicacionForm.patchValue({ municipio: data.response.municipio });
        this.ubicacionForm.patchValue({ colonia: data.response.asentamiento[0] });
      })
    }
  }
  async chamgeStateBtnName(edit: number) {
    switch (edit) {
      case 1:
        this.editName = !this.editName;
        break;
      case 2:
        this.editName = !this.editName;
        this.ubicacionForm.setValue(
          {
            estado: this.dataForm.estado,
            municipio: this.dataForm.municipio,
            cp: this.dataForm.cp,
            colonia: this.dataForm.colonia,
            referencia: this.dataForm.referencia,
          });
        break;
      case 3:
        this.idDisabled = true;
        const userId = localStorage.getItem('token');
        if (this.ubicacionForm.invalid) {
          this.idDisabled = false;
          return this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Por favor llene todos los campos'
          })
        }
        if (userId !== null) {
          const token = this.jwtHelper.decodeToken(userId);
          this.profileService.updateUserUbicacion(token.sub, this.ubicacionForm.value).subscribe(data => {
            if (data.status === 200) {
              this.messageService.add({
                severity: 'success',
                summary: 'Información',
                detail: 'Datos actualizados correctamente'
              });
              this.profileService.getDataUbicacion(token.sub).subscribe(data => {
                this.dataForm = data;
                this.ubicacionForm = this.fb.group({
                  estado: [data.estado, [Validators.required]],
                  municipio: [data.municipio, [Validators.required]],
                  cp: [data.cp, [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
                  colonia: [data.colonia, [Validators.required]],
                  referencia: [data.referencia, [Validators.required, Validators.minLength(10)]],
                });
              })
              this.editName = !this.editName;
              this.idDisabled = false;
            }
          });
        }
        break;
    }
  }
}
