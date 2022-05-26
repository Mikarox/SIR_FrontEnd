import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomevehiculosComponent } from './homevehiculos.component';

describe('HomevehiculosComponent', () => {
  let component: HomevehiculosComponent;
  let fixture: ComponentFixture<HomevehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomevehiculosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomevehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
