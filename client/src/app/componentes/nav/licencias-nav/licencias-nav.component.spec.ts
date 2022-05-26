import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenciasNavComponent } from './licencias-nav.component';

describe('LicenciasNavComponent', () => {
  let component: LicenciasNavComponent;
  let fixture: ComponentFixture<LicenciasNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenciasNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenciasNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
