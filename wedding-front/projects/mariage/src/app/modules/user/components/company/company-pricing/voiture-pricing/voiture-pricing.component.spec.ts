import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiturePricingComponent } from './voiture-pricing.component';

describe('VoiturePricingComponent', () => {
  let component: VoiturePricingComponent;
  let fixture: ComponentFixture<VoiturePricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoiturePricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiturePricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
