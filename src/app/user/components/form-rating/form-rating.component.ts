import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../products/services/products.service';

@Component({
  selector: 'app-form-rating',
  templateUrl: './form-rating.component.html',
  styleUrl: './form-rating.component.css'
})
export class FormRatingComponent {
  constructor(
    private fb:FormBuilder,
    private productsService: ProductsService,
  ){}
  public isSend:boolean = false;
  public formCal:FormGroup = this.fb.group({
    expCompra:[1,[Validators.required]],
    detalles:[1,[Validators.required]],
    satOptimizacion:[1,[Validators.required]],
    fecha:[]
  });
  @Input()
  public visible: boolean = false;
  @Input()
  idUser:string = "";
  public rating(){
    const fecha = new Date();
    this.formCal.patchValue({
      fecha
    });
    if(this.formCal.valid){
      this.isSend = true;
      this.productsService.rating(this.formCal.value,this.idUser).subscribe(resp => {
        console.log(resp);
        if(resp.status === 200){
          this.visible = false;
          this.isSend = false;
        }
      })
    }
    else{
      alert('Todos los campos son obligatorios');
    }
  }
}
