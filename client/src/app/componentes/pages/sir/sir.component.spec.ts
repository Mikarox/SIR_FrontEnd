import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SirComponent } from './sir.component';

describe('SirComponent', () => {
  let component: SirComponent;
  let fixture: ComponentFixture<SirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
