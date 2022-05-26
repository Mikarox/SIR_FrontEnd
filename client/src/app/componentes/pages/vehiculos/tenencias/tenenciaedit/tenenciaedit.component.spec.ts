import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenenciaeditComponent } from './tenenciaedit.component';

describe('TenenciaeditComponent', () => {
  let component: TenenciaeditComponent;
  let fixture: ComponentFixture<TenenciaeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenenciaeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenenciaeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
