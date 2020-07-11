import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HebergementFilterComponent } from './hebergement-filter.component';

describe('HebergementFilterComponent', () => {
  let component: HebergementFilterComponent;
  let fixture: ComponentFixture<HebergementFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HebergementFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HebergementFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
