import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaquillagePricingComponent } from './maquillage-pricing.component';

describe('MaquillagePricingComponent', () => {
  let component: MaquillagePricingComponent;
  let fixture: ComponentFixture<MaquillagePricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaquillagePricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaquillagePricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
