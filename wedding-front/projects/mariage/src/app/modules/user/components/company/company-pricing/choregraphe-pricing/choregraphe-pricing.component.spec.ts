import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoregraphePricingComponent } from './choregraphe-pricing.component';

describe('ChoregraphePricingComponent', () => {
  let component: ChoregraphePricingComponent;
  let fixture: ComponentFixture<ChoregraphePricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoregraphePricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoregraphePricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
