import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoinComponent } from './soin.component';

describe('SoinComponent', () => {
  let component: SoinComponent;
  let fixture: ComponentFixture<SoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
