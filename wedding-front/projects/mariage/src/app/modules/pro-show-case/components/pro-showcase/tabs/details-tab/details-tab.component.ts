import { Component, OnInit, Input } from '@angular/core';
import { Company } from '../../../../../user/models/company.model';
import { CategoryLabelEnum } from '../../../../../user/components/company/company-details/category-label.enum';
import {
	CompanyBilling,
	CondRefundDepositCause,
	CondRefundDepositType
} from 'projects/mariage/src/app/modules/user/models/companyBilling.model';

@Component({
	selector: 'app-details-tab',
	templateUrl: './details-tab.component.html',
	styleUrls: ['./details-tab.component.scss']
})
export class DetailsTabComponent implements OnInit {
	constructor() {}
	@Input() companyDescriptionInfo: Company;
	@Input() searchedCategory: string;
	public categoryLabelEnum = CategoryLabelEnum;
	dynamiqueQsts: any[];
	reponses: string[];
	langues: string;
	billing: CompanyBilling;
	condRefundDepositType = CondRefundDepositType;
	condRefundDepositCause = CondRefundDepositCause;
	ngOnInit(): void {
		this.reponses = this.companyDescriptionInfo.company.questions;
		if (this.companyDescriptionInfo.company.dynamiqueQts) {
			this.dynamiqueQsts = this.companyDescriptionInfo.company.dynamiqueQts;
		}
		if (this.companyDescriptionInfo.languages) {
			this.langues = this.companyDescriptionInfo.languages
				.map(text => text.charAt(0).toUpperCase() + text.slice(1) + ' ')
				.toString();
		}
		if (this.companyDescriptionInfo.company.billing) {
			this.billing = this.companyDescriptionInfo.company.billing;
			console.log(this.billing);
			console.log(this.companyDescriptionInfo.company.billing);
		}
	}
}
