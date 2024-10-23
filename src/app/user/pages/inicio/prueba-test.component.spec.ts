import { of } from 'rxjs';
import { ProductsService } from '../../products/services/products.service';
import { InicioComponent } from './inicio.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('PruebaTestComponent', () => {
  let component: InicioComponent;
  let fixture: ComponentFixture<InicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call the product service to fetch products', () => {
    const productService = TestBed.inject(ProductsService);
    const productSpy = jest.spyOn(productService, 'getProducts').mockReturnValue(of([

    ]));

    component.ngOnInit();
    expect(productSpy).toHaveBeenCalled();
    expect(component.caballero.length).toBe(2);
  });


});
