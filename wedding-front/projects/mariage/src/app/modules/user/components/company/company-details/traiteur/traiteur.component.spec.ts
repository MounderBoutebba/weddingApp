import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraiteurComponent } from './traiteur.component';

describe('TraiteurComponent', () => {
  let component: TraiteurComponent;
  let fixture: ComponentFixture<TraiteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraiteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraiteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
