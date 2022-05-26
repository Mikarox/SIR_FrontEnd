import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVerificacionComponent } from './edit-verificacion.component';

describe('EditVerificacionComponent', () => {
  let component: EditVerificacionComponent;
  let fixture: ComponentFixture<EditVerificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVerificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVerificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
