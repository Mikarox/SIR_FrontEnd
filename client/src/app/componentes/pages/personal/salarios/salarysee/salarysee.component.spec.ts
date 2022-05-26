import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryseeComponent } from './salarysee.component';

describe('SalaryseeComponent', () => {
  let component: SalaryseeComponent;
  let fixture: ComponentFixture<SalaryseeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryseeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryseeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
