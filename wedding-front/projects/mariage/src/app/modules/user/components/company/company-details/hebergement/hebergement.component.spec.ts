import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HebergementComponent } from './hebergement.component';

describe('HebergementComponent', () => {
  let component: HebergementComponent;
  let fixture: ComponentFixture<HebergementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HebergementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HebergementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
