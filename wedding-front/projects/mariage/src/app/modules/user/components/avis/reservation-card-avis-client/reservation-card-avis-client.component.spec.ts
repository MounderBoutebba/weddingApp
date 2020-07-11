import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationCardAvisClientComponent } from './reservation-card-avis-client.component';

describe('ReservationCardAvisClientComponent', () => {
  let component: ReservationCardAvisClientComponent;
  let fixture: ComponentFixture<ReservationCardAvisClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationCardAvisClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationCardAvisClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
