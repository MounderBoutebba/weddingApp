import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { UserResolver } from './resolvers/user.resolver';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { WeddingInfoComponent } from './components/wedding-info/wedding-info.component';
import { WeddingResolver } from './resolvers/wedding.resolver';
import { CompanyInfoComponent } from './components/company/company-info/company-info.component';
import { CompanyResolver } from './resolvers/company.resolver';
import { CompanyDetailsComponent } from './components/company/company-details/company-details.component';
import { CompanyDetailsResolver } from './resolvers/company-details.resolver';
import { CompanyPricingComponent } from './components/company/company-pricing/company-pricing.component';
import { CompanyBillingComponent } from './components/company/company-billing/company-billing.component';
import { CompanyStepGuard } from '../../guards/company-step-guard';
import { SucessCompanyCreationComponent } from './components/company/sucess-company-creation/sucess-company-creation.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { RequestValidationProviderComponent } from './components/reservations/request-validation-provider/request-validation-provider.component';
import { WaitingPaiementProviderComponent } from './components/reservations/waiting-paiement-provider/waiting-paiement-provider.component';
import { PayedConfirmedProviderComponent } from './components/reservations/payed-confirmed-provider/payed-confirmed-provider.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AvisProComponent } from './components/avis/avis-pro/avis-pro.component';
import { CompanySettingsComponent } from './components/company/company-settings/company-settings.component';
import { WaitingValidationOfProviderComponent } from './components/reservations/waiting-validation-of-provider/waiting-validation-of-provider.component';
import { AvisClientComponent } from './components/avis/avis-client/avis-client.component';
import { FavorisComponent } from './components/favoris/favoris.component';

const routes: Routes = [
	{
		path: '',
		component: ProfileComponent,
		canActivateChild: [AuthGuard],
		children: [
			{
				path: 'notification',
				component: NotificationsComponent
      }, {
        path: 'reservation/validate-client-requests',
        component: RequestValidationProviderComponent,
        data: {
          roles: 'provider'
        }
      }, {
        path: 'reservation/awaiting-validation-provider',
        component: WaitingValidationOfProviderComponent,
        data: {
          roles: 'client'
        }
      },{
        path: 'reservation/avis-client',
        component: AvisClientComponent,
        data: {
          roles: 'client'
        }
      },{
        path: 'favorites',
        component: FavorisComponent,
        data: {
          roles: 'client'
        }
      }, {
        path: 'reservation/payment',
        component: WaitingPaiementProviderComponent,
        data: {
          roles: 'provider'
        }
      },{
        path: 'reservation/payed-confirmed-provider',
        component: PayedConfirmedProviderComponent,
        data: {
          roles: 'provider'
        }
      },{
        path: 'availabilities',
        component: CalendarComponent,
        resolve: { company: CompanyResolver },
        data: {
          roles: 'provider'
        }
      },{
        path: 'reservation/avis-pro',
        component: AvisProComponent,
        data: {
          roles: 'provider'
        }
      }, {
        path: ':id',
        component: PersonalInfoComponent,
        resolve: { user: UserResolver },
        canDeactivate: [CanDeactivateGuard]
      }, {
				path: ':email/edit/wedding',
				component: WeddingInfoComponent,
				resolve: { wedding: WeddingResolver },
				data: {
					roles: 'client'
				}
			},
			{
				path: ':email/edit/company',
				component: CompanyInfoComponent,
				resolve: { company: CompanyResolver },
				canDeactivate: [CanDeactivateGuard],
				data: {
					roles: 'provider'
				}
			},
			{
				path: ':email/edit/company-details/:service',
				component: CompanyDetailsComponent,
				resolve: { companyDetails: CompanyDetailsResolver },
				canDeactivate: [CanDeactivateGuard],
/*				canActivate: [CompanyStepGuard],
				canActivateChild: [CompanyStepGuard],*/
				data: {
					roles: 'provider'
				}
			},
			{
				path: ':email/edit/company-pricing/:service',
				component: CompanyPricingComponent,
				resolve: { companyDetails: CompanyDetailsResolver },
				canDeactivate: [CanDeactivateGuard],
/*				canActivate: [CompanyStepGuard],
				canActivateChild: [CompanyStepGuard],*/
				data: {
					roles: 'provider'
				}
			},
			{
				path: ':email/edit/company-settings',
        component: CompanySettingsComponent,
				resolve: { companyDetails: CompanyDetailsResolver },
/*
				canActivate: [CompanyStepGuard],
*/
				data: {
					roles: 'provider'
				}
			},
			{
				path: ':email/edit/company-billing',
				component: CompanyBillingComponent,
				resolve: { companyDetails: CompanyDetailsResolver },
/*
				canActivate: [CompanyStepGuard],
*/
				data: {
					roles: 'provider'
				}
			},
			{
				path: ':email/sucess-company-creation',
				component: SucessCompanyCreationComponent,
				resolve: { companyDetails: CompanyDetailsResolver },
/*
				canActivate: [CompanyStepGuard],
*/
				data: {
					roles: 'provider'
				}
			},
			{
				path: ':email/company-admin/*',
				loadChildren: () => import('../admin/admin.module').then(adminModule => adminModule.AdminModule),
			  }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [CompanyStepGuard]
})
export class UserRoutingModule {}
