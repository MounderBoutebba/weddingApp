import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LachersPricingComponent } from './lachers-pricing.component';

describe('LachersPricingComponent', () => {
  let component: LachersPricingComponent;
  let fixture: ComponentFixture<LachersPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LachersPricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LachersPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
