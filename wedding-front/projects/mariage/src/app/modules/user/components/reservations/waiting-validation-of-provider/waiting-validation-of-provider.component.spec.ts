import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingValidationOfProviderComponent } from './waiting-validation-of-provider.component';

describe('WaitingValidationOfProviderComponent', () => {
  let component: WaitingValidationOfProviderComponent;
  let fixture: ComponentFixture<WaitingValidationOfProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingValidationOfProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingValidationOfProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
