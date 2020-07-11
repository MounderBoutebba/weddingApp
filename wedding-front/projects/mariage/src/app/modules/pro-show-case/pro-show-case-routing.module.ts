import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProShowcaseComponent } from './components/pro-showcase/pro-showcase.component';
import { AuthGuard } from '../../guards/auth.guard';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';
import { ProShowCaseResolver } from './resolvers/pro-show-case.resolver';

const routes: Routes = [
	{
		path: ':email/booking/:category',
		component: ProShowcaseComponent,
		resolve: { companyInfo: ProShowCaseResolver },
		/*canDeactivate: [CanDeactivateGuard],
		canActivate: [AuthGuard],
		data: {
			roles: 'client'
		}*/
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class proShowCaseRoutingModule {}
