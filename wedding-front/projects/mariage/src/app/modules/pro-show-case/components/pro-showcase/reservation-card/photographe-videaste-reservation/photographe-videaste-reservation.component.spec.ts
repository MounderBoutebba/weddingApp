import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographeVideasteReservationComponent } from './photographe-videaste-reservation.component';

describe('PhotographeVideasteReservationComponent', () => {
  let component: PhotographeVideasteReservationComponent;
  let fixture: ComponentFixture<PhotographeVideasteReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotographeVideasteReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotographeVideasteReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
