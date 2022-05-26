import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLicenciaComponent } from './edit-licencia.component';

describe('EditLicenciaComponent', () => {
  let component: EditLicenciaComponent;
  let fixture: ComponentFixture<EditLicenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLicenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLicenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
