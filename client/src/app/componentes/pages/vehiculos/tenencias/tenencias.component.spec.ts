import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenenciasComponent } from './tenencias.component';

describe('TenenciasComponent', () => {
  let component: TenenciasComponent;
  let fixture: ComponentFixture<TenenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
