import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimateurEnfantsPricingComponent } from './animateur-enfants-pricing.component';

describe('AnimateurEnfantsPricingComponent', () => {
  let component: AnimateurEnfantsPricingComponent;
  let fixture: ComponentFixture<AnimateurEnfantsPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimateurEnfantsPricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimateurEnfantsPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
