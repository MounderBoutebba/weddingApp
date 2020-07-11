import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultWidgetComponent } from './search-result-widget.component';

describe('SearchResultWidgetComponent', () => {
  let component: SearchResultWidgetComponent;
  let fixture: ComponentFixture<SearchResultWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
