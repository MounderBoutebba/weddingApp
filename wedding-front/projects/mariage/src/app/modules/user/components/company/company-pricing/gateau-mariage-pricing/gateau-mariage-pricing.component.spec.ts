import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GateauMariagePricingComponent } from './gateau-mariage-pricing.component';

describe('GateauMariagePricingComponent', () => {
  let component: GateauMariagePricingComponent;
  let fixture: ComponentFixture<GateauMariagePricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GateauMariagePricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GateauMariagePricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
