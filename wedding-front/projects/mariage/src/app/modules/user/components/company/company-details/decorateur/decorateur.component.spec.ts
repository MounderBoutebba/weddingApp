import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecorateurComponent } from './decorateur.component';

describe('DecorateurComponent', () => {
  let component: DecorateurComponent;
  let fixture: ComponentFixture<DecorateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecorateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecorateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
