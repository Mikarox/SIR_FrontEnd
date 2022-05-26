import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeetenenciaComponent } from './seetenencia.component';

describe('SeetenenciaComponent', () => {
  let component: SeetenenciaComponent;
  let fixture: ComponentFixture<SeetenenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeetenenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeetenenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
