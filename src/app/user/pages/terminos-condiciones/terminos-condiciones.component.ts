import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terminos-condiciones',
  templateUrl: './terminos-condiciones.component.html',
  styleUrl: './terminos-condiciones.component.css'
})
export class TerminosCondicionesComponent implements OnInit{
  public isLoader: boolean = true;
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoader = false;
    }, 500);
  }

  scrollRolUp(){
    window.scroll({
      top: 0,
      behavior: "smooth"
    })
  }
}
