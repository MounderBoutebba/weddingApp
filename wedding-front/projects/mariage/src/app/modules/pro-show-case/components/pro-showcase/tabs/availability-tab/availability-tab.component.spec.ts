import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityTabComponent } from './availability-tab.component';

describe('AvailabilityTabComponent', () => {
  let component: AvailabilityTabComponent;
  let fixture: ComponentFixture<AvailabilityTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailabilityTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilityTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
