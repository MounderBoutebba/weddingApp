import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupSection1Component } from './signup-section1.component';

describe('SignupSection1Component', () => {
  let component: SignupSection1Component;
  let fixture: ComponentFixture<SignupSection1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupSection1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupSection1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
