import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateUserDialogComponent } from './admin-create-user-dialog.component.html.component';

describe('AdminCreateUserDialogComponent', () => {
  let component: AdminCreateUserDialogComponent;
  let fixture: ComponentFixture<AdminCreateUserDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCreateUserDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
