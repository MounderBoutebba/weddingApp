import { Injectable } from '@angular/core';
import { BookingService } from '../booking.service';
import { FeeType } from '../../../user/models/option.model';
import { LieuTraiteurGateauBookingInterface } from '../../components/pro-showcase/categories/lieu-traiteur-gateau/lieu-traiteur-gateau.booking.interface';
import { LieuCriteres } from '../../../user/components/company/company-details/lieu/lieu.interface';
import { TraiteurCriteres } from '../../../user/components/company/company-details/traiteur/traiteur.interface';
import { GateauMariageCriteres } from '../../../user/components/company/company-details/gateau-mariage/gateau-mariage.interface';
import { Setting } from '../../../user/models/setting.model';

@Injectable({providedIn: 'root'})
export class LieuTraiteurEsthetiqueBookingService {
    constructor(private readonly bookingService: BookingService) { }
    // tslint:disable-next-line:max-line-length
    priceForOptionDivers(bookingObj: LieuTraiteurGateauBookingInterface, numberOfGuests: number, total: number): number {
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
    setInitialPrice(
        bookingObj: LieuTraiteurGateauBookingInterface,
        lieuCriteres: LieuCriteres,
        traiteurCriteres: TraiteurCriteres,
        gateauxCriteres: GateauMariageCriteres,
        ): number {
		let total = 0;

        total = bookingObj.lieu.selected ? total += lieuCriteres.tarif_horaire : total;

        total = bookingObj.traiteur.selected ? total += traiteurCriteres.tarif_horaire : total;

		total = bookingObj.gateau.selected ? total += gateauxCriteres.tarif_horaire : total;

		return total;
    }
    priceForVin(
        bookingObj: LieuTraiteurGateauBookingInterface,
        traiteurCriteres: TraiteurCriteres,
        total: number,
        ): number {
            if (!!bookingObj.traiteur.vinHonneurCocktailBuffet?.products?.length) {
                bookingObj.traiteur.vinHonneurCocktailBuffet.products.forEach(product => {
                    const productCriteria = traiteurCriteres.vinHonneurCocktailBuffet.products.find( p => p.name === product.name);
                    product.options.forEach(opt => {
                        if (opt.value) {
                            const tarif = productCriteria.options.find( o => o.name === opt.name ).tarif;
                            total += tarif * opt.nbrPieces;
                        }
                    });
                });
            }

		return total;
    }
    priceForDinner(
        bookingObj: LieuTraiteurGateauBookingInterface,
        traiteurCriteres: TraiteurCriteres,
        total: number,
        ): number {
            if (!!bookingObj.traiteur.Dinner?.products?.length) {
                bookingObj.traiteur.Dinner.products.forEach(product => {
                    const productCriteria = traiteurCriteres.Dinner.products.find( p => p.name === product.name);
                    product.options.forEach(opt => {
                        if (opt.value) {
                            const tarif = productCriteria.options.find( o => o.name === opt.name ).tarif;
                            total += tarif * opt.nbrPieces;
                        }
                    });
                });
            }

		return total;
    }
    priceForGateaux(
        bookingObj: LieuTraiteurGateauBookingInterface,
        gateauxCriteres: GateauMariageCriteres,
        total: number,
        ): number {
            if (!!bookingObj.gateau.produits?.length) {
                bookingObj.gateau.produits.forEach(gateau => {
                    if (gateau.value) {
                        const tarif = gateauxCriteres.gateaux.options.find(opt=> opt.name === gateau.name)
                        .opts.find(o=> o.name === 'Tarif par part').value;
                        total += tarif * gateau.nbrParts;
                    }
                });
            }

		return total;
    }
    priceForBoissonAlcoolise(
        bookingObj: LieuTraiteurGateauBookingInterface,
        traiteurCriteres: TraiteurCriteres,
        total: number,
        ): number {
            if (!!bookingObj.traiteur.boissonsAlcoolises?.length) {
                bookingObj.traiteur.boissonsAlcoolises.forEach(product => {
                    if (product.value) {
                        const tarif = traiteurCriteres.boissonsAlcoolises.options.find( p => p.name === product.name).tarif;
                        total += tarif * product.nbrPieces;
                    }
                });
            }

		return total;
    }
    priceForBoissonNonAlcoolise(
        bookingObj: LieuTraiteurGateauBookingInterface,
        traiteurCriteres: TraiteurCriteres,
        total: number,
        ): number {
            if (!!bookingObj.traiteur.boissonsNonAlcoolises?.length) {
                bookingObj.traiteur.boissonsNonAlcoolises.forEach(product => {
                    if (product.value) {
                        const tarif = traiteurCriteres.boissonsNonAlcoolises.options.find( p => p.name === product.name).tarif;
                        total += tarif * product.nbrPieces;
                    }
                });
            }

		return total;
    }
    calculatePrice(
        bookingObj: LieuTraiteurGateauBookingInterface,
        lieuCriteres: LieuCriteres,
        traiteurCriteres: TraiteurCriteres,
        gateauxCriteres: GateauMariageCriteres,
        numberOfGuests: number,
        bookingDate: {startDate: Date, endDate: Date},
        settings: Setting[],
        categories: string[],
        weekendVariation: {value: boolean, percentage: number},
        ): number {
        let total = 0;
        // lieu
        if (bookingObj.lieu.selected) {
            total += lieuCriteres.tarif_horaire;

            if (bookingObj.lieu?.chambrePourLesMariee) {
                total = lieuCriteres.chambrePourLesMarieeInclusDansPrix ?
                                        total : total + lieuCriteres.chambrePourLesMarieeTarif;
            }

            if (bookingObj.lieu?.cuisinePourLeTraiteur) {
                total = lieuCriteres.cuisinePourLeTraiteurInclusDansPrix ?
                                        total : total + lieuCriteres.cuisinePourLeTraiteurTarif;
            }

            if (bookingObj.lieu?.terrasse) {
                total = lieuCriteres.terrasseInclusDansPrix ?
                                        total : total + lieuCriteres.terrasseTarif;
            }

            if (bookingObj.lieu?.jardin) {
                total = lieuCriteres.jardinInclusDansPrix ?
                                        total : total + lieuCriteres.jardinTarif;
            }

            if (bookingObj.lieu?.chapiteau) {
                total = lieuCriteres.chapiteauInclusDansPrix ?
                                        total : total + lieuCriteres.chapiteauTarif;
            }

            if (bookingObj.lieu?.parking) {
                total = lieuCriteres.parkingInclusDansPrix ?
                                        total : total + lieuCriteres.parkingTarif;
            }

            if (bookingObj.lieu?.hebergementInvites) {
                total += lieuCriteres.hebergementInvitesTarif * bookingObj.lieu.hebergementInvitesNbrDeNuits
                        * bookingObj.lieu.hebergementInvitesNbrInvites;
            }

            total = bookingObj.lieu?.decoration ? total + lieuCriteres.decorationTarif : total;

            total = bookingObj.lieu?.vaiselleEtCouvert ? total + lieuCriteres.laviselleEtCouvertTarif : total;

            total = bookingObj.lieu?.drapeDeTable ? total + lieuCriteres.drapeDeTableTarif : total;

        }

        // traiteur
        if (bookingObj.traiteur.selected) {
            total += traiteurCriteres.tarif_horaire;

            // vin
            total = this.priceForVin(bookingObj, traiteurCriteres, total);

            // dinner
            total = this.priceForDinner(bookingObj, traiteurCriteres, total);

            // droit de bouchon
            total = bookingObj.traiteur?.droitDeBouchon ?
            total + bookingObj.traiteur.droitDeBouchonNbrBouteilles * traiteurCriteres.droitDeBouchonTarif : total;


            // boissons alcoolises
            total = this.priceForBoissonAlcoolise(bookingObj, traiteurCriteres, total);


            // boissons non-alcoolises
            total = this.priceForBoissonNonAlcoolise(bookingObj, traiteurCriteres, total);


            // service en salle
            total = bookingObj.traiteur?.serviceEnSalle ? total + traiteurCriteres.serviceEnSalleTarif : total;

            // service debarassage
            total = bookingObj.traiteur?.serviceDebarrassageEtNettoyage ?
                        total + traiteurCriteres.serviceDebarrassageEtNettoyageTarif : total;

        }

        // gateau
        if (bookingObj.gateau.selected) {
            total += gateauxCriteres.tarif_horaire;
            // gateaux
            total = this.priceForGateaux(bookingObj, gateauxCriteres, total);

            // livraison
            total = bookingObj.gateau?.livraison ? total + gateauxCriteres.gateaux.livraison.tarif : total;

        }

        // option divers
        total = this.priceForOptionDivers(bookingObj, numberOfGuests, total);

        // majoration
        total = this.bookingService.applyMajorationToTotal(total, bookingDate, settings, categories, weekendVariation);

		return total;
    }
}
