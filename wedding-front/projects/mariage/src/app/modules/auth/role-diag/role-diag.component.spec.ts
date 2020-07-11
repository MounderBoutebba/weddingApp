import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleDiagComponent } from './role-diag.component';

describe('RoleDiagComponent', () => {
  let component: RoleDiagComponent;
  let fixture: ComponentFixture<RoleDiagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleDiagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleDiagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
