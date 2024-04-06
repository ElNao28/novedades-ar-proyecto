import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-rutas-profile',
  templateUrl: './menu-rutas-profile.component.html',
  styleUrl: './menu-rutas-profile.component.css'
})
export class MenuRutasProfileComponent implements OnInit{
  constructor(
    private activateLink:ActivatedRoute,
  ) { }
  idUser:string  = "";
  ruta:string = "";
  ngOnInit(): void {
    const userId = localStorage.getItem('token');
    this.activateLink.url.subscribe(data =>{
        this.ruta = data[2].path
    });
    if(userId !== null){
      this.idUser = userId;
    }
  }


}
