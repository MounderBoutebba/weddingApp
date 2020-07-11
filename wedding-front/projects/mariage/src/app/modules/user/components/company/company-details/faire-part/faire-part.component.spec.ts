import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FairePartComponent } from './faire-part.component';

describe('FairePartComponent', () => {
  let component: FairePartComponent;
  let fixture: ComponentFixture<FairePartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FairePartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FairePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
