import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusPricingComponent } from './bus-pricing.component';

describe('BusPricingComponent', () => {
  let component: BusPricingComponent;
  let fixture: ComponentFixture<BusPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusPricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
