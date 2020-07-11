import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoregrapheComponent } from './choregraphe.component';

describe('ChoregrapheComponent', () => {
  let component: ChoregrapheComponent;
  let fixture: ComponentFixture<ChoregrapheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoregrapheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoregrapheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
