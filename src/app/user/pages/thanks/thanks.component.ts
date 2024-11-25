import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProductsService } from '../../products/services/products.service';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrl: './thanks.component.css'
})
export class ThanksComponent implements OnInit{
  constructor(private productsService:ProductsService){}
  private jwtHelper = new JwtHelperService();
  public visible: boolean = false;
  public idUser:string = "";
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token){
      console.log(token)
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.idUser = decodedToken.sub;
      console.log(this.idUser)
      this.productsService.checkCompras(this.idUser).subscribe(resp => {
        if(resp.status === 200){
          if(resp.isShopping === true){
            this.visible = true;
          }
        }
      })
    } else {
      console.log('Token not found');
    }
  }

}
