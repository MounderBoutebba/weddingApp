import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FairePartFilterComponent } from './faire-part-filter.component';

describe('FairePartFilterComponent', () => {
  let component: FairePartFilterComponent;
  let fixture: ComponentFixture<FairePartFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FairePartFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FairePartFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
