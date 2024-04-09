import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css'
})
export class ViewProfileComponent implements OnInit{
  constructor(
    private profileService:ProfileService,
    private activateLink:ActivatedRoute,
    private router:Router,
  ){}
  isLoader :boolean = true;
  email:string = "";
  name:string = "";
  idUser:string = "";
  ngOnInit(): void {
    const idUser = localStorage.getItem('token');
    const idByUrl = this.activateLink.snapshot.paramMap.get('id')!;
    if(idUser !== null){
      if(idByUrl !== idUser) this.router.navigate(['/404']);
      this.idUser = idUser;
      this.profileService.getProfile(idUser).subscribe(res=>{
        if(res.status === 200){
          this.email = res.email;
          this.name = res.name;
          setTimeout(() => {
            this.isLoader = false;
          }, 500);
        }
      })
    }
  }

}
