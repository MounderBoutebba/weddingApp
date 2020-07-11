import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LieuTraiteurGateauxReservationComponent } from './lieu-traiteur-gateaux-reservation.component';

describe('LieuTraiteurGateauxReservationComponent', () => {
  let component: LieuTraiteurGateauxReservationComponent;
  let fixture: ComponentFixture<LieuTraiteurGateauxReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LieuTraiteurGateauxReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LieuTraiteurGateauxReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
