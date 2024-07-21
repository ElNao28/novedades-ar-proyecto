import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin-service.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { VentasFenvi } from '../../interfaces/GetVentasFenvio.interface';

@Component({
  selector: 'app-form-code',
  templateUrl: './form-code.component.html',
  styleUrl: './form-code.component.css'
})
export class FormCodeComponent {
  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  @Input()
  idVenta:number = 0;
  @Output()
  dataVenta = new EventEmitter<VentasFenvi[]>();

  public codeForm: FormGroup = this.fb.group({
    code: ['', [Validators.required, Validators.minLength(12), Validators.pattern(/^[0-9]+$/)]]
  })

  addCode(id: number) {
    if (this.codeForm.invalid) return this.messageService.add({
      severity: 'error', summary: 'Error', detail: 'Llenar correctamente el campo'
    })
    this.confirmationService.confirm({
      message: `Confirmas que ${this.codeForm.controls['code'].value} es el codigo de envio?`,
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      acceptLabel: "Aceptar",
      rejectLabel: "Cancelar",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.adminService.addCodeRastreo(id, this.codeForm.controls['code'].value).subscribe(resp => {
          if (resp.status === 200) {
            this.codeForm.reset();
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Codigo añadido correctamente' });
            this.adminService.getVentasFenvio('Fenvio').subscribe(ventas => {
              this.dataVenta.emit(ventas.data);
            });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo añadir el codigo, prueba de nuevo' });
          }
        })
      },
      reject: () => {
        this.codeForm.reset();
      }
    });
  }

  checkValidation(path: string): string | null {
    if (!this.codeForm.controls[path]) return null;
    const errors = this.codeForm.controls[path].errors || {};
    for (const key of Object.keys(errors)) {3
      if (key === 'required') {
        return 'El campo es requerido'
      }
      else if (key === 'minlength') {
        return `El codigo debe tener al menos ${errors['minlength'].requiredLength} caracteres`
      }
      else if (key === 'pattern') {
        return 'El codigo solo puede contener numeros'
      }
    }
    return null
  }
}
