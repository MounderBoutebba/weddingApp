import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBetaComponent } from './home-beta.component';

describe('HomeBetaComponent', () => {
  let component: HomeBetaComponent;
  let fixture: ComponentFixture<HomeBetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
