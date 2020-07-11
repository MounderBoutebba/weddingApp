import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Company } from '../../../user/models/company.model';
import { CategoryLabelEnum } from '../../../user/components/company/company-details/category-label.enum';
import { EventServiceService } from '../../services/event-service.service';

@Component({
	selector: 'app-pro-showcase',
	templateUrl: './pro-showcase.component.html',
	styleUrls: ['./pro-showcase.component.scss']
})
export class ProShowcaseComponent implements OnInit {
	companyDescriptionInfo: Company;
	searchedCategory: string;
	public categoryLabelEnum = CategoryLabelEnum;
	modalOpened: boolean;

	constructor(
		private readonly route: ActivatedRoute,
		private readonly router: Router,
		private eventService: EventServiceService
	) {
		this.eventService.modalOpened.subscribe(val => (this.modalOpened = val));
	}

	ngOnInit() {
		this.getData();
	}
	getData() {
		this.route.data.pipe(map(data => data.companyInfo)).subscribe(res => {
			this.companyDescriptionInfo = res;
			this.searchedCategory = this.router.url.split('/')[4];
		});
	}
}
