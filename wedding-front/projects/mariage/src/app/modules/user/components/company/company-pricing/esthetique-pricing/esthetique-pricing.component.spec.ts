import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsthetiquePricingComponent } from './esthetique-pricing.component';

describe('EsthetiquePricingComponent', () => {
  let component: EsthetiquePricingComponent;
  let fixture: ComponentFixture<EsthetiquePricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsthetiquePricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsthetiquePricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
