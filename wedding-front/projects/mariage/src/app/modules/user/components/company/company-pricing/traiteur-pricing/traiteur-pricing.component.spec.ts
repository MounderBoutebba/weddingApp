import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraiteurPricingComponent } from './traiteur-pricing.component';

describe('TraiteurPricingComponent', () => {
  let component: TraiteurPricingComponent;
  let fixture: ComponentFixture<TraiteurPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraiteurPricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraiteurPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
