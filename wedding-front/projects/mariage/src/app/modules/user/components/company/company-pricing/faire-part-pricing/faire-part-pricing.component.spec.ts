import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FairePartPricingComponent } from './faire-part-pricing.component';

describe('FairePartPricingComponent', () => {
  let component: FairePartPricingComponent;
  let fixture: ComponentFixture<FairePartPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FairePartPricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FairePartPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
