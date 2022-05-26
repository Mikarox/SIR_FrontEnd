import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeecontratComponent } from './seecontrat.component';

describe('SeecontratComponent', () => {
  let component: SeecontratComponent;
  let fixture: ComponentFixture<SeecontratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeecontratComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeecontratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
