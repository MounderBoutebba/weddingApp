import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationCardWaitingValidationOfProviderComponent } from './reservation-card-waiting-validation-of-provider.component';

describe('ReservationCardWaitingValidationOfProviderComponent', () => {
  let component: ReservationCardWaitingValidationOfProviderComponent;
  let fixture: ComponentFixture<ReservationCardWaitingValidationOfProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationCardWaitingValidationOfProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationCardWaitingValidationOfProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
