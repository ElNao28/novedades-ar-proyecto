import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ResVentas, ResVentasDetallesVenta } from '../../interfaces/ResProfile.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styleUrl: './mis-compras.component.css'
})
export class MisComprasComponent implements OnInit {
  constructor(private profileService: ProfileService,private fb:FormBuilder) { }
  isLoader: boolean = true;
  filterVenta: ResVentasDetallesVenta[] = [];
  dataBackup: ResVentasDetallesVenta[] = [];
  public type: string = 'all';
  ngOnInit(): void {
    const idUser = localStorage.getItem('token');
    if (idUser !== null)
      this.profileService.getVentas(parseInt(idUser)).subscribe(data => {
        this.dataBackup = data.detallesVenta;
        this.filterVenta = data.detallesVenta;
        setTimeout(() => {
          this.isLoader = false;
        }, 500);
      });
  }

  filterData() {
    if (this.type === 'all') {
      this.filterVenta = this.dataBackup
    }
    else {
      this.filterVenta = this.dataBackup.filter(item => item.estado === this.type);
    }
  }
}
