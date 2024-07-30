import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin/services/admin-service.service';

@Component({
  selector: 'app-vision',
  templateUrl: './vision.component.html',
  styleUrl: './vision.component.css'
})
export class VisionComponent implements OnInit{
  constructor(private adminService:AdminService){}
  public isLoader: boolean = true;
  public vision:string = '';
  ngOnInit(): void {
    this.adminService.getVision().subscribe(data => {
      this.vision = data.data.vision;
      setTimeout(() => {
        this.isLoader = false;
      }, 500);
    });
  }

}
