import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleProductsListComponent } from './toggle-products-list.component';

describe('ToggleProductsListComponent', () => {
  let component: ToggleProductsListComponent;
  let fixture: ComponentFixture<ToggleProductsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleProductsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
