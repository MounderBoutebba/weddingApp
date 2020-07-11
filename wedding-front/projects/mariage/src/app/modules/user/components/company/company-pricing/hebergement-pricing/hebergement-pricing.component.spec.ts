import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HebergementPricingComponent } from './hebergement-pricing.component';

describe('HebergementPricingComponent', () => {
  let component: HebergementPricingComponent;
  let fixture: ComponentFixture<HebergementPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HebergementPricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HebergementPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
