import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-form-stock',
  templateUrl: './form-stock.component.html',
  styleUrl: './form-stock.component.css'
})
export class FormStockComponent implements OnInit{
  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  @Input()
  stock: number = 0;
  @Input()
  id: number = 0;
  stockBackup: number = 0;
  isEdit: boolean = false;
  public formStock: FormGroup = this.fb.group({
    stock: ['', [Validators.required]]
  });
  ngOnInit(): void {
    this.formStock.patchValue({ stock: this.stock });
    this.formStock.disable();
    this.stockBackup = this.stock;
  }
  editDes(action: number) {
    switch (action) {
      case 0:
        this.formStock.enable();
        this.isEdit = true;
        break;
      case 1:
        this.formStock.disable();
        this.isEdit = false;
        this.formStock.patchValue({
          stock: this.stockBackup
        });
        break;
    }
  }
  updateStock(){
    if (this.formStock.invalid) {
      this.formStock.patchValue({
        stock: this.stockBackup
      });
      return this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No dejes el campo vacío'
      });
    }
    if (this.formStock.controls['stock'].value <= 0) {
      this.formStock.patchValue({
        stock: this.stockBackup
      });
      return this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'El stock debe ser un número mayor a 0'
      })
    }
    this.confirmationService.confirm({
      message: '¿Está seguro de actualizar el stock?',
      header: 'Actualizar stock',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      rejectIcon: 'none',
      acceptIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.adminService.updateStock(this.formStock.value.stock, this.id).subscribe(data => {
          if (data.status === 200) {
            this.messageService.add({
              severity: 'success',
              summary: 'Exito',
              detail: 'Stock actualizado correctamente'
            })
          }
          else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Hubo un problema al actualizar el Stock'
            })
          }
          this.formStock.disable();
          this.isEdit = false;
        });
      },
      reject: () => {
        this.formStock.patchValue({ stock: this.stock });
      }
    })
  }
}
