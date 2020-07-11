import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleMajorationComponent } from './toggle-majoration.component';

describe('ToggleMajorationComponent', () => {
  let component: ToggleMajorationComponent;
  let fixture: ComponentFixture<ToggleMajorationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleMajorationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleMajorationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
