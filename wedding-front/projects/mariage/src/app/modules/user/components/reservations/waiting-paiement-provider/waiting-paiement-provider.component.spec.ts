import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingPaiementProviderComponent } from './waiting-paiement-provider.component';

describe('WaitingPaiementProviderComponent', () => {
  let component: WaitingPaiementProviderComponent;
  let fixture: ComponentFixture<WaitingPaiementProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingPaiementProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingPaiementProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
