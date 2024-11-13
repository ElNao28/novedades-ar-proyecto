import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { ProfileService } from './user/profile/services/profile.service';

import { inject } from '@vercel/analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{


  constructor(private swPush:SwPush,private profileService:ProfileService){
    this.subscribeToNotifications();
  }
  ngOnInit(): void {
    inject()
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
      console.log(`Error: ${err}`);
    });
  }



}
