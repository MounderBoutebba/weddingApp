import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleNumberRadioListComponent } from './toggle-number-radio-list.component';

describe('ToggleNumberRadioListComponent', () => {
  let component: ToggleNumberRadioListComponent;
  let fixture: ComponentFixture<ToggleNumberRadioListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleNumberRadioListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleNumberRadioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
