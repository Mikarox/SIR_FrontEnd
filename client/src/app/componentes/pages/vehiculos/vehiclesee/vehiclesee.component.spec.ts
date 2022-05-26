import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleseeComponent } from './vehiclesee.component';

describe('VehicleseeComponent', () => {
  let component: VehicleseeComponent;
  let fixture: ComponentFixture<VehicleseeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleseeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleseeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
