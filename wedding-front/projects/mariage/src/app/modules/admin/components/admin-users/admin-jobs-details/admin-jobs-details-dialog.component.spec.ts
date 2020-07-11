import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJobsDetailsDialogComponent } from './admin-jobs-details-dialog.component';

describe('AdminJobsDetailsDialogComponent', () => {
  let component: AdminJobsDetailsDialogComponent;
  let fixture: ComponentFixture<AdminJobsDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminJobsDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminJobsDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
