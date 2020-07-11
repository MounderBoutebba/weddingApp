import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BecomeAPartnerComponent } from './become-a-partner/become-a-partner.component';

const routes: Routes = [{
    path: '', children: [
      {path: '', component: BecomeAPartnerComponent},
    ]
}];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
})
export class BecomeAPartnerRoutingModule { }
