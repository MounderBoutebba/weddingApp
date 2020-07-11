import { Component, OnInit, Input } from '@angular/core';
import { Company } from '../../../../../../user/models/company.model';
import { EventServiceService } from '../../../../../services/event-service.service';
@Component({
	selector: 'app-images-container',
	templateUrl: './images-container.component.html',
	styleUrls: ['./images-container.component.scss']
})
export class ImagesContainerComponent implements OnInit {
	@Input() companyDescriptionInfo: Company;
	images: any[];
	hidden: boolean;
	slideIndex = 0;
	popUpOpened: boolean;
	constructor(private eventService: EventServiceService) {}

	ngOnInit(): void {
		this.hidden = true;
		this.popUpOpened = false;
		if (this.companyDescriptionInfo) {
			this.images = this.companyDescriptionInfo.company.images.map(obj => {
				return obj.path;
			});
		}
		this.eventService.modalOpened.next(false);
	}

	openModal() {
		this.popUpOpened = true;
		//modal opened to overly on top of nav
		this.eventService.modalOpened.next(true);
		//disable and enbale are optional to prevent body scrolling
		this.eventService.disable();
	}
	closeModal() {
		this.popUpOpened = false;
		this.eventService.modalOpened.next(false);
		this.eventService.enable();
	}
	plusSlides(n) {
		this.showSlides((this.slideIndex += n));
	}
	currentSlide(n) {
		this.showSlides((this.slideIndex = n));
	}

	showSlides(n) {
		let i;
		const slides = document.getElementsByClassName('img-slides') as HTMLCollectionOf<HTMLElement>;
		if (n > slides.length) {
			this.slideIndex = 1;
		}
		if (n < 1) {
			this.slideIndex = slides.length;
		}
		for (i = 0; i < slides.length; i++) {
			slides[i].style.display = 'none';
		}
		slides[this.slideIndex - 1].style.display = 'block';
	}
}
