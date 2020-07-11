import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachPricingComponent } from './coach-pricing.component';

describe('CoachPricingComponent', () => {
  let component: CoachPricingComponent;
  let fixture: ComponentFixture<CoachPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachPricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
