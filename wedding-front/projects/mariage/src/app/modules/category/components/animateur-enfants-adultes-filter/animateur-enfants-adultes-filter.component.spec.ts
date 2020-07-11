import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimateurEnfantsAdultesFilterComponent } from './animateur-enfants-adultes-filter.component';

describe('AnimateurEnfantsAdultesFilterComponent', () => {
  let component: AnimateurEnfantsAdultesFilterComponent;
  let fixture: ComponentFixture<AnimateurEnfantsAdultesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimateurEnfantsAdultesFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimateurEnfantsAdultesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
