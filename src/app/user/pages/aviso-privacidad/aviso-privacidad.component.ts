import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aviso-privacidad',
  templateUrl: './aviso-privacidad.component.html',
  styleUrl: './aviso-privacidad.component.css'
})
export class AvisoPrivacidadComponent implements OnInit{
  public isLoader: boolean = true;
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoader = false;
    }, 500);
  }
  scrollRolUp() {
    window.scroll({
      top: 0,
      behavior: "smooth"
    })
  }
}
