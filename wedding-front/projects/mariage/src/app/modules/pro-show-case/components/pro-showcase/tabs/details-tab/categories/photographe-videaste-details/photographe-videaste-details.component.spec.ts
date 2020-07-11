import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographeVideasteDetailsComponent } from './photographe-videaste-details.component';

describe('PhotographeVideasteDetailsComponent', () => {
  let component: PhotographeVideasteDetailsComponent;
  let fixture: ComponentFixture<PhotographeVideasteDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotographeVideasteDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotographeVideasteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
