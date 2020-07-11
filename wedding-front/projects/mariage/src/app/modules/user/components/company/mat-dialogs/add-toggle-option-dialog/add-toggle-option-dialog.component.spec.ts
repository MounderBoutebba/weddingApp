import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToggleOptionDialogComponent } from './add-toggle-option-dialog.component';

describe('AddToggleOptionDialogComponent', () => {
  let component: AddToggleOptionDialogComponent;
  let fixture: ComponentFixture<AddToggleOptionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToggleOptionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToggleOptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
