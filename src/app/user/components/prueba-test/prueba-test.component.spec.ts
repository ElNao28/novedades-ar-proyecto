import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaTestComponent } from './prueba-test.component';

describe('PruebaTestComponent', () => {
  let component: PruebaTestComponent;
  let fixture: ComponentFixture<PruebaTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PruebaTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PruebaTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
