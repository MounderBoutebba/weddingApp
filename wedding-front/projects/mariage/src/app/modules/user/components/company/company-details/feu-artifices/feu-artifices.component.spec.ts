import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeuArtificesComponent } from './feu-artifices.component';

describe('FeuArtificesComponent', () => {
  let component: FeuArtificesComponent;
  let fixture: ComponentFixture<FeuArtificesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeuArtificesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeuArtificesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
