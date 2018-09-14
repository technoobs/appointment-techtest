import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentShowComponent } from './appointment-show.component';

describe('AppointmentShowComponent', () => {
  let component: AppointmentShowComponent;
  let fixture: ComponentFixture<AppointmentShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
