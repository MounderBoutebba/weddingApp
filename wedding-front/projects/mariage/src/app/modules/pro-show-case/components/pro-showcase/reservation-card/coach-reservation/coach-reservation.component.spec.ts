import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachReservationComponent } from './coach-reservation.component';

describe('CoachReservationComponent', () => {
  let component: CoachReservationComponent;
  let fixture: ComponentFixture<CoachReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
