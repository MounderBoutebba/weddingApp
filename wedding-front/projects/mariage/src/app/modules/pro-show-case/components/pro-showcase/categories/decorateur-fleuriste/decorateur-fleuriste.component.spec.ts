import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecorateurFleuristeComponent } from './decorateur-fleuriste.component';

describe('DecorateurFleuristeComponent', () => {
  let component: DecorateurFleuristeComponent;
  let fixture: ComponentFixture<DecorateurFleuristeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecorateurFleuristeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecorateurFleuristeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
