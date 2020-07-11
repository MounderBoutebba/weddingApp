import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BecomeAPartnerComponent } from './become-a-partner/become-a-partner.component';
import { SharedModule } from '../shared/shared.module';
import { ServiceModule } from '../service/service.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BecomeAPartnerRoutingModule } from './become-a-partner.routing';



@NgModule({
  declarations: [BecomeAPartnerComponent],
  imports: [
    CommonModule,
    SharedModule,
    ServiceModule,
    MatAutocompleteModule,
    BecomeAPartnerRoutingModule,
  ]
})
export class BecomeAPartnerModule { }
