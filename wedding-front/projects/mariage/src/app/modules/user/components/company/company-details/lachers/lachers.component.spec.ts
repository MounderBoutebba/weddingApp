import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LachersComponent } from './lachers.component';

describe('LachersComponent', () => {
  let component: LachersComponent;
  let fixture: ComponentFixture<LachersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LachersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
