import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthStore } from '../modules/store/auth';
import { CompanyService } from '../modules/user/services/company.service';

@Injectable({
	providedIn: 'root'
})
export class CompanyStepGuard implements CanActivate {
    currentStep: string;
    currentCompany: any;
	constructor(
        private readonly router: Router,
        private authStore: AuthStore,
        private companyService: CompanyService
	) {
    }

	public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
            this.companyService.findCompanyByEmail(this.authStore.getUser().email).subscribe( company => {
                this.currentCompany = company;
                this.currentStep = company.currentStep;
                if (this.userIsAllowedToPassStep(this.currentStep, state.url)) {
                    return true;
                } else {
                    this.redirectAccordingToCurrentStep(this.currentStep);
                    return false;
                }
            });
            return true;
	}

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
		return this.canActivate(route, state);
    }

    private redirectAccordingToCurrentStep(currentStep: string) {
        switch (currentStep) {
            case 'company-infos':
                this.router.navigateByUrl(`/user/${this.authStore.getUser().email}/edit/company`);
                break;
            case 'company-details':
                this.router.navigateByUrl(`/user/${this.authStore.getUser().email}/edit/company-details/${this.authStore.getCategory()}`);
                break;
            case 'company-pricing':
                // tslint:disable-next-line:max-line-length
                this.router.navigateByUrl(`/user/${this.authStore.getUser().email}/edit/company-pricing/${this.currentCompany.categories[0]}`);
                break;
            case 'company-settings':
                this.router.navigateByUrl(`/user/${this.authStore.getUser().email}/edit/company-settings`);
                break;
            default:
                break;
        }
    }

    private userIsAllowedToPassStep(currentStep: string, targetUrl: string) {
        switch (currentStep) {
            case 'company-infos':
                // tslint:disable-next-line: max-line-length
                if (targetUrl.includes('company-pricing') || targetUrl.includes('company-settings') || targetUrl.includes('company-billing') || targetUrl.includes('company-details')) {
                    return false;
                }
                return true;
            case 'company-details':
                // tslint:disable-next-line: max-line-length
                if (targetUrl.includes('company-pricing') || targetUrl.includes('company-settings') || targetUrl.includes('company-billing')) {
                    return false;
                }
                return true;
            case 'company-pricing':
                if (targetUrl.includes('company-billing') || targetUrl.includes('company-settings')) {
                    return false;
                }
                return true;
            default:
                return true;
        }
    }
}
