import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationCardWaitingPaiementProviderComponent } from './reservation-card-waiting-paiement-provider.component';

describe('ReservationCardWaitingPaiementProviderComponent', () => {
  let component: ReservationCardWaitingPaiementProviderComponent;
  let fixture: ComponentFixture<ReservationCardWaitingPaiementProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationCardWaitingPaiementProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationCardWaitingPaiementProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
