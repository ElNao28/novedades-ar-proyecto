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
  let originalError: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, PrimeNgModule],
      declarations: [InicioComponent],
      providers: [ProductsService, MessageService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(InicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Silenciar console.error durante las pruebas
    originalError = console.error;
    console.error = jest.fn();
  });

  afterEach(() => {
    // Restaurar el comportamiento normal de console.error
    console.error = originalError;
  });

  it('Se crea correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe cambiar isLoader a false después de 500ms', fakeAsync(() => {
    const productService = TestBed.inject(ProductsService);
    const getProductsSpy = jest.spyOn(productService, 'getProductsNovedades').mockReturnValue(of({
      novedades: [],
      descuento: [],
      dama: [],
      caballero: [],
      message: 'Success',
      status: 200
    }));

    component.ngOnInit(); // Llamar al ciclo de vida inicial
    tick(500); // Simula el paso de 500ms

    // Verificar que isLoader cambió a false
    expect(component.isLoader).toBe(false);

    // Verificar que getProductsNovedades fue llamado una vez
    expect(getProductsSpy).toHaveBeenCalledTimes(1);
  }));
});
