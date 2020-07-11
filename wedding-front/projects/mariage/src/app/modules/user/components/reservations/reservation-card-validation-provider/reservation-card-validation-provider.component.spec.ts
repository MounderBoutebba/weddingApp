import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationCardValidationProviderComponent } from './reservation-card-validation-provider.component';

describe('ReservationCardValidationProviderComponent', () => {
  let component: ReservationCardValidationProviderComponent;
  let fixture: ComponentFixture<ReservationCardValidationProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationCardValidationProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationCardValidationProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
