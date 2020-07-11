import { Component, OnInit, Input } from '@angular/core';
import { Company } from 'projects/mariage/src/app/modules/user/models/company.model';
import { FeeType } from 'projects/mariage/src/app/modules/user/models/option.model';
import {
	coiffureMaquillageEsthetiqueSoinsBookingInterface,
	bookingObj
} from './coiffure-maquillage-esthetique-soins.booking.interface';
import { CategoryLabelEnum } from 'projects/mariage/src/app/modules/user/components/company/company-details/category-label.enum';
import { BookingStore } from 'projects/mariage/src/app/modules/store/booking';

@Component({
	selector: 'app-coiffure-maquillage-esthetique-soins',
	templateUrl: './coiffure-maquillage-esthetique-soins.component.html',
	styleUrls: ['./coiffure-maquillage-esthetique-soins.component.scss']
})
export class CoiffureMaquillageEsthetiqueSoinsComponent implements OnInit {
	@Input() companyDescriptionInfo: Company;
	@Input() searchedCategory: string;
	isCoiffure: boolean;
	isMaquillage: boolean;
	isEsthetique: boolean;
	isSoin: boolean;
	coiffureIsChecked: boolean;
	maquillageIsChecked: boolean;
	esthetiqueIsChecked: boolean;
	soinIsChecked: boolean;
	feeType = FeeType;
	optionDivers: any;
	bookingObject: coiffureMaquillageEsthetiqueSoinsBookingInterface = bookingObj;
	produitsList: {
		coiffure: {name: string, tarif: number}[],
		maquillage: {name: string, tarif: number}[],
	};
	showMoreOptions: {
		coiffure: {
			prestationInvitesProches: {
				options: {name: string, value: boolean}[]
			},
			produitsEtAccessoires: {
				value: boolean,
			},
		},
		maquillage: {
			prestationInvitesProches: {
				options: {name: string, value: boolean}[]
			},
			produits: {
				value: boolean,
			},
		},
		esthetique: {
			manucureEtpedicure: {
				options: {name: string, value: boolean}[]
			},
			epilation: {
				options: {name: string, value: boolean}[]
			},
		},
		soins: {
			soins: {
				options: {name: string, value: boolean}[]
			},
			massage: {
				options: {name: string, value: boolean}[]
			},
		},
	};
	constructor(
		private readonly bookingStore: BookingStore,
	) {}

	ngOnInit(): void {
		console.log('options divers',this.companyDescriptionInfo.company.options);
		this.isCoiffure = this.setIsCoiffure(this.companyDescriptionInfo.company.categories);
		this.isMaquillage = this.setIsMaquillage(this.companyDescriptionInfo.company.categories);
		this.isEsthetique = this.setIsEsthetique(this.companyDescriptionInfo.company.categories);
		this.isSoin = this.setIsSoin(this.companyDescriptionInfo.company.categories);
		this.produitsList = {
			coiffure: [],
			maquillage: [],
		}
		this.showMoreOptions = {
			coiffure: {
				prestationInvitesProches: {
					options: [],
				},
				produitsEtAccessoires: {
					value: false,
				},
			},
			maquillage: {
				prestationInvitesProches: {
					options: [],
				},
				produits: {
					value: false,
				},
			},
			esthetique: {
				manucureEtpedicure: {
					options: [],
				},
				epilation: {
					options: [],
				},
			},
			soins: {
				soins: {
					options: [],
				},
				massage: {
					options: [],
				},
			},
		};
		this.initBookingObject(
			this.searchedCategory === CategoryLabelEnum.COIFFURE,
			this.searchedCategory === CategoryLabelEnum.MAQUILLAGE,
			this.searchedCategory === CategoryLabelEnum.ESTHETIQUE,
			this.searchedCategory === CategoryLabelEnum.SOIN
		);


	}
	setIsCoiffure(categories: string[]): boolean {
		return !!categories.filter(category => category === CategoryLabelEnum.COIFFURE).length;
	}
	setIsMaquillage(categories: string[]): boolean {
		return !!categories.filter(category => category === CategoryLabelEnum.MAQUILLAGE).length;
	}
	setIsEsthetique(categories: string[]): boolean {
		return !!categories.filter(category => category === CategoryLabelEnum.ESTHETIQUE).length;
	}
	setIsSoin(categories: string[]): boolean {
		return !!categories.filter(category => category === CategoryLabelEnum.SOIN).length;
	}
	setShowMore(prefix: string, key: string, option?: string) {
		if (!!option) {
			if (!!this.getShowMore(prefix, key, option)) {
				this.showMoreOptions[prefix][key].options.find( opt => opt.name === option ).value = !this.getShowMore(prefix, key, option)?.value;
			} else {
				this.showMoreOptions[prefix][key].options.push({
					name: option,
					value: !this.getShowMore(prefix, key, option)?.value,
				});
			}
		} else {
			this.showMoreOptions[prefix][key].value = !this.getShowMore(prefix, key)?.value;
		}

		console.log('setShowMore', this.showMoreOptions);
	}
	getShowMore(prefix: string, key: string, option?: string): any {
		if (!!option) {
			return this.showMoreOptions[prefix][key].options.find( opt => opt.name === option );
		} else {
			return this.showMoreOptions[prefix][key];
		}
	}
	initBookingObject(
		coiffureIsChecked: boolean,
		maquillageIsChecked: boolean,
		esthetiqueIsChecked: boolean,
		soinIsChecked: boolean,
		coiffureChanged?: boolean,
		maquillageChanged?: boolean,
		action?: string,
	) {
		this.coiffureIsChecked = coiffureIsChecked;
		this.maquillageIsChecked = maquillageIsChecked;
		this.esthetiqueIsChecked = esthetiqueIsChecked;
		this.soinIsChecked = soinIsChecked;

		if (this.isCoiffure && this.coiffureIsChecked) {
			this.bookingObject.coiffure.selected = true;
			this.bookingObject.coiffure.coiffureNombre = coiffureChanged && action === 'increment' ? 2 : 1;

			// majoration type cheveux
			if (this.companyDescriptionInfo?.criteres?.coiffure_majorationTypeCheveux.value) {
				this.bookingObject.coiffure.majorationTypeCheveux =
				!!this.bookingObject.coiffure.majorationTypeCheveux ? this.bookingObject.coiffure.majorationTypeCheveux : [];
			}

			// produits et accecoires
			if (this.companyDescriptionInfo?.criteres?.coiffure_produitsEtAccessoires.value) {
				this.companyDescriptionInfo?.criteres?.coiffure_produitsEtAccessoires
				.options.forEach(opt => {
					if (opt.checked) {
						const option = this.produitsList.coiffure.find( o => o.name === opt.name);
						if (!!!option) {
							this.produitsList.coiffure.push({name: opt.name, tarif: opt.tarif});
						}
					}
				});
				console.log('produitsList', this.produitsList);
				this.bookingObject.coiffure.produitsEtAccessoires =
				!!this.bookingObject.coiffure.produitsEtAccessoires ? this.bookingObject.coiffure.produitsEtAccessoires : [];
			}
			// prestations invités proches
			if (this.companyDescriptionInfo?.criteres?.coiffure_prestationInvitesProches.value) {
				this.bookingObject.coiffure.prestationInvitesProches =
				!!this.bookingObject.coiffure.prestationInvitesProches ? this.bookingObject.coiffure.prestationInvitesProches : [];
			}
		} else {
			this.bookingObject.coiffure = {selected: false};
		}
		if (this.isMaquillage && this.maquillageIsChecked) {
			this.bookingObject.maquillage.selected = true;
			this.bookingObject.maquillage.maquillageNombre = maquillageChanged && action === 'increment' ? 2 : 1;

			// majoration type de peau
			if (this.companyDescriptionInfo?.criteres?.maquillage_majorationTypeDePeau.value) {
				this.bookingObject.maquillage.majorationTypeDePeau =
				!!this.bookingObject.maquillage.majorationTypeDePeau ? this.bookingObject.maquillage.majorationTypeDePeau : [];
			}

			// produits et accecoires
			if (this.companyDescriptionInfo?.criteres?.maquillage_produits.value) {
				this.companyDescriptionInfo?.criteres?.maquillage_produits
				.options.forEach(opt => {
					if (opt.checked) {
						const option = this.produitsList.maquillage.find( o => o.name === opt.name);
						if (!!!option) {
							this.produitsList.maquillage.push({name: opt.name, tarif: opt.tarif});
						}
					}
				});
				this.bookingObject.maquillage.produits =
				!!this.bookingObject.maquillage.produits ? this.bookingObject.maquillage.produits : [];
			}
			// prestations invités proches
			if (this.companyDescriptionInfo?.criteres?.maquillage_prestationInvitesProches.value) {
				this.bookingObject.maquillage.prestationInvitesProches =
				!!this.bookingObject.maquillage.prestationInvitesProches ? this.bookingObject.maquillage.prestationInvitesProches : [];
			}
		} else {
			this.bookingObject.maquillage = {selected: false};
		}
		if (this.isEsthetique && this.esthetiqueIsChecked) {
			this.bookingObject.esthetique.selected = true;
			// Manucure et Pédicure
			if (this.companyDescriptionInfo?.criteres?.esthetique_manucureEtpedicure.value) {
				if (!!this.bookingObject.esthetique.manucureEtpedicure) {
					this.bookingObject.esthetique.manucureEtpedicure = this.bookingObject.esthetique.manucureEtpedicure;
				} else {
					this.bookingObject.esthetique.manucureEtpedicure = [];
					this.prestationToggleChange('esthetique', 'manucureEtpedicure', 'Mains', true);
					this.prestationToggleChange('esthetique', 'manucureEtpedicure', 'Pieds', true);
				}
			}
			// épilation
			if (this.companyDescriptionInfo?.criteres?.esthetique_epilation.value) {
				if (!!this.bookingObject.esthetique.epilation) {
					this.bookingObject.esthetique.epilation = this.bookingObject.esthetique.epilation;
				} else {
					this.bookingObject.esthetique.epilation = [];
					this.prestationToggleChange('esthetique', 'epilation', 'Jambes', true);
					this.prestationToggleChange('esthetique', 'epilation', 'Corps', true);
					this.prestationToggleChange('esthetique', 'epilation', 'Visage', true);
				}
			}

		} else {
			this.bookingObject.esthetique = {selected: false};
		}

		if (this.isSoin && this.soinIsChecked) {
			this.bookingObject.soins.selected = true;
			// soins
			if (this.companyDescriptionInfo?.criteres?.soins_soins.value) {
				if (!!this.bookingObject.soins.soins) {
					this.bookingObject.soins.soins = this.bookingObject.soins.soins;
				} else {
					this.bookingObject.soins.soins = [];
					this.prestationToggleChange('soins', 'soins', 'visage', true);
					this.prestationToggleChange('soins', 'soins', 'corps', true);
					this.prestationToggleChange('soins', 'soins', 'jambes', true);
				}
			}
			// massage
			if (this.companyDescriptionInfo?.criteres?.soins_massage.value) {
				if (!!this.bookingObject.soins.massage) {
					this.bookingObject.soins.massage = this.bookingObject.soins.massage;
				} else {
					this.bookingObject.soins.massage = [];
					this.prestationToggleChange('soins', 'massage', 'Type de massage', true);
				}
			}
		} else {
			this.bookingObject.soins = {selected: false};
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
							categories: opt.categories,
						});
					} else {
						this.optionDivers.push({
							id: opt.id,
							name: opt.name,
							description: opt.description,
							optionRate: opt.optionRate,
							feeType: opt.feeType,
							checked: false,
							categories: opt.categories,
						});
					}
				}
			});
		}
		this.bookingObjectChanged();
	}
	optionContainCategory(optId: string, category: string): boolean {
		return this.optionDivers.find( opt => opt.id === optId).categories.includes(category);
	}
	toggleChangeOptionDivers(value: boolean, item: any) {
		const index = this.optionDivers.findIndex(opt => opt.id === item.id);
		this.optionDivers[index].checked = value;
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
	numberInputChangeValue(prefix: string, action: string, key: string, step: number, decLimit?: number) {
		if ((key === 'coiffureNombre' && !this.coiffureIsChecked) || (key === 'maquillageNombre' && !this.maquillageIsChecked)) {
			if (key === 'coiffureNombre' && !this.coiffureIsChecked)
			this.initBookingObject(true, this.maquillageIsChecked, this.esthetiqueIsChecked, this.soinIsChecked, true, false, action);
		if (key === 'maquillageNombre' && !this.maquillageIsChecked)
			this.initBookingObject(this.coiffureIsChecked, true, this.esthetiqueIsChecked, this.soinIsChecked, false, true, action);
		} else {
			if (action === 'increment') {
				this.bookingObject[prefix][key] += step;
			} else if (action === 'decrement') {
				this.bookingObject[prefix][key] -= step;
				this.bookingObject[prefix][key] =
					this.bookingObject[prefix][key] < decLimit ? decLimit : this.bookingObject[prefix][key];
			}
		}
		this.bookingObjectChanged();
	}


	toggleChange(prefix: string, key: string, value: boolean, subKey?: string) {
		if (!!subKey) {
			this.bookingObject[prefix][key][subKey] = value;
		} else {
			if (value) {
				this.bookingObject[prefix][key] = value;
				if (key === 'conseilsPersonnalises') {
					this.bookingObject[prefix].conseilsPersonnalisesDuree = 1;
				} else if (key === 'essais') {
					this.bookingObject[prefix].essaisNombre = 1;
				}
			} else {
				delete this.bookingObject[prefix][key];
				if (key === 'conseilsPersonnalises') {
					delete this.bookingObject[prefix].conseilsPersonnalisesDuree;
				} else if (key === 'essais') {
					delete this.bookingObject[prefix].essaisNombre;
				}
			}
		}
		this.bookingObjectChanged();
	}
	checkBoxChangeList(prefix: string, key: string, subKey: string, value: boolean, prestationName?: string) {
		if (value) {
			if (key === 'majorationTypeCheveux' || key === 'majorationTypeDePeau') {
				this.bookingObject[prefix][key].push({name: subKey, checked: value});
			} else if (key === 'produitsEtAccessoires' || key === 'produits'){
				this.bookingObject[prefix][key].push({name: subKey, checked: value, quantity: 1});
			} else if (key === 'manucureEtpedicure' || key === 'epilation' || key === 'soins' || key === 'massage') {
				this.bookingObject[prefix][key].find(prestation => prestation.name === prestationName)
				.options.find( opt => opt.name === subKey).checked = value;
			}
		} else {
			if (key === 'manucureEtpedicure' || key === 'epilation' || key === 'soins' || key === 'massage') {
				this.bookingObject[prefix][key].find(prestation => prestation.name === prestationName)
				.options.find( opt => opt.name === subKey).checked = value;
			} else {
				this.bookingObject[prefix][key] = this.bookingObject[prefix][key].filter( opt => opt.name !== subKey);
			}
		}
		this.bookingObjectChanged();
	}
	checkboxComplexeObjects(prefix: string, key: string, value: boolean, index: number) {
		this.bookingObject[prefix][key][index].checked = value;
		this.bookingObjectChanged();
	}
	getProduct(prefix: string, name: string): any {
		if (prefix === 'coiffure') {
			return this.bookingObject[prefix].produitsEtAccessoires.find( p => p.name === name);
		} else {
			return this.bookingObject[prefix].produits.find( p => p.name === name);
		}
	}
	getPrestation(prefix: string, key: string, name: string): any {
		return this.bookingObject[prefix][key]?.find( o => o.name === name);
	}
	numberInputChangeValueComplexeObjects(
		prefix: string,
		action: string,
		key: string,
		productName: string,
		step: number,
		decLimit?: number
	) {
		if (action === 'increment') {
			if (key === 'produitsEtAccessoires' || key === 'produits') {
				this.bookingObject[prefix][key].find(p => p.name === productName).quantity += step;
			}
		} else if (action === 'decrement') {
			if (key === 'produitsEtAccessoires' || key === 'produits') {
				this.bookingObject[prefix][key].find(p => p.name === productName).quantity -= step;
				this.bookingObject[prefix][key].find(p => p.name === productName).quantity =
				this.bookingObject[prefix][key].find(p => p.name === productName).quantity < decLimit
					? decLimit
					: this.bookingObject[prefix][key].find(p => p.name === productName).quantity;
			}

		}
		this.bookingObjectChanged();
	}
	numberInputChangeValuePrestations(
		prefix: string,
		action: string,
		key: string,
		productName: string,
		optionName: string,
		step: number,
		decLimit?: number
	) {
		if (action === 'increment') {
				this.bookingObject[prefix][key].find(p => p.name === productName).options
				.find( o=> o.name === optionName).value += step;
		} else if (action === 'decrement') {
				this.bookingObject[prefix][key].find(p => p.name === productName)
				.options.find( o=> o.name === optionName).value -= step;
				this.bookingObject[prefix][key].find(p => p.name === productName)
				.options.find( o=> o.name === optionName).value =
				this.bookingObject[prefix][key].find(p => p.name === productName)
				.options.find( o=> o.name === optionName).value < decLimit
					? decLimit
					: this.bookingObject[prefix][key].find(p => p.name === productName)
					.options.find( o=> o.name === optionName).value;

		}
		this.bookingObjectChanged();
	}
	prestationToggleChange(
		prefix: string,
		key: string,
		prestationName: string,
		value: boolean
	) {
			if (value) {
				const prestation = this.companyDescriptionInfo?.criteres[`${prefix}_${key}`].prestations
				.find( p => p.name === prestationName);
				const opt = key === 'prestationInvitesProches' ? {
					name: prestation.name,
					checked: value,
					options: prestation.options.map( o => { return {name: o.name, value: 1} })
				} :
				{
					name: prestation.name,
					checked: value,
					options: prestation.options.map( o => { return {name: o.name, value: 1, checked: false} })
				};
				this.bookingObject[prefix][key].push(opt);
			} else {
				this.bookingObject[prefix][key] =
					this.bookingObject[prefix][key].filter( p => p.name !== prestationName );
			}
		this.bookingObjectChanged();
	}
	stripUnnecessaryFalseValues() {
		this.bookingObject.optionDivers = this.optionDivers?.filter(opt => opt.checked);
	}
	bookingObjectChanged() {
		this.stripUnnecessaryFalseValues();
		// TODO trigger store's action
		this.bookingStore.setBookingObj(this.bookingObject);
	}
}
