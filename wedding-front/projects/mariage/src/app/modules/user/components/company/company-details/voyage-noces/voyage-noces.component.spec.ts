import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoyageNocesComponent } from './voyage-noces.component';

describe('VoyageNocesComponent', () => {
  let component: VoyageNocesComponent;
  let fixture: ComponentFixture<VoyageNocesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoyageNocesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoyageNocesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
