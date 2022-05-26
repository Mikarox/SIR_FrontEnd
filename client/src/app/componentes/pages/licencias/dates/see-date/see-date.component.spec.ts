import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeDateComponent } from './see-date.component';

describe('SeeDateComponent', () => {
  let component: SeeDateComponent;
  let fixture: ComponentFixture<SeeDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
