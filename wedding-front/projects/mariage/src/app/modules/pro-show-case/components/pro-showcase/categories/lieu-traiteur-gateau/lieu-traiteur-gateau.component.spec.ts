import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LieuTraiteurGateauComponent } from './lieu-traiteur-gateau.component';

describe('LieuTraiteurGateauComponent', () => {
  let component: LieuTraiteurGateauComponent;
  let fixture: ComponentFixture<LieuTraiteurGateauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LieuTraiteurGateauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LieuTraiteurGateauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
