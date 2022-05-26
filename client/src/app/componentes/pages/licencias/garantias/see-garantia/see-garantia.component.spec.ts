import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeGarantiaComponent } from './see-garantia.component';

describe('SeeGarantiaComponent', () => {
  let component: SeeGarantiaComponent;
  let fixture: ComponentFixture<SeeGarantiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeGarantiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeGarantiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
