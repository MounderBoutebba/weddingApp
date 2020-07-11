import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleNumberListComponent } from './toggle-number-list.component';

describe('ToggleNumberListComponent', () => {
  let component: ToggleNumberListComponent;
  let fixture: ComponentFixture<ToggleNumberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleNumberListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleNumberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
