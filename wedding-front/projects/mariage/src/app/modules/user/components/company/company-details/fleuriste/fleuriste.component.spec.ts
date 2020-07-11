import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleuristeComponent } from './fleuriste.component';

describe('FleuristeComponent', () => {
  let component: FleuristeComponent;
  let fixture: ComponentFixture<FleuristeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleuristeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleuristeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
