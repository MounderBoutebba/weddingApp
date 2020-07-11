import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRadioOptionDialogComponent } from './add-radio-option-dialog.component';

describe('AddRadioOptionDialogComponent', () => {
  let component: AddRadioOptionDialogComponent;
  let fixture: ComponentFixture<AddRadioOptionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRadioOptionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRadioOptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
