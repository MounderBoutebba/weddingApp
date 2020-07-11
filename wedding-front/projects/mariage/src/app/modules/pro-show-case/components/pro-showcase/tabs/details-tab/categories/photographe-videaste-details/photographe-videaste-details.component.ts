import { Component, OnInit, Input } from '@angular/core';
import { Company } from 'projects/mariage/src/app/modules/user/models/company.model';
import { CategoryLabelEnum } from 'projects/mariage/src/app/modules/user/components/company/company-details/category-label.enum';

@Component({
	selector: 'app-photographe-videaste-details',
	templateUrl: './photographe-videaste-details.component.html',
	styleUrls: ['./photographe-videaste-details.component.scss']
})
export class PhotographeVideasteDetailsComponent implements OnInit {
	@Input() companyDescriptionInfo: Company;
	@Input() searchedCategory: string;
	isPhotographe: boolean;
	isVidealiste: boolean;
	stylesPhotographe: string;
	stylesVidealiste: string;
	photoappareils: string;
	photoobjectivs: string;
	photoaccesoires: string;
	videoappareils: string;
	videoobjectivs: string;
	videoaccesoires: string;
	videalisteDelaisDeLivraison: number;
	photographeDelaisDeLivraison: number;
	constructor() {}

	ngOnInit(): void {
		this.isPhotographe = this.setIsPhotographe(this.companyDescriptionInfo.company.categories);
		this.isVidealiste = this.setIsVidealiste(this.companyDescriptionInfo.company.categories);
		this.initDetails();
	}
	setIsPhotographe(categories: string[]): boolean {
		return !!categories.filter(category => category === CategoryLabelEnum.PHOTOGRAPHE).length;
	}
	setIsVidealiste(categories: string[]): boolean {
		return !!categories.filter(category => category === CategoryLabelEnum.VIDEALISTE).length;
	}
	initDetails() {
		// videaliste_delaisDeLivraisonJours;
		// photographe_delaisDeLivraisonJours;

		this.photoaccesoires = '';
		this.photoobjectivs = '';
		this.photoappareils = '';
		this.videoaccesoires = '';
		this.videoappareils = '';
		this.videoobjectivs = '';

		if (this.isPhotographe) {
			if (this.companyDescriptionInfo?.criteres?.photographe_styleDePhoto) {
				this.stylesPhotographe = this.companyDescriptionInfo.criteres.photographe_styleDePhoto
					.map(text => text.charAt(0).toUpperCase() + text.slice(1))
					.toString();
			}

			if (this.companyDescriptionInfo?.criteres?.photographe_appareils) {
				this.photoappareils = this.companyDescriptionInfo.criteres.photographe_appareils
					.map(text => text.charAt(0).toUpperCase() + text.slice(1))
					.toString();
			}
			if (this.companyDescriptionInfo?.criteres?.photographe_objectifs) {
				this.photoobjectivs = this.companyDescriptionInfo.criteres.photographe_objectifs
					.map(text => text.charAt(0).toUpperCase() + text.slice(1))
					.toString();
			}
			if (this.companyDescriptionInfo?.criteres?.photographe_accessoires) {
				this.photoaccesoires = this.companyDescriptionInfo.criteres.photographe_accessoires
					.map(text => text.charAt(0).toUpperCase() + text.slice(1))
					.toString();
			}

			this.photographeDelaisDeLivraison = this.companyDescriptionInfo.criteres.photographe_delaisDeLivraisonJours;
		}

		if (this.isVidealiste) {
			if (this.companyDescriptionInfo?.criteres?.videaliste_styleDeVideo) {
				this.stylesVidealiste = this.companyDescriptionInfo.criteres.videaliste_styleDeVideo
					.map(text => text.charAt(0).toUpperCase() + text.slice(1))
					.toString();
			}
			if (this.companyDescriptionInfo?.criteres?.videaliste_appareils) {
				this.videoappareils = this.companyDescriptionInfo.criteres.videaliste_appareils
					.map(text => text.charAt(0).toUpperCase() + text.slice(1))
					.toString();
			}
			if (this.companyDescriptionInfo?.criteres?.videaliste_objectifs) {
				this.videoobjectivs = this.companyDescriptionInfo.criteres.videaliste_objectifs
					.map(text => text.charAt(0).toUpperCase() + text.slice(1))
					.toString();
			}
			if (this.companyDescriptionInfo?.criteres?.videaliste_accessoires) {
				this.videoaccesoires = this.companyDescriptionInfo.criteres.videaliste_accessoires
					.map(text => text.charAt(0).toUpperCase() + text.slice(1))
					.toString();
			}

			this.videalisteDelaisDeLivraison = this.companyDescriptionInfo.criteres.videaliste_delaisDeLivraisonJours;
		}
	}
}
