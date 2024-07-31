import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ComentarioS } from '../../interfaces/GetComentarios.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css'
})
export class ComentariosComponent implements OnInit{
  constructor(private profileService:ProfileService) { }
  private jwtHelper = new JwtHelperService();
  public comentarios:ComentarioS[] = [];
  isLoader: boolean = true;
  ngOnInit(): void {
    const idUser = localStorage.getItem('token')
    if(idUser !== null){
      const token = this.jwtHelper.decodeToken(idUser);
      this.profileService.getComentarios(token.sub).subscribe(data => {
        this.comentarios = data.data;
        setTimeout(() => {
          this.isLoader = false;
        }, 500);
      });
    }
  }

}
