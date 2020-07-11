import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeuArtificesPricingComponent } from './feu-artifices-pricing.component';

describe('FeuArtificesPricingComponent', () => {
  let component: FeuArtificesPricingComponent;
  let fixture: ComponentFixture<FeuArtificesPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeuArtificesPricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeuArtificesPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
