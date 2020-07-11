import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoinsEstetiqueMaquillageCoiffureFilterComponent } from './soins-estetique-maquillage-coiffure-filter.component';

describe('SoinsEstetiqueMaquillageCoiffureFilterComponent', () => {
  let component: SoinsEstetiqueMaquillageCoiffureFilterComponent;
  let fixture: ComponentFixture<SoinsEstetiqueMaquillageCoiffureFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoinsEstetiqueMaquillageCoiffureFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoinsEstetiqueMaquillageCoiffureFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
