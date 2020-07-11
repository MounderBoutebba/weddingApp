import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TogglePrestationInvitesComponent } from './toggle-prestation-invites.component';

describe('TogglePrestationInvitesComponent', () => {
  let component: TogglePrestationInvitesComponent;
  let fixture: ComponentFixture<TogglePrestationInvitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TogglePrestationInvitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TogglePrestationInvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
