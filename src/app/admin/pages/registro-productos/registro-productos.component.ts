import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin-service.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-productos',
  templateUrl: './registro-productos.component.html',
  styleUrl: './registro-productos.component.css'
})
export class RegistroProductosComponent {
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private messageService: MessageService,
    private confirmationService:ConfirmationService,
    private router:Router,
  ) { }

  public nameFile: string = '';
  public imagenes: File[] = [];
  validBtn: boolean = false;

  form: FormGroup = this.fb.group({
    nombre_producto: ['', [Validators.required, Validators.minLength(5)]],
    precio: ['', [Validators.required]],
    stock: ['', [Validators.required]],
    descripccion: ['', [Validators.required,Validators.minLength(10)]],
    categoria: ['H', [Validators.required]],
    tipo: ['Pantalon', [Validators.required]],
    imgUno: [null, [Validators.required]],
    imgDos: [null, [Validators.required]],
    imgTres: [null, [Validators.required]],
    imgCuatro: [null, [Validators.required]],
    descuento: ['', [Validators.required]],
  })
  public onChangeFile(event: Event,path:string) {
    const target = event.target as HTMLInputElement;
    if (target?.files?.length) {
      if(target.files.length > 1) return this.messageService.add({
        severity: 'error',
        detail: 'Solo se permite subir una imagen por campo'
      })
      for (let i = 0; i < target.files.length; i++) {
        const file = target.files[0];
        const fileType = file.type;
        if (!fileType.startsWith('image/')) {
          this.form.controls[path].reset();
          return this.messageService.add({
            severity: 'error',
            detail: 'Solo se permiten imágenes'
          })
        }
        if (file.size > 1024 * 1024 * 5) {
          this.form.controls[path].reset();
          return this.messageService.add({
            severity: 'error',
            detail: 'La imagen es demasiado grande. Máximo 5MB'
          })
        }
        this.nameFile = target.files[i].name;
        this.imagenes.push(target.files[i]);
      }
    }
  }
  addNewProduct() {
    if(this.form.invalid) return this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No dejes campos vacios y rellena correctamente'
    })
    this.validBtn = true;
    if (
      this.form.valid
      && this.imagenes !== null
    ) {
      const formData: FormData = new FormData();
      formData.append('nombre_producto', this.form.get('nombre_producto')!.value);
      formData.append('precio', this.form.get('precio')!.value);
      formData.append('stock', this.form.get('stock')!.value);
      formData.append('descripccion', this.form.get('descripccion')!.value);
      formData.append('imagen', this.imagenes[0]);
      formData.append('imagen', this.imagenes[1]);
      formData.append('imagen', this.imagenes[2]);
      formData.append('imagen', this.imagenes[3]);
      formData.append('categoria', this.form.get('categoria')!.value);
      formData.append('tipo', this.form.get('tipo')!.value);
      formData.append('descuento', this.form.get('descuento')!.value);
      this.form.disable()
      this.adminService.addProduct(formData).subscribe(res => {
        if (res.status === 200) {
          this.validBtn = false;
          this.form.reset();
          this.form.disable()
          this.messageService.add({
            severity: 'success',
            detail: 'Producto agregado correctamente'
          })
        }
      })
    }
  }
  checkValidation(path: string): string | null {
    if (!this.form.controls[path]) return null;
    const errors = this.form.controls[path].errors || {};
    for (const key of Object.keys(errors)) {
      if (key === 'required') {
        return 'El campo es requerido'
      }
      else if (key === 'minlength') {
        return `El campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`
      }
      else if (key === 'pattern') {
        return 'El codigo solo puede contener numeros'
      }
    }
    return null
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
        this.form.reset();
        this.imagenes = [];
        this.router.navigate(['/admin/productos'])
      }
    });
  }
}
