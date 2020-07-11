import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { SharedModule } from '../shared/shared.module';
import {
  AdminCreateUserDialogComponent
} from './components/admin-users/admin-create-user/admin-create-user-dialog.component.html.component';
import { AdminSidenavComponent } from './components/sidenav/admin-sidenav.component';
import { AdminPrincipalComponent } from './components/admin-principal/admin-principal.component';
import { UserModule } from '../user/user.module';
import { AdminJobsDetailsDialogComponent } from './components/admin-users/admin-jobs-details/admin-jobs-details-dialog.component';


@NgModule({
  declarations:
  [
    AdminUsersComponent,
    AdminCreateUserDialogComponent,
    AdminSidenavComponent,
    AdminPrincipalComponent,
    AdminJobsDetailsDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    UserModule
  ],
  entryComponents: [
    AdminCreateUserDialogComponent,
    AdminJobsDetailsDialogComponent
  ]
})
export class AdminModule { }
