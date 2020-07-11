import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormBuilderComponent } from './dynamic-form-builder.component';

describe('DynamicFormBuilderComponent', () => {
  let component: DynamicFormBuilderComponent;
  let fixture: ComponentFixture<DynamicFormBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
