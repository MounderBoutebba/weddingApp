import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideasteComponent } from './videaste.component';

describe('VideasteComponent', () => {
  let component: VideasteComponent;
  let fixture: ComponentFixture<VideasteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideasteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideasteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
