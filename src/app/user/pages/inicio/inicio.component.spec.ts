import { of } from 'rxjs';
import { ProductsService } from '../../products/services/products.service';
import { InicioComponent } from './inicio.component';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { PrimeNgModule } from '../../../prime-ng/prime-ng.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('InicioComponent', () => {
  let component: InicioComponent;
  let fixture: ComponentFixture<InicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, PrimeNgModule],
      declarations: [InicioComponent],
      providers: [ProductsService,MessageService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Se crea correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe cambiar isLoader a false después de 500ms', fakeAsync(() => {
    const productService = TestBed.inject(ProductsService);
    jest.spyOn(productService, 'getProductsNovedades').mockReturnValue(of({
      novedades: [],
      descuento: [],
      dama: [],
      caballero: [],
      message: 'Success',
      status: 200
    }));

    const fixture = TestBed.createComponent(InicioComponent);
    const component = fixture.componentInstance;

    component.ngOnInit();
    tick(500); // Simula el paso de 500ms
    expect(component.isLoader).toBe(false);
  }));

});
