import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGarantiaComponent } from './edit-garantia.component';

describe('EditGarantiaComponent', () => {
  let component: EditGarantiaComponent;
  let fixture: ComponentFixture<EditGarantiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGarantiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGarantiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
