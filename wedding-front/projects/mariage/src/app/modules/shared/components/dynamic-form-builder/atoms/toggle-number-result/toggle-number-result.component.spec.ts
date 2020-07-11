import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleNumberResultComponent } from './toggle-number-result.component';

describe('ToggleNumberResultComponent', () => {
  let component: ToggleNumberResultComponent;
  let fixture: ComponentFixture<ToggleNumberResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleNumberResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleNumberResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
