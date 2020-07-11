import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimateurEnfantsComponent } from './animateur-enfants.component';

describe('AnimateurEnfantsComponent', () => {
  let component: AnimateurEnfantsComponent;
  let fixture: ComponentFixture<AnimateurEnfantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimateurEnfantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimateurEnfantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
