import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuicklinkStrategy } from 'ngx-quicklink';

const routes = [
	{
		path: '',
		loadChildren: () => import('./modules/home/home.module').then(homeModule => homeModule.HomeModule)
	}, {
    path: 'faq',
    loadChildren: () => import('./modules/faq/faq.module').then(m => m.FaqModule)
  }, {
		path: 'how-it-works',
		loadChildren: () => import('./modules/how-it-works/how-it-works.module')
		.then(howItWorksModule => howItWorksModule.HowItWorksModule)
	},
	{
		path: 'become-a-partner',
		loadChildren: () => import('./modules/become-a-partner/become-a-partner.module')
		.then(becomeAPartnerModule => becomeAPartnerModule.BecomeAPartnerModule)
	},
	{
		path: 'auth',
		loadChildren: () => import('./modules/auth/auth.module').then(authModule => authModule.AuthModule)
	},
	{
		path: 'user',
		loadChildren: () => import('./modules/user/user.module').then(userModule => userModule.UserModule)
	},
	{
		path: 'category',
		loadChildren: () =>
			import('./modules/category/category.module').then(categoryModule => categoryModule.CategoryModule)
	},
	{
		path: 'pro-showcase',
		loadChildren: () =>
			import('./modules/pro-show-case/pro-show-case.module').then(
				proShowCaseModule => proShowCaseModule.ProShowCaseModule
			)
	},
	{
		path: 'administration',
		loadChildren: () => import('./modules/admin/admin.module').then(adminModule => adminModule.AdminModule)
	},
	{
		path: '**',
		redirectTo: '/',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: QuicklinkStrategy })],
	exports: [RouterModule]
})
export class AppRoutingModule {}
