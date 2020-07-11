import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficiantPricingComponent } from './officiant-pricing.component';

describe('OfficiantPricingComponent', () => {
  let component: OfficiantPricingComponent;
  let fixture: ComponentFixture<OfficiantPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficiantPricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficiantPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
