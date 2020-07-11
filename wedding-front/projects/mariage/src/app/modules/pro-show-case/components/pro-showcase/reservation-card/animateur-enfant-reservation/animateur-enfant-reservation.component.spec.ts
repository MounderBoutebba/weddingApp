import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimateurEnfantReservationComponent } from './animateur-enfant-reservation.component';

describe('AnimateurEnfantReservationComponent', () => {
  let component: AnimateurEnfantReservationComponent;
  let fixture: ComponentFixture<AnimateurEnfantReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimateurEnfantReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimateurEnfantReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
