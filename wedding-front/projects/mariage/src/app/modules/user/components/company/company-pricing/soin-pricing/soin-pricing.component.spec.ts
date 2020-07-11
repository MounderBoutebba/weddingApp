import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoinPricingComponent } from './soin-pricing.component';

describe('SoinPricingComponent', () => {
  let component: SoinPricingComponent;
  let fixture: ComponentFixture<SoinPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoinPricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoinPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
