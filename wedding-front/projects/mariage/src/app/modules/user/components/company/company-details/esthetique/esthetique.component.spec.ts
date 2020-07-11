import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsthetiqueComponent } from './esthetique.component';

describe('EsthetiqueComponent', () => {
  let component: EsthetiqueComponent;
  let fixture: ComponentFixture<EsthetiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsthetiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsthetiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
