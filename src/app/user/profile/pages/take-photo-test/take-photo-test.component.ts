import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';


export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}


@Component({
  selector: 'app-take-photo-test',
  templateUrl: './take-photo-test.component.html',
  styleUrl: './take-photo-test.component.css'
})
export class TakePhotoTestComponent {

  public photos: UserPhoto[] = [];
  public async addNewToGallery() {


    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
  }

  async addPhotoToGallery() {
    this.addNewToGallery();
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    this.photos.unshift({
      filepath: "soon...",
      webviewPath: capturedPhoto.webPath!
    });
  }
}
