import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficiantReservationComponent } from './officiant-reservation.component';

describe('OfficiantReservationComponent', () => {
  let component: OfficiantReservationComponent;
  let fixture: ComponentFixture<OfficiantReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficiantReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficiantReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
