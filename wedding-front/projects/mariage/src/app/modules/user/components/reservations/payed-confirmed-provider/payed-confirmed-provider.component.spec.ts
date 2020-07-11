import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayedConfirmedProviderComponent } from './payed-confirmed-provider.component';

describe('PayedConfirmedProviderComponent', () => {
  let component: PayedConfirmedProviderComponent;
  let fixture: ComponentFixture<PayedConfirmedProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayedConfirmedProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayedConfirmedProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
