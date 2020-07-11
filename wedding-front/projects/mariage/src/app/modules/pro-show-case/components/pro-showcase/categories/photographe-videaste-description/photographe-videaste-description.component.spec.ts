import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographeVideasteDescriptionComponent } from './photographe-videaste-description.component';

describe('PhotographeVideasteDescriptionComponent', () => {
  let component: PhotographeVideasteDescriptionComponent;
  let fixture: ComponentFixture<PhotographeVideasteDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotographeVideasteDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotographeVideasteDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
