import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationCardAvisProComponent } from './reservation-card-avis-pro.component';

describe('ReservationCardAvisProComponent', () => {
  let component: ReservationCardAvisProComponent;
  let fixture: ComponentFixture<ReservationCardAvisProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationCardAvisProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationCardAvisProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
