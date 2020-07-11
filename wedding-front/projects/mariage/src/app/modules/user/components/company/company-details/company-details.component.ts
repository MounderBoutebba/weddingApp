import { Component, HostListener, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { CategoryLabelEnum } from './category-label.enum';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../../services/company.service';
import { AuthStore } from '../../../../store/auth';

@Component({
	selector: 'app-company-details',
	templateUrl: './company-details.component.html',
	styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
	@ViewChild('comp') comp: any;
	public categoryLabelEnum = CategoryLabelEnum;
	public companyDetailsInfo: any;
	public criteres: any;
	showComponent = false;
	// mySubscription: any;
	constructor(
		private readonly route: ActivatedRoute,
		private readonly translateService: TranslateService,
		private readonly toastrService: ToastrService,
		private readonly router: Router,
		private readonly companyService: CompanyService
	) {
	/*
	this.router.routeReuseStrategy.shouldReuseRoute = () => {
		return false;
	};
	this.mySubscription = this.router.events.subscribe((event) => {
		if (event instanceof NavigationEnd) {
			this.router.navigated = false;
		}
  	});*/
	}

	ngOnInit() {
		this.initCriteres();
		this.updateCurrentStep();
	}
	/*ngOnDestroy() {
		if (this.mySubscription) {
		  this.mySubscription.unsubscribe();
		}
	}*/
	updateCurrentStep() {
		const currentEmail = this.route.snapshot.paramMap.get('email');
		this.companyService.findCompanyByEmail(currentEmail).subscribe( company => {
			company.currentStep = 'company-details';
			this.companyService.updateCurrentStep(company.id, currentEmail, company).subscribe( res => {
			});
		});
	}
	initCriteres() {
		this.route.data.pipe(map(data => data.companyDetails)).subscribe(async data => {
			if (data) {
				this.companyDetailsInfo = data;
				this.criteres = data.criteres;
				this.showComponent = true;
				this.scrollTop();
			} else {
				const email = this.router.url.split('/')[2];
				const category = this.router.url.split('/')[5];
				const res = await this.companyService.getServiceByEmailAndService(email, category).toPromise();
				if (res) {
					this.companyDetailsInfo = res.company;
					this.criteres = res.criteres;
					this.showComponent = true;
					this.scrollTop();
				} else {
					this.toastrService.error(
						this.translateService.instant('there is no current details, please re-enter your company details')
					);
				}
			}
		});
	}
	scrollTop() {
		const scrollToTop = window.setInterval(() => {
			const pos = window.pageYOffset;
			if (pos > 0) {
				window.scrollTo(0, pos - 60); // how far to scroll on each step
			} else {
				window.clearInterval(scrollToTop);
			}
		}, 16);
	}
	public canDeactivate(): Observable<boolean> | boolean {
		return this.comp.canDeactivate();
		// return true;
	}
}
