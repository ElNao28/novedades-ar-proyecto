import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { ProfileService } from './user/profile/services/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private swPush:SwPush,private profileService:ProfileService){
    this.subscribeToNotifications();
  }

  public subscribeToNotifications(){


    this.swPush.requestSubscription({
      serverPublicKey: "BLZZNJhPTSIAw38z8-uyUGXQLZpNM9qibPj1ZCc4xxxsIU5BSBDxgMkDznCZxaLhCrfGbeYY_QStMhgw6uDZsBk"
    }).then(sub => {
      const token = JSON.parse(JSON.stringify(sub));

      this.profileService.saveTokenToNotification(token).subscribe(res => {
        console.log(res);
      })
      console.log(token)
    })
    .catch(err => {
      this.profileService.saveTokenToNotification({token:"No lo acepto o no jalo"}).subscribe()
      console.log(`Error: ${err}`);
    });
  }



}
