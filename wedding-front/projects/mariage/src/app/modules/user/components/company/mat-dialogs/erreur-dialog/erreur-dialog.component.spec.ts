import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErreurDialogComponent } from './erreur-dialog.component';

describe('ErreurDialogComponent', () => {
  let component: ErreurDialogComponent;
  let fixture: ComponentFixture<ErreurDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErreurDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErreurDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
