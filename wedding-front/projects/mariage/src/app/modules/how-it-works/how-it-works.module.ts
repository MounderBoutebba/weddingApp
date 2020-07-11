import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HowItWorksRoutingModule } from './how-it-works.routing';
import { SharedModule } from '../shared/shared.module';
import { ServiceModule } from '../service/service.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
@NgModule({
  imports: [
    CommonModule,
    HowItWorksRoutingModule,
    SharedModule,
    ServiceModule,
    MatAutocompleteModule,
  ],
  declarations: [HowItWorksComponent]
})
export class HowItWorksModule { }
