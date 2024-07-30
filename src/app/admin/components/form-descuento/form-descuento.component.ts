import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-form-descuento',
  templateUrl: './form-descuento.component.html',
  styleUrl: './form-descuento.component.css'
})
export class FormDescuentoComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }
  @Input()
  descuento: number = 0;
  @Input()
  id: number = 0;
  descuentoBackup: number = 0;
  isEdit: boolean = false;
  public formDes: FormGroup = this.fb.group({
    descuento: ['', [Validators.required]]
  });
  ngOnInit(): void {
    this.formDes.patchValue({ descuento: this.descuento });
    this.formDes.disable();
    this.descuentoBackup = this.descuento;
  }
  editDes(action: number) {
    switch (action) {
      case 0:
        this.formDes.enable();
        this.isEdit = true;
        break;

      case 1:
        this.formDes.disable();
        this.isEdit = false;
        this.formDes.patchValue({
          descuento: this.descuentoBackup
        });
        break;
    }
  }
  updateDescuento(action: number) {
    switch (action) {
      case 0:
        if (this.formDes.invalid) {
          console.log(this.descuentoBackup)
          this.formDes.patchValue({
            descuento: this.descuentoBackup
          });
          return this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No dejes el campo vacío'
          });
        }
        if (this.formDes.controls['descuento'].value <= 0) {
          this.formDes.patchValue({
            descuento: this.descuentoBackup
          });
          return this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'El descuento debe ser un número mayor a 0'
          })
        }
        this.confirmationService.confirm({
          message: '¿Está seguro de actualizar el descuento?',
          header: 'Actualizar Descuento',
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: 'Si',
          rejectLabel: 'No',
          rejectIcon: 'none',
          acceptIcon: 'none',
          rejectButtonStyleClass: 'p-button-text',
          accept: () => {
            this.adminService.updateDescuento(this.formDes.value.descuento, this.id).subscribe(data => {
              if (data.status === 200) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Exito',
                  detail: 'Descuento actualizado correctamente'
                })
              }
              else {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Hubo un problema al actualizar el descuento'
                })
              }
              this.formDes.disable();
              this.isEdit = false;
            });
          },
          reject: () => {
            this.formDes.patchValue({ descuento: this.descuento });
          }
        })
        break;

      case 1:
        this.confirmationService.confirm({
          message: '¿Está seguro de quitar el descuento?',
          header: 'Actualizar Descuento',
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: 'Si',
          rejectLabel: 'No',
          rejectIcon: 'none',
          acceptIcon: 'none',
          rejectButtonStyleClass: 'p-button-text',
          accept: () => {
            this.adminService.updateDescuento(0, this.id).subscribe(data => {
              if (data.status === 200) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Exito',
                  detail: 'Descuento actualizado correctamente'
                });
                window.location.reload();
              }
              else {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Hubo un problema al actualizar el descuento'
                });
              }
            });
          }
        })
        break;
    }
  }
}
