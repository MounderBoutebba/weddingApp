import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DjGroupeMusicienFilterComponent } from './dj-groupe-musicien-filter.component';

describe('DjGroupeMusicienFilterComponent', () => {
  let component: DjGroupeMusicienFilterComponent;
  let fixture: ComponentFixture<DjGroupeMusicienFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DjGroupeMusicienFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DjGroupeMusicienFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
