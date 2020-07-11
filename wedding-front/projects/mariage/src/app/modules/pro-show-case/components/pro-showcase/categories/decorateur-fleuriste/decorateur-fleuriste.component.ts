import { Component, OnInit, Input } from '@angular/core';
import { Company } from 'projects/mariage/src/app/modules/user/models/company.model';
import { CategoryLabelEnum } from 'projects/mariage/src/app/modules/user/components/company/company-details/category-label.enum';
import { bookingObj, DecorateurFleuristBookingInterface } from './decorateur-fleuriste.booking.interface';
import { FeeType } from 'projects/mariage/src/app/modules/user/models/option.model';
import { BookingStore } from 'projects/mariage/src/app/modules/store/booking';

@Component({
	selector: 'app-decorateur-fleuriste',
	templateUrl: './decorateur-fleuriste.component.html',
	styleUrls: ['./decorateur-fleuriste.component.scss']
})
export class DecorateurFleuristeComponent implements OnInit {
	@Input() companyDescriptionInfo: Company;
	@Input() searchedCategory: string;
	isDecorateur: boolean;
	decorateurIsChecked: boolean;
	fleuristIsChecked: boolean;
	isFleurist: boolean;
	bookingObject: DecorateurFleuristBookingInterface = bookingObj;
	decorationsAssocies: { name: string; checked: boolean; label: string }[] = [];
	showmoreDecorations: boolean;
	optionDivers: any;
	feeType = FeeType;
	showmoreFeuillages: boolean;
	showmoreFleurs: boolean;
	fleursList: { name: string; tarif: number }[] = [];
	feuillagesList: { name: string; tarif: number }[] = [];
	decorationsList: { name: string; tarif: number }[] = [];

	showMoreOptions: {
		fleurist: {
			fleurs: {
				value: boolean;
			};
		};
	};
	constructor(private readonly bookingStore: BookingStore) {}

	ngOnInit(): void {
		console.log('decorateur company criteres', this.companyDescriptionInfo.criteres);
		this.showmoreDecorations = false;
		this.showmoreFleurs = false;
		this.showmoreFeuillages = false;
		this.isDecorateur = this.setIsDecorateur(this.companyDescriptionInfo.company.categories);
		this.isFleurist = this.setIsFleurist(this.companyDescriptionInfo.company.categories);
		this.initBookingObject(
			this.searchedCategory === CategoryLabelEnum.DECORATUER,
			this.searchedCategory === CategoryLabelEnum.FLEURISTE
		);
	}

	setIsDecorateur(categories: string[]): boolean {
		return !!categories.filter(category => category === CategoryLabelEnum.DECORATUER).length;
	}

	setIsFleurist(categories: string[]): boolean {
		return !!categories.filter(category => category === CategoryLabelEnum.FLEURISTE).length;
	}

	numberInputChangeValue(prefix: string, action: string, key: string, step: number, decLimit?: number) {
		if (action === 'increment') {
			this.bookingObject[prefix][key] += step;
		} else if (action === 'decrement') {
			this.bookingObject[prefix][key] -= step;
			this.bookingObject[prefix][key] =
				this.bookingObject[prefix][key] < decLimit ? decLimit : this.bookingObject[prefix][key];
		}
		this.bookingObjectChanged();
	}

	toggleChange(prefix: string, key: string, value: boolean, subKey?: string) {
		if (!!subKey) {
			this.bookingObject[prefix][key][subKey] = value;
		} else {
			this.bookingObject[prefix][key] = value;
		}
		this.bookingObjectChanged();
	}

	initBookingObject(decorateurIsChecked: boolean, fleuristIsChecked: boolean) {
		this.decorateurIsChecked = decorateurIsChecked;
		this.fleuristIsChecked = fleuristIsChecked;

		if (this.isDecorateur && this.decorateurIsChecked) {
			this.bookingObject.decorateur.selected = true;

			this.bookingObject.decorateur.dureeMissionDecorateur = 1;

			if (!!this.companyDescriptionInfo?.criteres?.decorateur_livraisonDuMateriel) {
				this.bookingObject.decorateur.livraisonDuMateriel = false;
			}

			if (!!this.companyDescriptionInfo?.criteres?.decorateur_montageDemontage) {
				this.bookingObject.decorateur.montageDemontage = false;
			}

			if (!!this.companyDescriptionInfo?.criteres?.decorateur_decorationAssociees?.options.length) {
				this.companyDescriptionInfo?.criteres?.decorateur_decorationAssociees?.options.forEach(option => {
					if (option.value) {
						this.decorationsAssocies.push({
							name: option.name,
							checked: false,
							label: `Obtenir ce service`
						});
					}
				});
			}
		} else {
			this.bookingObject.decorateur = { selected: false };
		}

		if (this.isFleurist && this.fleuristIsChecked) {
			this.bookingObject.fleurist.selected = true;

			this.bookingObject.fleurist.dureeMissionFleurist = 1;

			if (this.companyDescriptionInfo?.criteres?.fleuriste_feuillages.value) {
				this.companyDescriptionInfo?.criteres?.fleuriste_feuillages.options.forEach(opt => {
					if (opt.checked) {
						const option = this.feuillagesList.find(o => o.name === opt.name);
						if (!!!option) {
							this.feuillagesList.push({ name: opt.name, tarif: opt.tarif });
						}
					}
				});
				console.log('feuillagesList', this.feuillagesList);
				this.bookingObject.fleurist.feuillages = !!this.bookingObject.fleurist.feuillages
					? this.bookingObject.fleurist.feuillages
					: [];
			}

			if (this.companyDescriptionInfo?.criteres?.fleuriste_fleurs.value) {
				this.companyDescriptionInfo?.criteres?.fleuriste_fleurs.options.forEach(opt => {
					if (opt.checked) {
						const option = this.fleursList.find(o => o.name === opt.name);
						if (!!!option) {
							this.fleursList.push({ name: opt.name, tarif: opt.tarif });
						}
					}
				});
				console.log('fleursList', this.fleursList);
				this.bookingObject.fleurist.fleurs = !!this.bookingObject.fleurist.fleurs
					? this.bookingObject.fleurist.fleurs
					: [];
			}

			if (this.companyDescriptionInfo?.criteres?.fleuriste_decoration.value) {
				this.companyDescriptionInfo?.criteres?.fleuriste_decoration.options.forEach(opt => {
					if (opt.checked) {
						const option = this.decorationsList.find(o => o.name === opt.name);
						if (!!!option) {
							this.decorationsList.push({ name: opt.name, tarif: opt.tarif });
						}
					}
				});
				console.log('decorationsList', this.decorationsList);
				this.bookingObject.fleurist.decorations = !!this.bookingObject.fleurist.decorations
					? this.bookingObject.fleurist.decorations
					: [];
			}

			if (!!this.companyDescriptionInfo?.criteres?.fleuriste_livraison) {
				this.bookingObject.fleurist.livraison = false;
			}
		} else {
			this.bookingObject.fleurist = { selected: false };
		}

		if (this.companyDescriptionInfo?.company?.options?.length) {
			this.optionDivers = [];
			this.companyDescriptionInfo?.company?.options.forEach(opt => {
				const index = this.optionDivers?.findIndex(option => option.name === opt.name);
				if (index === -1) {
					if (opt.feeType === FeeType.UNIT_FEE) {
						this.optionDivers.push({
							id: opt.id,
							name: opt.name,
							description: opt.description,
							optionRate: opt.optionRate,
							feeType: opt.feeType,
							checked: false,
							examplaire: 1,
							categories: opt.categories
						});
					} else {
						this.optionDivers.push({
							id: opt.id,
							name: opt.name,
							description: opt.description,
							optionRate: opt.optionRate,
							feeType: opt.feeType,
							checked: false,
							categories: opt.categories
						});
					}
				}
			});

			console.log('options fleurist decorateurs', this.optionDivers);
			console.log(this.companyDescriptionInfo?.company?.options);
		}
		this.bookingObjectChanged();
	}

	getFleur(prefix: string, name: string): any {
		if (prefix === 'fleurist') {
			return this.bookingObject[prefix].fleurs.find(p => p.name === name);
		}
	}

	getFeuillage(prefix: string, name: string): any {
		if (prefix === 'fleurist') {
			return this.bookingObject[prefix].feuillages.find(p => p.name === name);
		}
	}

	getDecoration(prefix: string, name: string): any {
		if (prefix === 'fleurist') {
			return this.bookingObject[prefix].decorations.find(p => p.name === name);
		}
	}

	stripUnnecessaryValues() {
		if (!!this.decorationsAssocies.length) {
			this.bookingObject.decorateur.decorationsAssociees = this.decorationsAssocies.filter(opt => opt.checked);
		}
		this.bookingObject.optionDivers = this.optionDivers?.filter(opt => opt.checked);
	}

	bookingObjectChanged() {
		this.stripUnnecessaryValues();
		this.bookingStore.setBookingObj(this.bookingObject);
	}

	toggleChangeDecoration(value: boolean, index: number) {
		this.decorationsAssocies[index].checked = value;
		this.bookingObjectChanged();
	}

	numberInputChangeOptionDivers(action: string, step: number, item: any, decLimit?: number) {
		const index = this.optionDivers.findIndex(opt => opt.id === item.id);
		if (action === 'increment') {
			this.optionDivers[index].examplaire += step;
		} else if (action === 'decrement') {
			this.optionDivers[index].examplaire -= step;
			this.optionDivers[index].examplaire =
				this.optionDivers[index].examplaire < decLimit ? decLimit : this.optionDivers[index].examplaire;
		}
		this.bookingObjectChanged();
	}

	checkBoxChangeList(prefix: string, key: string, subKey: string, value: boolean, prestationName?: string) {
		if (value) {
			this.bookingObject[prefix][key].push({ name: subKey, checked: value, quantity: 1 });
		}
	}

	numberInputChangeValueComplexeObjects(
		prefix: string,
		action: string,
		key: string,
		fleurName: string,
		step: number,
		decLimit?: number
	) {
		if (action === 'increment') {
			this.bookingObject[prefix][key].find(p => p.name === fleurName).quantity += step;
		} else if (action === 'decrement') {
			this.bookingObject[prefix][key].find(p => p.name === fleurName).quantity -= step;
			this.bookingObject[prefix][key].find(p => p.name === fleurName).quantity =
				this.bookingObject[prefix][key].find(p => p.name === fleurName).quantity < decLimit
					? decLimit
					: this.bookingObject[prefix][key].find(p => p.name === fleurName).quantity;
		}
		this.bookingObjectChanged();
	}

	toggleChangeOptionDivers(value: boolean, item: any) {
		const index = this.optionDivers.findIndex(opt => opt.id === item.id);
		this.optionDivers[index].checked = value;
		this.bookingObjectChanged();
	}

	optionContainCategory(optId: string, category: string): boolean {
		return this.optionDivers.find(opt => opt.id === optId).categories.includes(category);
	}
}
