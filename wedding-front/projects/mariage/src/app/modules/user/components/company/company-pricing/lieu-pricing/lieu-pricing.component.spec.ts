import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LieuPricingComponent } from './lieu-pricing.component';

describe('LieuPricingComponent', () => {
  let component: LieuPricingComponent;
  let fixture: ComponentFixture<LieuPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LieuPricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LieuPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
