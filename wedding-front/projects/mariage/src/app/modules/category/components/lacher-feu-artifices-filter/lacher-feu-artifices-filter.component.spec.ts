import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LacherFeuArtificesFilterComponent } from './lacher-feu-artifices-filter.component';

describe('LacherFeuArtificesFilterComponent', () => {
  let component: LacherFeuArtificesFilterComponent;
  let fixture: ComponentFixture<LacherFeuArtificesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LacherFeuArtificesFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LacherFeuArtificesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
