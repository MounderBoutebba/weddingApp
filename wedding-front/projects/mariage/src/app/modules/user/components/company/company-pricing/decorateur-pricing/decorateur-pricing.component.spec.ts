import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecorateurPricingComponent } from './decorateur-pricing.component';

describe('DecorateurPricingComponent', () => {
  let component: DecorateurPricingComponent;
  let fixture: ComponentFixture<DecorateurPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecorateurPricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecorateurPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
