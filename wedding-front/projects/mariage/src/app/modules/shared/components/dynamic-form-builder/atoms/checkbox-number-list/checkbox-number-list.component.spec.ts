import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxNumberListComponent } from './checkbox-number-list.component';

describe('CheckboxNumberListComponent', () => {
  let component: CheckboxNumberListComponent;
  let fixture: ComponentFixture<CheckboxNumberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxNumberListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxNumberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
