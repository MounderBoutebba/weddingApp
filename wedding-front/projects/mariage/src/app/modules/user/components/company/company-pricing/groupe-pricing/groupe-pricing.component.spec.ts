import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupePricingComponent } from './groupe-pricing.component';

describe('GroupePricingComponent', () => {
  let component: GroupePricingComponent;
  let fixture: ComponentFixture<GroupePricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupePricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupePricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
