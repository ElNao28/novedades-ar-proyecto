import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin/services/admin-service.service';

@Component({
  selector: 'app-mision',
  templateUrl: './mision.component.html',
  styleUrl: './mision.component.css'
})
export class MisionComponent implements OnInit{
  constructor(private adminService:AdminService) { }
  public mision:string = '';
  public isLoader = true;
  ngOnInit(): void {
    this.adminService.getMision().subscribe(mision => {
      this.mision = mision.data.mision;
      setTimeout(() => {
        this.isLoader = false;
      }, 500);
    });
  }

}
