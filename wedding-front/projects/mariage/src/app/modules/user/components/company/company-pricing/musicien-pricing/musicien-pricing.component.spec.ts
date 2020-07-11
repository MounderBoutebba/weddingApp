import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicienPricingComponent } from './musicien-pricing.component';

describe('MusicienPricingComponent', () => {
  let component: MusicienPricingComponent;
  let fixture: ComponentFixture<MusicienPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicienPricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicienPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
