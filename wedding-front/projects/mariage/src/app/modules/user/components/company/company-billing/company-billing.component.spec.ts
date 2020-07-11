import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBillingComponent } from './company-billing.component';

describe('CompanyBillingComponent', () => {
  let component: CompanyBillingComponent;
  let fixture: ComponentFixture<CompanyBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
