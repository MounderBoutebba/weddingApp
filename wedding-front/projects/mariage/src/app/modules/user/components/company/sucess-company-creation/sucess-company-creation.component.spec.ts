import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucessCompanyCreationComponent } from './sucess-company-creation.component';

describe('SucessCompanyCreationComponent', () => {
  let component: SucessCompanyCreationComponent;
  let fixture: ComponentFixture<SucessCompanyCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucessCompanyCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucessCompanyCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
