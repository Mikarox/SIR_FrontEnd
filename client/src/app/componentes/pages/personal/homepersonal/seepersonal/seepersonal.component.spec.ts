import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeepersonalComponent } from './seepersonal.component';

describe('SeepersonalComponent', () => {
  let component: SeepersonalComponent;
  let fixture: ComponentFixture<SeepersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeepersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeepersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
