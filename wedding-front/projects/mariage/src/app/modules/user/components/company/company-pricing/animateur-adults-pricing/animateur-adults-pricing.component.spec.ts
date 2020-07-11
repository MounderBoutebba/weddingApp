import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimateurAdultsPricingComponent } from './animateur-adults-pricing.component';

describe('AnimateurAdultsPricingComponent', () => {
  let component: AnimateurAdultsPricingComponent;
  let fixture: ComponentFixture<AnimateurAdultsPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimateurAdultsPricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimateurAdultsPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
