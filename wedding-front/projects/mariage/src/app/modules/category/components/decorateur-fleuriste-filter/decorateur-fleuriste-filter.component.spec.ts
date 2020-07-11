import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecorateurFleuristeFilterComponent } from './decorateur-fleuriste-filter.component';

describe('DecorateurFleuristeFilterComponent', () => {
  let component: DecorateurFleuristeFilterComponent;
  let fixture: ComponentFixture<DecorateurFleuristeFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecorateurFleuristeFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecorateurFleuristeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
