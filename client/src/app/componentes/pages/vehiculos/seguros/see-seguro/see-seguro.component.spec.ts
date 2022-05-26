import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeSeguroComponent } from './see-seguro.component';

describe('SeeSeguroComponent', () => {
  let component: SeeSeguroComponent;
  let fixture: ComponentFixture<SeeSeguroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeSeguroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
