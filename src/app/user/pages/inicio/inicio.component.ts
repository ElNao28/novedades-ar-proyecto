import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductsService } from '../../products/services/products.service';
import { Products } from '../../products/interfaces/products.interface';
import { ProductoIni } from '../../products/interfaces/DataInicio.interface';
import { ProductsParaTi } from '../../products/interfaces/GetParaTi.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TagTemplates } from 'primeng/tag';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './inicio.component.css'
  ],

})
export class InicioComponent implements OnInit{
  constructor(
    private productsService: ProductsService,
    private fb:FormBuilder,
  ) { }
  public visible: boolean = false;
  private idUser:string = "";

  public formCal:FormGroup = this.fb.group({
    expCompra:[1,[Validators.required]],
    detalles:[1,[Validators.required]],
    satOptimizacion:[1,[Validators.required]],
    fecha:[]
  });

  public isSend:boolean = false;
  public calif:number = 0;
  isLoader: boolean = true;
  novedades!: ProductoIni[];
  descuento!: ProductoIni[];
  dama!:ProductoIni[];
  caballero!: ProductoIni[];
  paraTi!: ProductsParaTi[];
  private jwt = new JwtHelperService()
  images = [
    'https://res.cloudinary.com/dy5jdb6tv/image/upload/fl_preserve_transparency/v1713151485/portada_ngupek.jpg?_s=public-apps',
    'https://fos.com.mx/cdn/shop/articles/negocio_de_ropa.webp?v=1690921572&width=2000',
  ];

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if(token !== null){
      let tokenN = this.jwt.decodeToken(token);
      this.idUser = tokenN.sub;
      this.productsService.checkCompras(tokenN.sub).subscribe(resp => {
        if(resp.status === 200){
          if(resp.isShopping === true){
            this.visible = true;
          }
        }
      })
      this.productsService.getProductsByType(tokenN.sub).subscribe(data =>{
        this.paraTi = data.data;
        setTimeout(() => {
          this.isLoader = false;
        }, 500);
      })
    }
    this.productsService.getProductsNovedades().subscribe(
      data => {
        this.novedades = data.novedades;
        this.descuento = data.descuento;
        this.dama = data.dama;
        this.caballero = data.caballero;
        setTimeout(() => {
          this.isLoader = false;
        }, 500);
      },
      error => {
        console.log('Error de conexión');
      }
    );

  }

  addCardProduct(idCard:number){
    this.productsService.addProductToCardSer(idCard.toString());
  }

  public rating(){
    const fecha = new Date();
    this.formCal.patchValue({
      fecha
    });
    if(this.formCal.valid){
      this.isSend = true;
      this.productsService.rating(this.formCal.value,this.idUser).subscribe(resp => {
        console.log(resp);
        if(resp.status === 200){
          this.visible = false;
          this.isSend = false;
        }
      })
    }
    else{
      alert('Todos los campos son obligatorios');
    }
  }
}
