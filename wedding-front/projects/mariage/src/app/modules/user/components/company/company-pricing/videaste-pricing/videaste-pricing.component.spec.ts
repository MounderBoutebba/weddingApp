import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideastePricingComponent } from './videaste-pricing.component';

describe('VideastePricingComponent', () => {
  let component: VideastePricingComponent;
  let fixture: ComponentFixture<VideastePricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideastePricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideastePricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
