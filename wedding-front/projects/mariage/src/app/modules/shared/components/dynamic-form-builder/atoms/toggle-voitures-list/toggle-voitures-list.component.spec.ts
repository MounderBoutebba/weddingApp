import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleVoituresListComponent } from './toggle-voitures-list.component';

describe('ToggleVoituresListComponent', () => {
  let component: ToggleVoituresListComponent;
  let fixture: ComponentFixture<ToggleVoituresListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleVoituresListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleVoituresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
