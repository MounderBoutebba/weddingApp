import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqSidenavComponent } from './faq-sidenav.component';

describe('FaqSidenavComponent', () => {
  let component: FaqSidenavComponent;
  let fixture: ComponentFixture<FaqSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
