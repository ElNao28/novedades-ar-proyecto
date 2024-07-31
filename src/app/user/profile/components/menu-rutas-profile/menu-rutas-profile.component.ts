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
  ruta:string = "";
  ngOnInit(): void {
    this.activateLink.url.subscribe(data =>{
        this.ruta = data[1].path
    });
  }


}
