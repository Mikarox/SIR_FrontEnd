import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosNavComponent } from './vehiculos-nav.component';

describe('VehiculosNavComponent', () => {
  let component: VehiculosNavComponent;
  let fixture: ComponentFixture<VehiculosNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculosNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculosNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
