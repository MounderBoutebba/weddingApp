import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { BannerComponent } from './banner/banner.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { ServiceModule } from '../service/service.module';
import { DescriptionComponent } from './description/description.component';
import { LoanComponent } from './loan/loan.component';
import { BudgetComponent } from './budget/budget.component';
import { BlogComponent } from './blog/blog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HomeBetaComponent } from './home-beta/home-beta.component';

@NgModule({
	declarations: [HomeComponent, BannerComponent, DescriptionComponent, LoanComponent, BudgetComponent, BlogComponent, HomeBetaComponent],
	imports: [HomeRoutingModule, SharedModule, ServiceModule, MatAutocompleteModule],
	exports: []
})
export class HomeModule {}
