import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeVerificacionComponent } from './see-verificacion.component';

describe('SeeVerificacionComponent', () => {
  let component: SeeVerificacionComponent;
  let fixture: ComponentFixture<SeeVerificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeVerificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeVerificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
