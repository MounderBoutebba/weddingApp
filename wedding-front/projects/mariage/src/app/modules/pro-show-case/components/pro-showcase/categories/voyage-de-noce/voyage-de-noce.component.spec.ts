import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoyageDeNoceComponent } from './voyage-de-noce.component';

describe('VoyageDeNoceComponent', () => {
  let component: VoyageDeNoceComponent;
  let fixture: ComponentFixture<VoyageDeNoceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoyageDeNoceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoyageDeNoceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
