import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleuristePricingComponent } from './fleuriste-pricing.component';

describe('FleuristePricingComponent', () => {
  let component: FleuristePricingComponent;
  let fixture: ComponentFixture<FleuristePricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleuristePricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleuristePricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
