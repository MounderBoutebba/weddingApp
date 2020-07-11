import { Routes, RouterModule } from '@angular/router';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{
    path: '', children: [
      {path: '', component: HowItWorksComponent},
    ]
}];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
})
export class HowItWorksRoutingModule {}