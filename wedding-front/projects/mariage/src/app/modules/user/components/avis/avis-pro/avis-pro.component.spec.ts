import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisProComponent } from './avis-pro.component';

describe('AvisProComponent', () => {
  let component: AvisProComponent;
  let fixture: ComponentFixture<AvisProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
