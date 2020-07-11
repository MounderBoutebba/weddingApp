import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPricingComponent } from './company-pricing.component';

describe('CompanyPricingComponent', () => {
  let component: CompanyPricingComponent;
  let fixture: ComponentFixture<CompanyPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyPricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
