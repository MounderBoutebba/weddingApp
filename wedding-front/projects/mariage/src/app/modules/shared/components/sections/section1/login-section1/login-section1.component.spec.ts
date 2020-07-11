import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSection1Component } from './login-section1.component';

describe('LoginSection1Component', () => {
  let component: LoginSection1Component;
  let fixture: ComponentFixture<LoginSection1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSection1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSection1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
