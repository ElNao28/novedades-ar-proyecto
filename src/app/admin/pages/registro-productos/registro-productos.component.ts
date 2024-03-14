import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataForm } from '../../../user/modulo-login/interfaces/FormData.interface';
import { AdminService } from '../../services/admin-service.service';

@Component({
  selector: 'app-registro-productos',
  templateUrl: './registro-productos.component.html',
  styleUrl: './registro-productos.component.css'
})
export class RegistroProductosComponent {
  constructor(
    private fb:FormBuilder,
    private adminService:AdminService
    ){}

    public nameFile:string = '';
    public file:File | null = null;
     public onChangeFile(event:Event){
      const target = event.target as HTMLInputElement;

      if (target?.files?.length) {
        const file = target.files[0];
        this.nameFile = file.name;
        this.file = file;
        console.log(file);
      }
     }

  //Variable que contiene los campos que tendra el formulario y que se envian al componente "layout-form"
    datosForm:DataForm[] = [
     {
       label: "Nombre del producto",
       formControlName: "nombre_producto",
       type:"text",
     },
     {
       label: "Precio",
       formControlName: "precio",
       type:"number",
     },
     {
       label: "Stock",
       formControlName: "stock",
       type:"number",
     },
     {
       label: "Descripccion",
       formControlName: "descripccion",
       type:"text",
     },
     {
       label: "Categoria",
       formControlName: "categoria",
       type:"text",
     },
     {
       label: "Descuento",
       formControlName: "descuento",
       type:"number",
     },
     {
       label: "Imagen",
       formControlName: "imagen",
       type:"file",
     },
   ]
  form:FormGroup = this.fb.group({
    nombre_producto:['', [Validators.required]],
    precio:['', [Validators.required]],
    stock:['', [Validators.required]],
    descripccion:['', [Validators.required]],
    categoria:['', [Validators.required]],
    imagen:[null, [Validators.required]],
    descuento:['', [Validators.required]],
  })

  addNewProduct(){

    if (this.form.valid && this.file !== null) {
      const formData:FormData = new FormData();
      formData.append('nombre_producto', this.form.get('nombre_producto')!.value);
      formData.append('precio', this.form.get('precio')!.value);
      formData.append('stock', this.form.get('stock')!.value);
      formData.append('descripccion', this.form.get('descripccion')!.value);
      formData.append('imagen', this.file);
      formData.append('categoria', this.form.get('categoria')!.value);
      formData.append('descuento', this.form.get('descuento')!.value);

      this.adminService.addProduct(formData).subscribe(res=>{
      console.log(res)
    })
    }
  }
}
