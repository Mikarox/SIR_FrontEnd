import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesupdateComponent } from './vehiclesupdate.component';

describe('VehiclesupdateComponent', () => {
  let component: VehiclesupdateComponent;
  let fixture: ComponentFixture<VehiclesupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclesupdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
