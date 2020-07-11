import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoitureBusFilterComponent } from './voiture-bus-filter.component';

describe('VoitureBusFilterComponent', () => {
  let component: VoitureBusFilterComponent;
  let fixture: ComponentFixture<VoitureBusFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoitureBusFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoitureBusFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
