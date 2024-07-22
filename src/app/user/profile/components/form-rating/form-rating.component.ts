import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-form-rating',
  templateUrl: './form-rating.component.html',
  styleUrl: './form-rating.component.css'
})
export class FormRatingComponent implements OnInit{
  constructor(private fb: FormBuilder, private profileService:ProfileService, private messageService:MessageService) { }
  @Input()
  raking:number = 0;
  @Input()
  idVenta:number = 0;
  @Input()
  idProduct:number = 0;

  @Output()
  ready = new EventEmitter<boolean>();

  isRaking:boolean = false;

  formRating:FormGroup = this.fb.group({
    value:['',[Validators.required]],
    opinion:['',[Validators.required]]
  });

  ngOnInit(): void {
    if(this.raking > 0){
      this.isRaking = true;
    }
    this.formRating.patchValue({
      value: this.raking, disabled:false
    });
    if(this.formRating.controls['value'].value > 0) this.formRating.disable();
  }

  addRakin(){
    if(this.formRating.controls['value'].value === 0){
      return this.ready.emit(false);
    }
    if(this.formRating.invalid) return this.ready.emit(false);

    this.profileService.addRaking(this.idVenta, this.formRating.controls['value'].value,this.formRating.controls['opinion'].value).subscribe(data =>{
      if(data.status === 200){
        this.isRaking = true;
        this.ready.emit(true);
        this.formRating.disable();
      }
    });
  }
}
