import { Component, OnInit, Input } from '@angular/core';
import { Company } from '../../../../user/models/company.model';
import { BookingService } from '../../../services/booking.service';

@Component({
	selector: 'app-pro-general-infos',
	templateUrl: './pro-general-infos.component.html',
	styleUrls: ['./pro-general-infos.component.scss']
})
export class ProGeneralInfosComponent implements OnInit {
	@Input() companyDescriptionInfo: Company;
	initialPrice: number;
	providerImage: any;
	constructor(private readonly generalBookingService: BookingService) {
		this.generalBookingService.initialPrice.subscribe(price => (this.initialPrice = price));
	}

	ngOnInit(): void {
		if (this.companyDescriptionInfo) {
			this.providerImage = this.companyDescriptionInfo.company.images[0].path;
		}
	}
}
