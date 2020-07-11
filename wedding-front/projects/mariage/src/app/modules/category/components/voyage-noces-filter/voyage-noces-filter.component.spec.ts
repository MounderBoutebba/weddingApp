import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoyageNocesFilterComponent } from './voyage-noces-filter.component';

describe('VoyageNocesFilterComponent', () => {
  let component: VoyageNocesFilterComponent;
  let fixture: ComponentFixture<VoyageNocesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoyageNocesFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoyageNocesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
