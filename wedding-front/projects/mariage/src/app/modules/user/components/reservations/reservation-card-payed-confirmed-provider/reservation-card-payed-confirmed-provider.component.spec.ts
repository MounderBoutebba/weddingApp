import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationCardPayedConfirmedProviderComponent } from './reservation-card-payed-confirmed-provider.component';

describe('ReservationCardPayedConfirmedProviderComponent', () => {
  let component: ReservationCardPayedConfirmedProviderComponent;
  let fixture: ComponentFixture<ReservationCardPayedConfirmedProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationCardPayedConfirmedProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationCardPayedConfirmedProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
