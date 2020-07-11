import { Injectable } from '@angular/core';
import { BookingService } from '../booking.service';
import { FeeType } from '../../../user/models/option.model';
import { coiffureMaquillageEsthetiqueSoinsBookingInterface } from '../../components/pro-showcase/categories/coiffure-maquillage-esthetique-soins/coiffure-maquillage-esthetique-soins.booking.interface';
import { CoiffureCriteres } from '../../../user/components/company/company-details/coiffure/coiffure.interface';
import { MaquillageCriteres } from '../../../user/components/company/company-details/maquillage/maquillage.interface';
import { EsthetiqueCriteres } from '../../../user/components/company/company-details/esthetique/esthetique.interface';
import { SoinCriteres } from '../../../user/components/company/company-details/soin/soin.interface';
import { Setting } from '../../../user/models/setting.model';

@Injectable({providedIn: 'root'})
export class CoiffureMaquillageEsthetiqueSoinsBookingService {
    constructor(private readonly bookingService: BookingService) { }
  // tslint:disable-next-line:max-line-length
  priceForOptionDivers(bookingObj: coiffureMaquillageEsthetiqueSoinsBookingInterface, numberOfGuests: number): number {
    let total = 0;
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
  calculatePriceProduitsAccessoire(
    total: number,
    bookingObj: coiffureMaquillageEsthetiqueSoinsBookingInterface,
    prefix: string,
    coiffureCriteres: CoiffureCriteres,
    maquillageCriteres: MaquillageCriteres,
  ): number {
    if (prefix === 'coiffure') {
      if (!!bookingObj.coiffure.produitsEtAccessoires?.length) {
        bookingObj.coiffure.produitsEtAccessoires.forEach(produit => {
          if (produit.checked) {
            const tarif = coiffureCriteres.produitsEtAccessoires.options.find( p => p.name === produit.name ).tarif;
            total += tarif * produit.quantity;
          }
        });
      }
    } else if (prefix === 'maquillage') {
      if (!!bookingObj.maquillage.produits?.length) {
        bookingObj.maquillage.produits.forEach(produit => {
          if (produit.checked) {
            const tarif = maquillageCriteres.produits.options.find( p => p.name === produit.name ).tarif;
            total += tarif * produit.quantity;
          }
        });
      }
    }

    return total;
  }
  calculatePriceTypeMajoration(
    total: number,
    bookingObj: coiffureMaquillageEsthetiqueSoinsBookingInterface,
    prefix: string,
    coiffureCriteres: CoiffureCriteres,
    maquillageCriteres: MaquillageCriteres,
  ): number {
    if (prefix === 'coiffure') {
      if (!!bookingObj.coiffure?.majorationTypeCheveux?.length) {
        bookingObj.coiffure.majorationTypeCheveux.forEach(maj => {
          if (maj.checked) {
            const majoration = coiffureCriteres.majorationTypeCheveux.options.find( m => m.name === maj.name ).majoration;
            total += coiffureCriteres.tarif_horaire * majoration * 0.01;
          }
        });
      }
    } else if (prefix === 'maquillage') {
      if (!!bookingObj.maquillage?.majorationTypeDePeau?.length) {
        bookingObj.maquillage.majorationTypeDePeau.forEach(maj => {
          if (maj.checked) {
            const majoration = maquillageCriteres.majorationTypeDePeau.options.find( m => m.name === maj.name ).majoration;
            total += maquillageCriteres.tarif_horaire * majoration * 0.01;
          }
        });
      }
    }

    return total;
  }
  calculatePricePrestationInvites(
    total: number,
    bookingObj: coiffureMaquillageEsthetiqueSoinsBookingInterface,
    prefix: string,
    coiffureCriteres: CoiffureCriteres,
    maquillageCriteres: MaquillageCriteres,
    esthetiqueCriteres: EsthetiqueCriteres,
    soinsCriteres: SoinCriteres,
    key?: string
  ): number {
    if (prefix === 'coiffure') {
      if (!!bookingObj.coiffure.prestationInvitesProches?.length) {
        bookingObj.coiffure.prestationInvitesProches?.forEach(prestation => {
          if (prestation.checked) {
            prestation.options.forEach(opt => {
              const tarif = coiffureCriteres.prestationInvitesProches
              .prestations.find(p => p.name === prestation.name).options.find( o => o.name === opt.name ).tarif;
              total += tarif * opt.value;
            });
          }
        });
      }
    } else if (prefix === 'maquillage') {
      if (!!bookingObj.maquillage.prestationInvitesProches?.length) {
        bookingObj.maquillage.prestationInvitesProches.forEach(prestation => {
          if (prestation.checked) {
            prestation.options.forEach(opt => {
              const tarif = maquillageCriteres.prestationInvitesProches
              .prestations.find(p => p.name === prestation.name).options.find( o => o.name === opt.name ).tarif;
              total += tarif * opt.value;
            });
          }
        });
      }
    } else if (prefix === 'esthetique') {
      if (!!bookingObj?.esthetique[key]?.length) {
        bookingObj?.esthetique[key].forEach(prestation => {
          if (prestation.checked) {
            prestation.options.forEach(opt => {
              if (opt.checked) {
                const tarif = esthetiqueCriteres[key]
                .prestations.find(p => p.name === prestation.name).options.find( o => o.name === opt.name ).tarif;
                total += tarif * opt.value;
              }
            });
          }
        });
      }
    } else if (prefix === 'soins') {
      if (!!bookingObj?.soins[key]?.length) {
        bookingObj?.soins[key].forEach(prestation => {
          if (prestation.checked) {
            prestation.options.forEach(opt => {
              if (opt.checked) {
                const tarif = soinsCriteres[key]
                .prestations.find(p => p.name === prestation.name).options.find( o => o.name === opt.name ).tarif;
                total += tarif * opt.value;
              }
            });
          }
        });
      }
    }

    return total;
  }
  calculatePrice(
    bookingObj: coiffureMaquillageEsthetiqueSoinsBookingInterface,
    coiffureCriteres: CoiffureCriteres,
    maquillageCriteres: MaquillageCriteres,
    esthetiqueCriteres: EsthetiqueCriteres,
    soinsCriteres: SoinCriteres,
    numberOfGuests: number,
    bookingDate: {startDate: Date, endDate: Date},
    settings: Setting[],
    categories: string[],
    weekendVariation: {value: boolean, percentage: number},
    ): number {
        let total = 0;
        // coiffure
        if (bookingObj.coiffure?.selected) {
          // nombre coiffures
          total = bookingObj.coiffure?.coiffureNombre ?
          total += bookingObj.coiffure.coiffureNombre * coiffureCriteres.tarif_horaire : total;

          // conseils personalisés
          total = bookingObj.coiffure?.conseilsPersonnalises ?
          total += bookingObj.coiffure.conseilsPersonnalisesDuree * coiffureCriteres.conseilsPersonnalisesTarif : total;

          // essai
          total = bookingObj.coiffure?.essais ?
          total += bookingObj.coiffure.essaisNombre * coiffureCriteres.essaisTarif : total;

          // majorations
          total = this.calculatePriceTypeMajoration(total, bookingObj, 'coiffure', coiffureCriteres, maquillageCriteres);

          // produits accessoires
          total = this.calculatePriceProduitsAccessoire(total, bookingObj, 'coiffure', coiffureCriteres, maquillageCriteres);

          // prestation invités
          // tslint:disable-next-line:max-line-length
          total = this.calculatePricePrestationInvites(total, bookingObj, 'coiffure', coiffureCriteres, maquillageCriteres, esthetiqueCriteres, soinsCriteres);

        }
        // maquillage
        if (bookingObj.maquillage?.selected) {
          // nombre coiffures
          total = bookingObj.maquillage?.maquillageNombre ?
          total += bookingObj.maquillage.maquillageNombre * maquillageCriteres.tarif_horaire : total;

          // conseils personalisés
          total = bookingObj.maquillage?.conseilsPersonnalises ?
          total += bookingObj.maquillage.conseilsPersonnalisesDuree * coiffureCriteres.conseilsPersonnalisesTarif : total;

          // essai
          total = bookingObj.maquillage?.essais ?
          total += bookingObj.maquillage.essaisNombre * maquillageCriteres.essaisTarif : total;

          // majorations
          total = this.calculatePriceTypeMajoration(total, bookingObj, 'maquillage', coiffureCriteres, maquillageCriteres);

          // produits accessoires
          total = this.calculatePriceProduitsAccessoire(total, bookingObj, 'maquillage', coiffureCriteres, maquillageCriteres);

          // prestation invités
          // tslint:disable-next-line:max-line-length
          total = this.calculatePricePrestationInvites(total, bookingObj, 'maquillage', coiffureCriteres, maquillageCriteres, esthetiqueCriteres, soinsCriteres);
        }
        // esthetique
        if (bookingObj.esthetique?.selected) {
          total += esthetiqueCriteres.tarif_horaire;
          // conseils personalisés
          total = bookingObj.esthetique?.conseilsPersonnalises ?
          total += bookingObj.esthetique.conseilsPersonnalisesDuree * esthetiqueCriteres.conseilsPersonnalisesTarif : total;

          // essai
          total = bookingObj.esthetique?.essais ?
          total += bookingObj.esthetique.essaisNombre * esthetiqueCriteres.essaisTarif : total;

          // manucure et pedicure
          // tslint:disable-next-line:max-line-length
          total = this.calculatePricePrestationInvites(total, bookingObj, 'esthetique', coiffureCriteres, maquillageCriteres, esthetiqueCriteres, soinsCriteres, 'manucureEtpedicure');

          // épilation
          // tslint:disable-next-line:max-line-length
          total = this.calculatePricePrestationInvites(total, bookingObj, 'esthetique', coiffureCriteres, maquillageCriteres, esthetiqueCriteres, soinsCriteres, 'epilation');

        }
        // soins
        if (bookingObj.soins?.selected) {
          total += soinsCriteres.tarif_horaire;
          // conseils personalisés
          total = bookingObj.soins?.conseilsPersonnalises ?
          total += bookingObj.soins.conseilsPersonnalisesDuree * soinsCriteres.conseilsPersonnalisesTarif : total;

          // essai
          total = bookingObj.soins?.essais ?
          total += bookingObj.soins.essaisNombre * soinsCriteres.essaisTarif : total;

          // soins
          // tslint:disable-next-line:max-line-length
          total = this.calculatePricePrestationInvites(total, bookingObj, 'soins', coiffureCriteres, maquillageCriteres, esthetiqueCriteres, soinsCriteres, 'soins');

          // massage
          // tslint:disable-next-line:max-line-length
          total = this.calculatePricePrestationInvites(total, bookingObj, 'soins', coiffureCriteres, maquillageCriteres, esthetiqueCriteres, soinsCriteres, 'massage');
        }
        // option divers
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
        total = this.bookingService.applyMajorationToTotal(total, bookingDate, settings, categories, weekendVariation);
        return total;
  }
  setInitialPrice(
        bookingObj: coiffureMaquillageEsthetiqueSoinsBookingInterface,
        coiffureCriteres: CoiffureCriteres,
        maquillageCriteres: MaquillageCriteres,
        esthetiqueCriteres: EsthetiqueCriteres,
        soinsCriteres: SoinCriteres,
        ): number {
		let total = 0;
		total = bookingObj.coiffure?.selected ?
		total += bookingObj.coiffure.coiffureNombre * coiffureCriteres.tarif_horaire : total;

		total = bookingObj.maquillage?.selected ?
		total += bookingObj.maquillage.maquillageNombre * maquillageCriteres.tarif_horaire : total;

    total = bookingObj.esthetique?.selected ? total += esthetiqueCriteres.tarif_horaire : total;

		total = bookingObj.soins?.selected ? total += soinsCriteres.tarif_horaire : total;

		return total;
  }
}
