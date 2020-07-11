import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographeVideasteFilterComponent } from './photographe-videaste-filter.component';

describe('PhotographeVideasteFilterComponent', () => {
  let component: PhotographeVideasteFilterComponent;
  let fixture: ComponentFixture<PhotographeVideasteFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotographeVideasteFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotographeVideasteFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
