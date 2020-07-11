import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GateauMariageComponent } from './gateau-mariage.component';

describe('GateauMariageComponent', () => {
  let component: GateauMariageComponent;
  let fixture: ComponentFixture<GateauMariageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GateauMariageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GateauMariageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
