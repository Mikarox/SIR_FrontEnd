import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalNavComponent } from './personal-nav.component';

describe('PersonalNavComponent', () => {
  let component: PersonalNavComponent;
  let fixture: ComponentFixture<PersonalNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
