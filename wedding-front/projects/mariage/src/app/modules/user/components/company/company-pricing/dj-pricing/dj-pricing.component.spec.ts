import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DjPricingComponent } from './dj-pricing.component';

describe('DjPricingComponent', () => {
  let component: DjPricingComponent;
  let fixture: ComponentFixture<DjPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DjPricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DjPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
