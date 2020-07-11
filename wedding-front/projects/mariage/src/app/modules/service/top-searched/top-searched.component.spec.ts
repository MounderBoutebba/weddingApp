import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSearchedComponent } from './top-searched.component';

describe('TopSearchedComponent', () => {
  let component: TopSearchedComponent;
  let fixture: ComponentFixture<TopSearchedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopSearchedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSearchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
