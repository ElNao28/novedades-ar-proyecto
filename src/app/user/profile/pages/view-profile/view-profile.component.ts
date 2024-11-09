import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem';

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
  private jwtHelper = new JwtHelperService();
  isLoader :boolean = true;
  email:string = "";
  name:string = "";
  idUser:string = "";
  urlPhoto:string = "";
  ngOnInit(): void {
    const idUser = localStorage.getItem('token');
    const idByUrl = this.activateLink.snapshot.paramMap.get('id')!;
    if(idUser !== null){
      const token = this.jwtHelper.decodeToken(idUser)
      //if(idByUrl !== idUser) this.router.navigate(['/404']);
      this.idUser = token.sub;
      this.profileService.getProfile(token.sub).subscribe(res=>{
        if(res.status === 200){
          this.email = res.email;
          this.name = res.name;
          this.urlPhoto = res.url_photo;
          setTimeout(() => {
            this.isLoader = false;
          }, 500);
        }
      })
    }
  }
  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // file-based data; provides best performance
      source: CameraSource.Camera, // automatically take a new photo with the camera
      quality: 100 // highest quality (0 to 100)
    });

    await this.savePicture(capturedPhoto);
  }
  private async savePicture(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);
    this.profileService.updatePhoto(this.idUser,base64Data).subscribe(resp => {
      if(resp.status === 200){
        location.reload();
      }
    })
  }
  private async readAsBase64(photo: Photo) {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}
