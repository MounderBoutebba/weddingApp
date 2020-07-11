import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AuthGuard } from '../../guards/auth.guard';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';
import { AdminPrincipalComponent } from './components/admin-principal/admin-principal.component';
import { CompanyInfoComponent } from '../user/components/company/company-info/company-info.component';
import { CompanyResolver } from '../user/resolvers/company.resolver';
import { CompanyDetailsComponent } from '../user/components/company/company-details/company-details.component';
import { CompanyDetailsResolver } from '../user/resolvers/company-details.resolver';
import { CompanyPricingComponent } from '../user/components/company/company-pricing/company-pricing.component';
import { CompanySettingsComponent } from '../user/components/company/company-settings/company-settings.component';
import { CompanyBillingComponent } from '../user/components/company/company-billing/company-billing.component';


const routes: Routes = [
  {
    path: ':adminEmail',
    component: AdminPrincipalComponent,
    children: [
      {
        path: '',
				redirectTo: 'users'
      },
      {
        path: 'users',
				component: AdminUsersComponent,
				canActivate: [AuthGuard],
				canDeactivate: [CanDeactivateGuard],
				data: {
					roles: 'admin'
				}
      },
      {
				path: 'company-admin/:email/edit/company',
				component: CompanyInfoComponent,
				resolve: { company: CompanyResolver },
				canActivate: [AuthGuard],
				canDeactivate: [CanDeactivateGuard],
				data: {
					roles: 'admin'
				}
			},
			{
				path: 'company-admin/:email/edit/company-details/:service',
				component: CompanyDetailsComponent,
				resolve: { companyDetails: CompanyDetailsResolver },
				canActivate: [AuthGuard],
				canDeactivate: [CanDeactivateGuard],
				data: {
					roles: 'admin'
				}
			},
			{
				path: 'company-admin/:email/edit/company-pricing/:service',
				component: CompanyPricingComponent,
				resolve: { companyDetails: CompanyDetailsResolver },
				canActivate: [AuthGuard],
				canDeactivate: [CanDeactivateGuard],
				data: {
					roles: 'admin'
				}
			},
			{
				path: 'company-admin/:email/edit/company-settings',
				component: CompanySettingsComponent,
				canActivate: [AuthGuard],
				canDeactivate: [CanDeactivateGuard],
				data: {
					roles: 'admin'
				}
			},
			{
				path: 'company-admin/:email/edit/company-billing',
				component: CompanyBillingComponent,
				canActivate: [AuthGuard],
				canDeactivate: [CanDeactivateGuard],
				data: {
					roles: 'admin'
				}
			}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
