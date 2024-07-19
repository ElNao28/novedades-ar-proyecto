import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ComentarioS } from '../../interfaces/GetComentarios.interface';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css'
})
export class ComentariosComponent implements OnInit{
  constructor(private profileService:ProfileService) { }
  public comentarios:ComentarioS[] = [];
  ngOnInit(): void {
    const idUser = localStorage.getItem('token')
    if(idUser !== null){
      this.profileService.getComentarios(idUser).subscribe(data => {
        this.comentarios = data.data;
      });
    }
  }

}
