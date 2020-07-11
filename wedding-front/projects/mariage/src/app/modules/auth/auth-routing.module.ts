import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import { RoleDiagComponent } from './role-diag/role-diag.component';

const routes: Routes = [{
    path: '', children: [
      {path: 'signup', component: SignupComponent},
      {path: 'login', component: LoginComponent},
      {path: 'confirm-social', component: RoleDiagComponent}
    ]
  }];


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthRoutingModule {
}
