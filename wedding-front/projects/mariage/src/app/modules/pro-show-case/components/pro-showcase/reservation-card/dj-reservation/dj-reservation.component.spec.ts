import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DjReservationComponent } from './dj-reservation.component';

describe('DjReservationComponent', () => {
  let component: DjReservationComponent;
  let fixture: ComponentFixture<DjReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DjReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DjReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
