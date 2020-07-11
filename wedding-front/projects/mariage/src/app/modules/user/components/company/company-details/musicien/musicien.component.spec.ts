import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicienComponent } from './musicien.component';

describe('MusicienComponent', () => {
  let component: MusicienComponent;
  let fixture: ComponentFixture<MusicienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
