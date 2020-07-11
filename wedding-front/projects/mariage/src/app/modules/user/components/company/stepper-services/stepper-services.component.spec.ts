import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperServicesComponent } from './stepper-services.component';

describe('StepperServicesComponent', () => {
  let component: StepperServicesComponent;
  let fixture: ComponentFixture<StepperServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepperServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
