import { Component, OnInit, Input } from '@angular/core';
import { Company } from '../../../../../user/models/company.model';
import { CategoryLabelEnum } from '../../../../../user/components/company/company-details/category-label.enum';

@Component({
	selector: 'app-description-tab',
	templateUrl: './description-tab.component.html',
	styleUrls: ['./description-tab.component.scss']
})
export class DescriptionTabComponent implements OnInit {
	@Input() companyDescriptionInfo: Company;
	@Input() searchedCategory: string;
	public categoryLabelEnum = CategoryLabelEnum;
	textHidden: boolean;
	description: { preview: string; full: string };
	constructor() {}

	ngOnInit() {
		this.initDescription();
	}
	initDescription() {
		const description = this.companyDescriptionInfo.company.description;
		const previewArray = [];
		const fullArray = [];
		const limit = 24;
		for (const [i, word] of description.split(' ').entries()) {
			if (i <= limit) {
				previewArray.push(word);
			} else {
				fullArray.push(word);
			}
		}
		this.description = { preview: previewArray.join(' '), full: fullArray.join(' ') };
		this.textHidden = !!this.description.full;
	}
	showMore() {
		this.textHidden = !this.textHidden;
	}
}
