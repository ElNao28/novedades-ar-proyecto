import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rating-products',
  templateUrl: './rating-products.component.html',
  styleUrl: './rating-products.component.css'
})
export class RatingProductsComponent implements OnInit{
  constructor(private fb:FormBuilder){}

  @Input()
  rating:number = 0;
  formRating:FormGroup = this.fb.group({
    value:['']
  })

  ngOnInit(): void {
    this.formRating.patchValue({value: this.rating});
    this.formRating.disable()
  }
}
