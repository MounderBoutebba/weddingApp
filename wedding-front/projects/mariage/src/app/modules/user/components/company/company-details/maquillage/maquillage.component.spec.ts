import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaquillageComponent } from './maquillage.component';

describe('MaquillageComponent', () => {
  let component: MaquillageComponent;
  let fixture: ComponentFixture<MaquillageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaquillageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaquillageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
