import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecorateurFleuristeReservationComponent } from './decorateur-fleuriste-reservation.component';

describe('DecorateurFleuristeReservationComponent', () => {
  let component: DecorateurFleuristeReservationComponent;
  let fixture: ComponentFixture<DecorateurFleuristeReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecorateurFleuristeReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecorateurFleuristeReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
