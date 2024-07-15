import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin-service.service';
import { VentasFenvi } from '../../interfaces/GetVentasFenvio.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ventas-fenvio',
  templateUrl: './ventas-fenvio.component.html',
  styleUrl: './ventas-fenvio.component.css'
})
export class VentasFenvioComponent implements OnInit{
  constructor(private adminService:AdminService,private fb:FormBuilder) { }
  public ventas:VentasFenvi[] = [];
  public codeForm:FormGroup = this.fb.group({
    code: ['',[Validators.required]]
  })
  ngOnInit(): void {
    this.adminService.getVentasFenvio('Fenvio').subscribe( ventas => {
      this.ventas = ventas.data;
    });
  }
  addCode(id:number){
    this.adminService.addCodeRastreo(id, this.codeForm.controls['code'].value).subscribe(resp =>{
      if(resp.status === 200){
        alert("Se añadio el codigo")
        this.codeForm.reset();
        this.adminService.getVentasFenvio('Fenvio').subscribe( ventas => {
          this.ventas = ventas.data;
        });
      }else{
        console.log('Error al agregar codigo');
      }
    })
  }
}
