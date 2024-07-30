import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin-service.service';
import { ProductsService } from '../../../user/products/services/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private productSerice: ProductsService,
    private fb: FormBuilder,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }
  public productForm: FormGroup = this.fb.group({
    nombre_producto: ['', [Validators.required, Validators.minLength(5)]],
    precio: ['', [Validators.required]],
    stock: ['', [Validators.required]],
    descripccion: ['', [Validators.required, Validators.minLength(10)]],
    categoria: ['H', [Validators.required]],
    tipo: ['Pantalon', [Validators.required]],
    // imgUno: [null, [Validators.required]],
    // imgDos: [null, [Validators.required]],
    // imgTres: [null, [Validators.required]],
    // imgCuatro: [null, [Validators.required]],
    descuento: ['', [Validators.required]],
  })
  ngOnInit(): void {
    const id = this.activateRouter.snapshot.paramMap.get('id')
    if (id !== null)
      this.productSerice.getProductById(id.toString()).subscribe(data => {
        this.productForm.patchValue(data)
      })
  }
  updateProduct() {
    if (this.productForm.invalid) return this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No puedes dejar campos vacios o incompletos'
    })
    const id = this.activateRouter.snapshot.paramMap.get('id')
    if (id !== null)
      this.confirmationService.confirm({
        message: 'Estás seguro que deseas actualizar el producto?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        acceptLabel: "Aceptar",
        rejectLabel: "Cancelar",
        rejectButtonStyleClass: "p-button-text",
        accept: () => {
          this.productForm.patchValue({
            nombre_producto: this.productForm.controls['nombre_producto'].value.toLowerCase(),
            descripccion: this.productForm.controls['descripccion'].value.toLowerCase()
          })
          this.adminService.updateProduct(+id, this.productForm.value).subscribe(data => {
            if (data.status === 200) {
              this.messageService.add({
                severity:'success',
                detail: 'Producto actualizado correctamente'
              })
              this.router.navigate(['/admin/productos']);
            }
          })
        }
      })
  }
  checkValidation(path: string) {
    if (!this.productForm.controls[path]) return null;
    const errors = this.productForm.controls[path].errors || {};
    for (const key of Object.keys(errors)) {
      if (key === 'required') {
        return 'El campo es requerido'
      }
      else if (key === 'minlength') {
        return `El campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`
      }
    }
    return null;
  }
  isCanceled(){
    this.confirmationService.confirm({
      message: '¿Estás seguro que deseas cancelar?',
      header: 'Cancelar',
      acceptIcon: 'none',
      rejectIcon: 'none',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Aceptar",
      rejectLabel: "Cancelar",
      rejectButtonStyleClass:'p-button-text',
      accept: () => {
        this.router.navigate(['/admin/productos'])
      }
    });
  }
}
