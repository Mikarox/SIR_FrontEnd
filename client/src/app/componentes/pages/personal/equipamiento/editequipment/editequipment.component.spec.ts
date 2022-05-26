import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditequipmentComponent } from './editequipment.component';

describe('EditequipmentComponent', () => {
  let component: EditequipmentComponent;
  let fixture: ComponentFixture<EditequipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditequipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditequipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
