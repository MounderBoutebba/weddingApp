import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProGeneralInfosComponent } from './pro-general-infos.component';

describe('ProGeneralInfosComponent', () => {
  let component: ProGeneralInfosComponent;
  let fixture: ComponentFixture<ProGeneralInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProGeneralInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProGeneralInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
