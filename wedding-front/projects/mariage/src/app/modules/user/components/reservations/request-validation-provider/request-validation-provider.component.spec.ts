import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestValidationProviderComponent } from './request-validation-provider.component';

describe('RequestValidationProviderComponent', () => {
  let component: RequestValidationProviderComponent;
  let fixture: ComponentFixture<RequestValidationProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestValidationProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestValidationProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
