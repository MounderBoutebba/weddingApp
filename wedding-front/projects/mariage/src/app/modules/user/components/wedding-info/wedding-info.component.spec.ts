import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeddingInfoComponent } from './wedding-info.component';

describe('WeddingInfoComponent', () => {
  let component: WeddingInfoComponent;
  let fixture: ComponentFixture<WeddingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeddingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeddingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
