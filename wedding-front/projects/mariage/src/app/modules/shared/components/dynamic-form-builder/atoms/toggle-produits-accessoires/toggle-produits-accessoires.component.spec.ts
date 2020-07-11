import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleProduitsAccessoiresComponent } from './toggle-produits-accessoires.component';

describe('ToggleProduitsAccessoiresComponent', () => {
  let component: ToggleProduitsAccessoiresComponent;
  let fixture: ComponentFixture<ToggleProduitsAccessoiresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleProduitsAccessoiresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleProduitsAccessoiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
