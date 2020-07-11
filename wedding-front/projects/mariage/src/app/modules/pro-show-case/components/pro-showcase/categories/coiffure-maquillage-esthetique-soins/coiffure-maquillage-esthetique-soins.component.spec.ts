import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoiffureMaquillageEsthetiqueSoinsComponent } from './coiffure-maquillage-esthetique-soins.component';

describe('CoiffureMaquillageEsthetiqueSoinsComponent', () => {
  let component: CoiffureMaquillageEsthetiqueSoinsComponent;
  let fixture: ComponentFixture<CoiffureMaquillageEsthetiqueSoinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoiffureMaquillageEsthetiqueSoinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoiffureMaquillageEsthetiqueSoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
