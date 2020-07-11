import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import { HomeBetaComponent } from './home-beta/home-beta.component';

const routes: Routes = [{
  path: '', children: [
    // {path: '', component: HomeComponent},
    {path: '', component: HomeBetaComponent},
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule {
}
