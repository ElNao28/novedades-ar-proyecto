import { of } from 'rxjs';
import { ProductsService } from '../../products/services/products.service';
import { InicioComponent } from './inicio.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { PrimeNgModule } from '../../../prime-ng/prime-ng.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('InicioComponent', () => {
  let component: InicioComponent;
  let fixture: ComponentFixture<InicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, PrimeNgModule],
      declarations: [InicioComponent],
      providers: [ProductsService,MessageService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Se crea correctamente', () => {
    expect(component).toBeTruthy();
  });


  it('Llamar al servicio', () => {
    const productService = TestBed.inject(ProductsService);
    const productSpy = jest.spyOn(productService, 'getProducts').mockReturnValue(of([

    ]));

    component.ngOnInit();
    expect(productSpy).toHaveBeenCalled();
    expect(component.caballero.length).toBeGreaterThan(0);

  });


});
