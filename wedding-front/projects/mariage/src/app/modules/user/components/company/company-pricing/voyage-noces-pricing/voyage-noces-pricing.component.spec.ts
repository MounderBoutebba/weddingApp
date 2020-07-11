import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoyageNocesPricingComponent } from './voyage-noces-pricing.component';

describe('VoyageNocesPricingComponent', () => {
  let component: VoyageNocesPricingComponent;
  let fixture: ComponentFixture<VoyageNocesPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoyageNocesPricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoyageNocesPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
