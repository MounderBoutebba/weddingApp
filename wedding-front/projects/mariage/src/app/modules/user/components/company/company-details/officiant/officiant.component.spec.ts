import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficiantComponent } from './officiant.component';

describe('OfficiantComponent', () => {
  let component: OfficiantComponent;
  let fixture: ComponentFixture<OfficiantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficiantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
