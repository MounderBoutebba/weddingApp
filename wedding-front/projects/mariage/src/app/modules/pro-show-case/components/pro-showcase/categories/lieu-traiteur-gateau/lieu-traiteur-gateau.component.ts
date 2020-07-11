import { Component, OnInit, Input } from '@angular/core';
import { Company } from 'projects/mariage/src/app/modules/user/models/company.model';
import { LieuTraiteurGateauBookingInterface, bookingObj } from './lieu-traiteur-gateau.booking.interface';
import { CategoryLabelEnum } from 'projects/mariage/src/app/modules/user/components/company/company-details/category-label.enum';
import { BookingStore } from 'projects/mariage/src/app/modules/store/booking';
import { FeeType } from 'projects/mariage/src/app/modules/user/models/option.model';

@Component({
	selector: 'app-lieu-traiteur-gateau',
	templateUrl: './lieu-traiteur-gateau.component.html',
	styleUrls: ['./lieu-traiteur-gateau.component.scss']
})
export class LieuTraiteurGateauComponent implements OnInit {
	@Input() companyDescriptionInfo: Company;
	@Input() searchedCategory: string;
	isLieu: boolean;
	isTraiteur: boolean;
	isGateau: boolean;
	lieuIsChecked: boolean;
	traiteurIsChecked: boolean;
	gateauIsChecked: boolean;
	showmoreBoissonsAlcoolises: boolean;
	showmoreBoissonsNonAlcoolises: boolean;
	showmoreGateauModels: boolean;
	feeType = FeeType;
	gateauxProduits = [];
	vinHonneurCocktailBuffet: {products: {name: string, options: any}[]} = {products: []};
	Dinner: {products: {name: string, options: any}[]} = {products: []};
	bookingObject: LieuTraiteurGateauBookingInterface = bookingObj;
	optionDivers: any;
	constructor(private readonly bookingStore: BookingStore) {}
	showMoreOptions: {
		vinHonneurCocktailBuffet: {
			products: {name: string, value: boolean}[],
		},
		Dinner: {
			products: {name: string, value: boolean}[],
		},
	};
	ngOnInit(): void {
		console.log('criteres',this.companyDescriptionInfo.criteres);
		this.showmoreBoissonsAlcoolises = false;
		this.showmoreBoissonsNonAlcoolises = false;
		this.showmoreGateauModels = false;
		this.isLieu = this.setIsLieu(this.companyDescriptionInfo.company.categories);
		this.isTraiteur = this.setIsTraiteur(this.companyDescriptionInfo.company.categories);
		this.isGateau = this.setIsGateau(this.companyDescriptionInfo.company.categories);
		this.showMoreOptions = {
			vinHonneurCocktailBuffet: {
				products: [],
			},
			Dinner: {
				products: [],
			},
		};
		this.initBookingObject(
			this.searchedCategory === CategoryLabelEnum.LIEU,
			this.searchedCategory === CategoryLabelEnum.TRAITEUR,
			this.searchedCategory === CategoryLabelEnum.GATEAU_MARIAGE
		);
	}
	setIsLieu(categories: string[]): boolean {
		return !!categories.filter(category => category === CategoryLabelEnum.LIEU).length;
	}
	setIsTraiteur(categories: string[]): boolean {
		return !!categories.filter(category => category === CategoryLabelEnum.TRAITEUR).length;
	}
	setIsGateau(categories: string[]): boolean {
		return !!categories.filter(category => category === CategoryLabelEnum.GATEAU_MARIAGE).length;
	}
	initBookingObject(lieuIsChecked: boolean, traiteurIsChecked: boolean, gateauIsChecked: boolean) {
		this.lieuIsChecked = lieuIsChecked;
		this.traiteurIsChecked = traiteurIsChecked;
		this.gateauIsChecked = gateauIsChecked;

		if (this.isLieu && this.lieuIsChecked) {
			this.bookingObject.lieu.selected = true;
			if (!this.bookingObject.lieu.debutLocation) {
				this.bookingObject.lieu.debutLocation = {heure: 0, min: 0};
				this.bookingObject.lieu.debutLocation.heure = this.companyDescriptionInfo?.criteres?.lieu_debutLocation?.heures;
				this.bookingObject.lieu.debutLocation.min = this.companyDescriptionInfo?.criteres?.lieu_debutLocation?.min;
			}

			if (!this.bookingObject.lieu.finLocation) {
				this.bookingObject.lieu.finLocation = {heure: 0, min: 0};
				this.bookingObject.lieu.finLocation.heure = this.companyDescriptionInfo?.criteres?.lieu_limiteHoraire?.heures;
				this.bookingObject.lieu.finLocation.min = this.companyDescriptionInfo?.criteres?.lieu_limiteHoraire?.min;

			}



		} else {
			this.bookingObject.lieu = {selected: false};
		}
		if (this.isTraiteur && this.traiteurIsChecked) {
			this.bookingObject.traiteur.selected = true;
			if (this.companyDescriptionInfo?.criteres?.traiteur_vinHonneurCocktailBuffet.value) {
				this.companyDescriptionInfo?.criteres?.traiteur_vinHonneurCocktailBuffet.products.forEach( product => {
					const options = [];
					product.options.forEach( opt => {
						if (opt.value) {
							options.push({name: opt.name, value: false, nbrPieces: 1, label: opt.label});
						}
					} );
					this.vinHonneurCocktailBuffet.products.push({name: product.name, options});
				});
			}
			if (this.companyDescriptionInfo?.criteres?.traiteur_Dinner.value) {
				this.companyDescriptionInfo?.criteres?.traiteur_Dinner.products.forEach( product => {
					const options = [];
					product.options.forEach( opt => {
						if (opt.value) {
							options.push({name: opt.name, value: false, nbrPieces: 1, label: opt.label});
						}
					} );
					this.Dinner.products.push({name: product.name, options});
				});
			}

			this.bookingObject.traiteur.boissonsAlcoolises = [];
			this.companyDescriptionInfo?.criteres?.traiteur_boissonsAlcoolises.options.forEach(opt => {
				if (opt.value) {
					this.bookingObject.traiteur.boissonsAlcoolises.push({
						name: opt.name,
						value: false,
						nbrPieces: 1,
						label: opt.label
					});
				}
			});
			this.bookingObject.traiteur.boissonsNonAlcoolises = [];
			this.companyDescriptionInfo?.criteres?.traiteur_boissonsNonAlcoolises.options.forEach(opt => {
				if (opt.value) {
					this.bookingObject.traiteur.boissonsNonAlcoolises.push({
						name: opt.name,
						value: false,
						nbrPieces: 1,
						label: opt.label
					});
				}
			});
		} else {
			this.bookingObject.traiteur = {selected: false};
		}
		if (this.isGateau && this.gateauIsChecked) {
			this.bookingObject.gateau.selected = true;
			this.companyDescriptionInfo?.criteres?.gateaumariage_gateaux.options.forEach(opt => {
				if (opt.value) {
					const minPart = this.getProduitOpt(opt.name, 'Nbre de parts min');
					this.gateauxProduits.push({
						name: opt.name,
						value: false,
						label: opt.label,
						nbrEtages: 1,
						nbrParts: minPart.value
					});
				}
			});
		} else {
			this.showmoreGateauModels = false;
			this.gateauxProduits = [];
			this.bookingObject.gateau = {selected: false};
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
	setShowMore(key: string, option?: string) {
		if (!!option) {
			if (!!this.getShowMore(key, option)) {
				this.showMoreOptions[key].products.find( opt => opt.name === option ).value = !this.getShowMore(key, option)?.value;
			} else {
				this.showMoreOptions[key].products.push({
					name: option,
					value: !this.getShowMore(key, option)?.value,
				});
			}
		} else {
			this.showMoreOptions[key].value = !this.getShowMore(key)?.value;
		}

		console.log('setShowMore', this.showMoreOptions);
	}
	getShowMore(key: string, option?: string): any {
		if (!!option) {
			return this.showMoreOptions[key].products.find( opt => opt.name === option );
		} else {
			return this.showMoreOptions[key];
		}
	}
	getProduct(key: string, productName: string, optName: string): any {
		if (key === 'vinHonneurCocktailBuffet') {
			return this.vinHonneurCocktailBuffet.products
			.find( p => p.name === productName ).options.find( opt => opt.name === optName );
		} else if (key === 'Dinner') {
			return this.Dinner.products
			.find( p => p.name === productName ).options.find( opt => opt.name === optName );
		}
	}
	optionContainCategory(optId: string, category: string): boolean {
		return this.optionDivers.find( opt => opt.id === optId).categories.includes(category);
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
	updateHours(min: number, prefix: string, key: string) {
		if (min >= 60) {
			this.bookingObject[prefix][key].min = min - 60;
			this.bookingObject[prefix][key].heure++;
			if (this.bookingObject[prefix][key].heure > 23) {
				this.bookingObject[prefix][key].heure = 0;
			}
		} else if (min < 0) {
			this.bookingObject[prefix][key].min = 60 - -min;
			this.bookingObject[prefix][key].heure--;
			if (this.bookingObject[prefix][key].heure > 23) {
				this.bookingObject[prefix][key].heure = 0;
			}
		}
	}
	timeInputChangeValue(prefix: string, action: string, key: string, step: number, decLimit?: number) {
		if (action === 'increment') {
			this.bookingObject[prefix][key].min += step;
			this.updateHours(this.bookingObject[prefix][key].min, prefix, key);
		} else if (action === 'decrement') {
			this.bookingObject[prefix][key].min -= step;
			this.updateHours(this.bookingObject[prefix][key].min, prefix, key);
			this.bookingObject[prefix][key].heure =
			this.bookingObject[prefix][key].heure < 0 ? 24 + this.bookingObject[prefix][key].heure : this.bookingObject[prefix][key].heure;
		}
		this.bookingObjectChanged();
	}
	numberInputChangeValueNbrInvHebergement(
		prefix: string,
		action: string,
		key: string,
		step: number,
		incLimit?: number
	) {
		if (action === 'increment') {
			this.bookingObject[prefix][key] += step;
			this.bookingObject[prefix][key] =
				this.bookingObject[prefix][key] > incLimit ? incLimit : this.bookingObject[prefix][key];
		}
		this.bookingObjectChanged();
	}
	toggleChange(prefix: string, key: string, value: boolean, subKey?: string) {
		if (!!subKey) {
			this.bookingObject[prefix][key][subKey] = value;
		} else {
			if (value) {
				this.bookingObject[prefix][key] = value;
				if (key === 'parking') {
					this.bookingObject[prefix].parkingNbrPlace = 1;
				} else if (key === 'hebergementInvites') {
					this.bookingObject[prefix].hebergementInvitesNbrDeNuits = 1;
					this.bookingObject[prefix].hebergementInvitesNbrInvites = 1;
				} else if (key === 'droitDeBouchon') {
					this.bookingObject[prefix].droitDeBouchonNbrBouteilles = 1;
				}
			} else {
				delete this.bookingObject[prefix][key];
				if (key === 'parking') {
					delete this.bookingObject[prefix].parkingNbrPlace;
				} else if (key === 'hebergementInvites') {
					delete this.bookingObject[prefix].hebergementInvitesNbrDeNuits;
					delete this.bookingObject[prefix].hebergementInvitesNbrInvites;
				} else if (key === 'droitDeBouchon') {
					delete this.bookingObject[prefix].droitDeBouchonNbrBouteilles;
				}
			}
		}
		this.bookingObjectChanged();
	}
	numberInputChangeValueObjectComplex(
		prefix: string,
		action: string,
		key: string,
		step: number,
		index: number,
		decLimit?: number
	) {
		if (!!prefix) {
			if (action === 'increment') {
				this.bookingObject[prefix][key][index].nbrPieces += step;
			} else if (action === 'decrement') {
				this.bookingObject[prefix][key][index].nbrPieces -= step;
				// tslint:disable-next-line:max-line-length
				this.bookingObject[prefix][key][index].nbrPieces =
					this.bookingObject[prefix][key][index].nbrPieces < decLimit
						? decLimit
						: this.bookingObject[prefix][key][index].nbrPieces;
			}
		} else {
			// option divers

			if (action === 'increment') {
				this.optionDivers[index].examplaire += step;
			} else if (action === 'decrement') {
				this.optionDivers[index].examplaire -= step;
				this.optionDivers[index].examplaire =
					this.optionDivers[index].examplaire < decLimit
						? decLimit
						: this.optionDivers[index].examplaire;
			}
		}
		this.bookingObjectChanged();
	}
	numberInputChangeValueGateau(
		prefix: string,
		action: string,
		key: string,
		step: number,
		index: number,
		subKey: string,
		decLimit?: number
	) {
		if (action === 'increment') {
			this.gateauxProduits[index][subKey] += step;
		} else if (action === 'decrement') {
			this.gateauxProduits[index][subKey] -= step;
			// tslint:disable-next-line:max-line-length
			this.gateauxProduits[index][subKey] =
			this.gateauxProduits[index][subKey] < decLimit
					? decLimit
					: this.gateauxProduits[index][subKey];
		}
		this.bookingObjectChanged();
	}
	toggleChangeProduit(prefix: string, key: string, value: boolean, index: number) {
		this.gateauxProduits[index].value = value;
		this.bookingObjectChanged();
	}
	toggleChangeBoisson(prefix: string, key: string, value: boolean, index: number) {
		this.bookingObject[prefix][key][index].value = value;
		this.bookingObjectChanged();
	}
	toggleChangeProduitTraiteur(key: string, productName: string, optName: string, value: boolean) {
		if (key === 'vinHonneurCocktailBuffet') {
			this.vinHonneurCocktailBuffet.products
			.find( p => p.name === productName ).options.find( opt => opt.name === optName ).value = value;
		} else if (key === 'Dinner') {
			this.Dinner.products
			.find( p => p.name === productName ).options.find( opt => opt.name === optName ).value = value;
		}
		this.bookingObjectChanged();
	}
	numberInputChangeValueProduitTraiteur(action: string, key: string, productName: string, optName: string, step: number, decLimit?: number) {
		if (key === 'vinHonneurCocktailBuffet') {
			if (action === 'increment') {
				this.vinHonneurCocktailBuffet.products
				.find( p => p.name === productName ).options.find( opt => opt.name === optName ).nbrPieces += step;
			} else if (action === 'decrement') {
				this.vinHonneurCocktailBuffet.products
				.find( p => p.name === productName ).options.find( opt => opt.name === optName ).nbrPieces -= step;
				this.vinHonneurCocktailBuffet.products
				.find( p => p.name === productName ).options.find( opt => opt.name === optName ).nbrPieces =
				this.vinHonneurCocktailBuffet.products
				.find( p => p.name === productName ).options.find( opt => opt.name === optName ).nbrPieces < decLimit
					? decLimit
					: this.vinHonneurCocktailBuffet.products
					.find( p => p.name === productName ).options.find( opt => opt.name === optName ).nbrPieces;

		}
		}
		if (key === 'Dinner') {
			if (action === 'increment') {
				this.Dinner.products
				.find( p => p.name === productName ).options.find( opt => opt.name === optName ).nbrPieces += step;
			} else if (action === 'decrement') {
				this.Dinner.products
				.find( p => p.name === productName ).options.find( opt => opt.name === optName ).nbrPieces -= step;
				this.Dinner.products
				.find( p => p.name === productName ).options.find( opt => opt.name === optName ).nbrPieces =
				this.Dinner.products
				.find( p => p.name === productName ).options.find( opt => opt.name === optName ).nbrPieces < decLimit
					? decLimit
					: this.Dinner.products
					.find( p => p.name === productName ).options.find( opt => opt.name === optName ).nbrPieces;

		}
		}
		this.bookingObjectChanged();
	}
	toggleChangeOptionDivers(value: boolean, item: any) {
		const index = this.optionDivers.findIndex(opt => opt.id === item.id);
		this.optionDivers[index].checked = value;
		this.bookingObjectChanged();
	}
	getProduitOpt(produitName: string, optName: string) {
		return this.companyDescriptionInfo.criteres?.gateaumariage_gateaux.options
		.find(option => option.name === produitName).opts.find(opt => opt.name === optName);
	}
	updateFinDeLocation() {
		/*if (this.bookingObject.lieu.debutLocation && this.bookingObject.lieu.finLocation && this.bookingObject.lieu.limiteHoraire) {
			const diff = this.bookingObject.lieu.finLocation - this.bookingObject.lieu.debutLocation < this.bookingObject.lieu.limiteHoraire;
			this.bookingObject.lieu.finLocation = diff ?
			this.bookingObject.lieu.debutLocation + this.bookingObject.lieu.limiteHoraire : this.bookingObject.lieu.finLocation;
		}*/
	}
	stripUnnecessaryValues() {
		if (!!this.gateauxProduits.filter( produit => produit.value ).length) {
			this.bookingObject.gateau.produits = this.gateauxProduits.filter( produit => produit.value );
		}
		if (!!this.vinHonneurCocktailBuffet.products.length) {
			console.log('vinHonneurCocktailBuffet', this.vinHonneurCocktailBuffet);
			this.bookingObject.traiteur.vinHonneurCocktailBuffet = {products: []};
			this.vinHonneurCocktailBuffet.products.forEach(product => {
				const options = [];
				product.options.forEach( opt => {
					if (opt.value) {
						options.push(opt);
					}
				} );
				this.bookingObject.traiteur.vinHonneurCocktailBuffet.products.push({name: product.name, options});
			});
		}
		if (!!this.Dinner.products.length) {
			console.log('Dinner', this.Dinner);
			this.bookingObject.traiteur.Dinner = {products: []};
			this.Dinner.products.forEach(product => {
				const options = [];
				product.options.forEach( opt => {
					if (opt.value) {
						options.push(opt);
					}
				} );
				this.bookingObject.traiteur.Dinner.products.push({name: product.name, options});
			});
		}
		this.bookingObject.optionDivers = this.optionDivers?.filter(opt => opt.checked);


	}
	bookingObjectChanged() {
		this.updateFinDeLocation();
		this.stripUnnecessaryValues();
		this.bookingStore.setBookingObj(this.bookingObject);
	}
}
