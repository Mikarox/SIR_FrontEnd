import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeLicenciaComponent } from './see-licencia.component';

describe('SeeLicenciaComponent', () => {
  let component: SeeLicenciaComponent;
  let fixture: ComponentFixture<SeeLicenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeLicenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeLicenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
