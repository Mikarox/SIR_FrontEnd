import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLicenciaComponent } from './home-licencia.component';

describe('HomeLicenciaComponent', () => {
  let component: HomeLicenciaComponent;
  let fixture: ComponentFixture<HomeLicenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeLicenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLicenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
