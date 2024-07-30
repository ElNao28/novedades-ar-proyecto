import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin-service.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-mision',
  templateUrl: './edit-mision.component.html',
  styleUrl: './edit-mision.component.css'
})
export class EditMisionComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
  ) { }
  public formMision: FormGroup = this.fb.group({
    mision: ['', [Validators.required]]
  });
  isEdit: boolean = false;
  mision: string = '';
  ngOnInit(): void {
    this.formMision.disable()
    this.adminService.getMision().subscribe(data => {
      this.formMision.patchValue({ mision: data.data.mision });
      this.mision = data.data.mision;
    });
  }
  changeEdit(action: number) {
    switch (action) {
      case 0:
        this.formMision.enable();
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
            this.formMision.disable();
            this.isEdit = false;
            this.formMision.patchValue({ mision: this.mision });
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
            this.adminService.updateMision(this.formMision.value).subscribe(res => {
              if (res.status === 200) {
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'La misión se ha actualizado correctamente' });
                this.isEdit = false;
                this.formMision.disable();
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
