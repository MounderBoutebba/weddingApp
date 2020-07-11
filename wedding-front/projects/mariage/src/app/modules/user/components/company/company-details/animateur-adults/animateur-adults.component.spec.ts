import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimateurAdultsComponent } from './animateur-adults.component';

describe('AnimateurAdultsComponent', () => {
  let component: AnimateurAdultsComponent;
  let fixture: ComponentFixture<AnimateurAdultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimateurAdultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimateurAdultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
