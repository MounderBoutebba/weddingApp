import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographePricingComponent } from './photographe-pricing.component';

describe('PhotographePricingComponent', () => {
  let component: PhotographePricingComponent;
  let fixture: ComponentFixture<PhotographePricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotographePricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotographePricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
