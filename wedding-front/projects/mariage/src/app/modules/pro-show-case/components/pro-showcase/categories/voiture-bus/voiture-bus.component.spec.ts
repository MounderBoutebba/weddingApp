import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoitureBusComponent } from './voiture-bus.component';

describe('VoitureBusComponent', () => {
  let component: VoitureBusComponent;
  let fixture: ComponentFixture<VoitureBusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoitureBusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoitureBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
