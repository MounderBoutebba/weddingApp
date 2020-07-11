import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCheckboxOptionDialogComponent } from './add-checkbox-option-dialog.component';

describe('AddCheckboxOptionDialogComponent', () => {
  let component: AddCheckboxOptionDialogComponent;
  let fixture: ComponentFixture<AddCheckboxOptionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCheckboxOptionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCheckboxOptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
