import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProShowcaseComponent } from './pro-showcase.component';

describe('ProShowcaseComponent', () => {
  let component: ProShowcaseComponent;
  let fixture: ComponentFixture<ProShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
