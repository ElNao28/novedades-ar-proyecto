import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-rating',
  templateUrl: './form-rating.component.html',
  styleUrl: './form-rating.component.css'
})
export class FormRatingComponent implements OnInit{
  constructor(private fb: FormBuilder) { }
  @Input()
  raking:number = 0;

  formRating:FormGroup = this.fb.group({
    value:['',[Validators.required]]
  });

  ngOnInit(): void {
    this.formRating.patchValue({
      value: this.raking, disabled:false
    });
    if(this.formRating.controls['value'].value > 0) this.formRating.disable();
  }
}
