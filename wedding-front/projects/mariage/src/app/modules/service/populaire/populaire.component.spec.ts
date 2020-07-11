import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulaireComponent } from './populaire.component';

describe('PopulaireComponent', () => {
  let component: PopulaireComponent;
  let fixture: ComponentFixture<PopulaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopulaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
