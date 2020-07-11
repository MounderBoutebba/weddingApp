import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoiffureMaquillageEsthetiqueSoinsReservationComponent } from './coiffure-maquillage-esthetique-soins-reservation.component';

describe('CoiffureMaquillageEsthetiqueSoinsReservationComponent', () => {
  let component: CoiffureMaquillageEsthetiqueSoinsReservationComponent;
  let fixture: ComponentFixture<CoiffureMaquillageEsthetiqueSoinsReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoiffureMaquillageEsthetiqueSoinsReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoiffureMaquillageEsthetiqueSoinsReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
