import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeequipamentComponent } from './seeequipament.component';

describe('SeeequipamentComponent', () => {
  let component: SeeequipamentComponent;
  let fixture: ComponentFixture<SeeequipamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeequipamentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeequipamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
