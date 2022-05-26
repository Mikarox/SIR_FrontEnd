import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeServicioComponent } from './see-servicio.component';

describe('SeeServicioComponent', () => {
  let component: SeeServicioComponent;
  let fixture: ComponentFixture<SeeServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
