import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSirComponent } from './home-sir.component';

describe('HomeSirComponent', () => {
  let component: HomeSirComponent;
  let fixture: ComponentFixture<HomeSirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
