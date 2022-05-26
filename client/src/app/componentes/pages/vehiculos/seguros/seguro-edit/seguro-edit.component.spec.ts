import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguroEditComponent } from './seguro-edit.component';

describe('SeguroEditComponent', () => {
  let component: SeguroEditComponent;
  let fixture: ComponentFixture<SeguroEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguroEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguroEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
