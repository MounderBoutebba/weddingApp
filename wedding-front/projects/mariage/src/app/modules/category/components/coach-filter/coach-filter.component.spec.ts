import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachFilterComponent } from './coach-filter.component';

describe('CoachFilterComponent', () => {
  let component: CoachFilterComponent;
  let fixture: ComponentFixture<CoachFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
