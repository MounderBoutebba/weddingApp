import { Injectable } from '@angular/core';
import { BookingService } from '../booking.service';
import { Setting } from '../../../user/models/setting.model';
import { FeeType } from '../../../user/models/option.model';
import { DecorateurFleuristBookingInterface } from '../../components/pro-showcase/categories/decorateur-fleuriste/decorateur-fleuriste.booking.interface';
import { DecorateurCriteres } from '../../../user/components/company/company-details/decorateur/decorateur.interface';
import { FleuristeCriteres } from '../../../user/components/company/company-details/fleuriste/fleuriste.interface';

@Injectable({
	providedIn: 'root'
})
export class DecorateurFleuristeBookingService {
	constructor(private readonly bookingService: BookingService) {}

	priceForOptionDivers(
		bookingObj: DecorateurFleuristBookingInterface,
		numberOfGuests: number,
		total: number
	): number {
		if (!!bookingObj?.optionDivers) {
			bookingObj.optionDivers.forEach(opt => {
				if (opt.checked) {
					switch (opt.feeType) {
						case FeeType.SINGLE_FEE:
							total += opt.optionRate;
							break;
						case FeeType.UNIT_FEE:
							total += opt.examplaire * opt.optionRate;
							break;
						case FeeType.GUEST_FEE:
							total += numberOfGuests * opt.optionRate;
							break;
						default:
							break;
					}
				}
			});
		}
		return total;
	}

	setCritereObj(prefix: string, esObject: any): any {
		const objectKeys = Object.keys(esObject);
		const object = {};
		objectKeys.forEach(key => {
			if (key.includes(prefix)) {
				object[key.replace(prefix, '')] = esObject[key];
			}
		});
		return object;
	}

	setInitialPrice(bookingObj: DecorateurFleuristBookingInterface, decorateurCriteres: DecorateurCriteres): number {
		let total = 0;

		total += bookingObj.decorateur.dureeMissionDecorateur * decorateurCriteres.tarif_horaire;

		return total;
	}

	priceFordecorations(
		bookingObj: DecorateurFleuristBookingInterface,
		decorateurCriteres: DecorateurCriteres,
		total: number
	): number {
		if (!!bookingObj.decorateur.decorationsAssociees?.length) {
			bookingObj.decorateur.decorationsAssociees.forEach(decoration => {
				if (decoration.checked) {
					const decorationCritere = decorateurCriteres.decorationAssociees.options.find(
						s => s.name === decoration.name
					);
					total = total + decorationCritere.tarif;
				}
			});
		}

		return total;
	}

	priceForFleurs(
		total: number,
		bookingObj: DecorateurFleuristBookingInterface,
		fleuristCriteres: FleuristeCriteres
	): number {
		if (!!bookingObj.fleurist.fleurs?.length) {
			bookingObj.fleurist.fleurs.forEach(produit => {
				if (produit.checked) {
					const tarif = fleuristCriteres.fleurs.options.find(p => p.name === produit.name).tarif;
					total += tarif * produit.quantity;
				}
			});
		}

		return total;
	}

	priceForFeuillages(
		total: number,
		bookingObj: DecorateurFleuristBookingInterface,
		fleuristCriteres: FleuristeCriteres
	): number {
		if (!!bookingObj.fleurist.feuillages?.length) {
			bookingObj.fleurist.feuillages.forEach(produit => {
				if (produit.checked) {
					const tarif = fleuristCriteres.feuillages.options.find(p => p.name === produit.name).tarif;
					total += tarif * produit.quantity;
				}
			});
		}

		return total;
	}

	priceForDecorations(
		total: number,
		bookingObj: DecorateurFleuristBookingInterface,
		fleuristCriteres: FleuristeCriteres
	): number {
		if (!!bookingObj.fleurist.decorations?.length) {
			bookingObj.fleurist.decorations.forEach(produit => {
				if (produit.checked) {
					const tarif = fleuristCriteres.decoration.options.find(p => p.name === produit.name).tarif;
					total += tarif * produit.quantity;
				}
			});
		}

		return total;
	}

	calculatePrice(
		bookingObj: DecorateurFleuristBookingInterface,
		decorateurCriteres: DecorateurCriteres,
		fleuristCriteres: FleuristeCriteres,
		numberOfGuests: number,
		bookingDate: { startDate: Date; endDate: Date },
		settings: Setting[],
		categories: string[],
		weekendVariation: { value: boolean; percentage: number }
	): number {
		let total = 0;

		// duree mission decorateur
		if (bookingObj.decorateur.selected) {
			total += decorateurCriteres.tarif_horaire * bookingObj.decorateur.dureeMissionDecorateur;

			// prix decorateur services
			total = this.priceFordecorations(bookingObj, decorateurCriteres, total);

			//  price conseils

			total = bookingObj.decorateur?.conseilsPersonnalises
				? total + decorateurCriteres.conseilPersonalisesTarif
				: total;

			// price livraison

			total = bookingObj.decorateur?.livraisonDuMateriel
				? total + decorateurCriteres.livraisonDuMaterielTarif
				: total;

			// price montage demontage
			total = bookingObj.decorateur?.montageDemontage ? total + decorateurCriteres.montageDemontageTarif : total;
		}

		if (bookingObj.fleurist.selected) {
			total += fleuristCriteres.tarif_horaire * bookingObj.fleurist.dureeMissionFleurist;

			// price for fleurs
			total = this.priceForFleurs(total, bookingObj, fleuristCriteres);

			// price for feuillages
			total = this.priceForFeuillages(total, bookingObj, fleuristCriteres);

			// price for decorations
			total = this.priceForFeuillages(total, bookingObj, fleuristCriteres);

			// price livraison

			total = bookingObj.fleurist?.livraison ? total + fleuristCriteres.livraisonTarif : total;
		}
		// option divers

		total = this.priceForOptionDivers(bookingObj, numberOfGuests, total);

		// majoration
		total = this.bookingService.applyMajorationToTotal(total, bookingDate, settings, categories, weekendVariation);

		return total;
	}
}
