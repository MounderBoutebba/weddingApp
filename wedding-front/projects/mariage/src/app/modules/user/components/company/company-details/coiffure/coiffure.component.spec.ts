import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoiffureComponent } from './coiffure.component';

describe('CoiffureComponent', () => {
  let component: CoiffureComponent;
  let fixture: ComponentFixture<CoiffureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoiffureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoiffureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
