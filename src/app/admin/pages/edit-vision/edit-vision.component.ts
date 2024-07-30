import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin-service.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-vision',
  templateUrl: './edit-vision.component.html',
  styleUrl: './edit-vision.component.css'
})
export class EditVisionComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
  ) { }
  public formVision: FormGroup = this.fb.group({
    vision: ['', [Validators.required]]
  });
  isEdit: boolean = false;
  vision: string = '';
  ngOnInit(): void {
    this.formVision.disable()
    this.adminService.getVision().subscribe(data => {
      this.formVision.patchValue({ vision: data.data.vision });
      this.vision = data.data.vision;
    });
  }
  changeEdit(action: number) {
    switch (action) {
      case 0:
        this.formVision.enable();
        this.isEdit = true;
        break;
      case 1:
        this.confirmationService.confirm({
          message: '¿Está seguro de cancelar la operacion?',
          header: 'Confirmar acción',
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: 'Si',
          rejectLabel: 'No',
          acceptIcon: 'none',
          rejectIcon: 'none',
          rejectButtonStyleClass: 'p-button-text',
          accept: () => {
            this.formVision.disable();
            this.isEdit = false;
            this.formVision.patchValue({ vision: this.vision });
          }
        });
        break;
      case 2:
        this.confirmationService.confirm({
          message: '¿Está seguro de guardar los cambios?',
          header: 'Confirmar acción',
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: 'Si',
          rejectLabel: 'No',
          acceptIcon: 'none',
          rejectIcon: 'none',
          rejectButtonStyleClass: 'p-button-text',
          accept: () => {
            this.adminService.updateVision(this.formVision.value).subscribe(res => {
              if (res.status === 200) {
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'La misión se ha actualizado correctamente' });
                this.isEdit = false;
                this.formVision.disable();
              } else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error al actualizar la misión' });
              }
            });
          }
        });
        break;
    }
  }
}
