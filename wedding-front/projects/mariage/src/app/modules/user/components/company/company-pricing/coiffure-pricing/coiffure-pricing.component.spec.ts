import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoiffurePricingComponent } from './coiffure-pricing.component';

describe('CoiffurePricingComponent', () => {
  let component: CoiffurePricingComponent;
  let fixture: ComponentFixture<CoiffurePricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoiffurePricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoiffurePricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
