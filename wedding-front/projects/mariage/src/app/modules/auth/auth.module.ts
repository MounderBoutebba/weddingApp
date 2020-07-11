import {NgModule} from '@angular/core';
import {SignupComponent} from './signup/signup.component';
import {SharedModule} from '../shared/shared.module';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import { RoleDiagComponent } from './role-diag/role-diag.component';


@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    RoleDiagComponent
  ],
  exports: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  entryComponents: [RoleDiagComponent]
})
export class AuthModule { }
