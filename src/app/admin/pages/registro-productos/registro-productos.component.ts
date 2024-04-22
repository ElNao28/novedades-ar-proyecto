import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataForm } from '../../../user/modulo-login/interfaces/FormData.interface';
import { AdminService } from '../../services/admin-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-registro-productos',
  templateUrl: './registro-productos.component.html',
  styleUrl: './registro-productos.component.css'
})
export class RegistroProductosComponent {
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private alertService:MessageService
  ) { }

  public nameFile: string = '';
  public imagenes: File[] = [];
  validBtn:boolean = false;
  //Variable que contiene los campos que tendra el formulario y que se envian al componente "layout-form"

  form: FormGroup = this.fb.group({
    nombre_producto: ['', [Validators.required]],
    precio: ['', [Validators.required]],
    stock: ['', [Validators.required]],
    descripccion: ['', [Validators.required]],
    categoria: ['H', [Validators.required]],
    tipo: ['Pantalon', [Validators.required]],
    imagenes: [null, [Validators.required]],
    descuento: ['', [Validators.required]],
  })
  public onChangeFile(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target?.files?.length) {
      for (let i = 0; i < target.files.length; i++) {
        this.nameFile = target.files[i].name;
        this.imagenes.push(target.files[i]);
      }
    }
  }
  addNewProduct() {
    this.validBtn = true;
    //console.log(this.form.valid)
    if (
      this.form.valid
      && this.imagenes !== null
    ) {
      const formData: FormData = new FormData();
      formData.append('nombre_producto', this.form.get('nombre_producto')!.value);
      formData.append('precio', this.form.get('precio')!.value);
      formData.append('stock', this.form.get('stock')!.value);
      formData.append('descripccion', this.form.get('descripccion')!.value);
      formData.append('imagen',this.imagenes[0]);
      formData.append('imagen',this.imagenes[1]);
      formData.append('imagen',this.imagenes[2]);
      formData.append('imagen',this.imagenes[3]);
      formData.append('categoria', this.form.get('categoria')!.value);
      formData.append('tipo', this.form.get('tipo')!.value);
      formData.append('descuento', this.form.get('descuento')!.value);

      this.adminService.addProduct(formData).subscribe(res => {
        if(res.status === 200){
          this.validBtn = false;
          this.form.reset();
          this.alertService.add({
            severity: 'success',
            detail: 'Producto agregado correctamente'
          })
        }
      })


    }
  }
}
