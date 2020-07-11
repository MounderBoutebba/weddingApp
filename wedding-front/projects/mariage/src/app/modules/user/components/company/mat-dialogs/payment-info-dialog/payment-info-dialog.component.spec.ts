import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentInfoDialogComponent } from './payment-info-dialog.component';

describe('PaymentInfoDialogComponent', () => {
  let component: PaymentInfoDialogComponent;
  let fixture: ComponentFixture<PaymentInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
