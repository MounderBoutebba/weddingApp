import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryLabelEnum } from '../company-details/category-label.enum';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../../services/company.service';

@Component({
	selector: 'app-company-pricing',
	templateUrl: './company-pricing.component.html',
	styleUrls: ['./company-pricing.component.scss']
})
export class CompanyPricingComponent implements OnInit {
	@ViewChild('comp') comp: any;
	public categoryLabelEnum = CategoryLabelEnum;
	public companyDetailsInfo: any;
	public criteres: any;
	showComponent = false;
	constructor(
		private readonly route: ActivatedRoute,
		private readonly translateService: TranslateService,
		private readonly toastrService: ToastrService,
		private readonly companyService: CompanyService
	) {}

	ngOnInit() {
		this.initCriteres();
		this.updateCurrentStep();
	}
	updateCurrentStep() {
		const currentEmail = this.route.snapshot.paramMap.get('email');
		this.companyService.findCompanyByEmail(currentEmail).subscribe( company => {
			company.currentStep = 'company-pricing';
			this.companyService.updateCurrentStep(company.id, currentEmail, company).subscribe( res => {
			});
		});
	}
	initCriteres() {
		this.route.data.pipe(map(data => data.companyDetails)).subscribe(data => {
			if (data) {
				this.companyDetailsInfo = data;
				this.criteres = data.criteres;
				this.showComponent = true;
				this.scrollTop();
			} else {
				this.toastrService.error(
					this.translateService.instant('there is no current details, please re-enter your company details')
				);
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
