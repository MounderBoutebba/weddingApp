import { Injectable } from '@angular/core';
import { PhotographeVideasteBookingInterface } from '../../components/pro-showcase/categories/photographe-videaste-description/photographe-videaste.booking.interface';
import { PhotographeCriteres } from '../../../user/components/company/company-details/photographe/photographe.interface';
import { VideasteCriteresInterface } from '../../../user/components/company/company-details/videaste/videaste.interface';
import { FeeType } from '../../../user/models/option.model';
import { Setting } from '../../../user/models/setting.model';
import { BookingService } from '../booking.service';

@Injectable({ providedIn: 'root' })
export class PhotographeVideasteBookingService {
  constructor(private readonly bookingService: BookingService) {}
  // tslint:disable-next-line:max-line-length
  priceForDonneDvdPhoto(bookingObj: PhotographeVideasteBookingInterface, critereObj: PhotographeCriteres, critereObjVideo: VideasteCriteresInterface, numberOfGuests: number): number {
    let total = 0;
    if (bookingObj.photographe?.donneesDvdExamplairesPhotoIsChecked) {
      const index = critereObj.remiseFormats.findIndex( element => element.name === 'DVD' );
      const tarifUnitaire = critereObj.remiseFormats[index].tarifUnitaire;
      total += bookingObj.photographe.donneesDvdExamplairesPhoto * tarifUnitaire;
  }
  return total;
  }
  // tslint:disable-next-line:max-line-length
  priceForDonneDvdVideo(bookingObj: PhotographeVideasteBookingInterface, critereObj: PhotographeCriteres, critereObjVideo: VideasteCriteresInterface, numberOfGuests: number): number {
    let total = 0;
    if (bookingObj.videaliste?.donneesDvdExamplairesVideoIsChecked) {
      const index = critereObjVideo.remiseFormats.findIndex( element => element.name === 'DVD' );
      const tarifUnitaire = critereObjVideo.remiseFormats[index].tarifUnitaire;
      total += bookingObj.videaliste.donneesDvdExamplairesVideo * tarifUnitaire;
  }
  return total;
  }
  // tslint:disable-next-line:max-line-length
  priceForDonneUsbVideo(bookingObj: PhotographeVideasteBookingInterface, critereObj: PhotographeCriteres, critereObjVideo: VideasteCriteresInterface, numberOfGuests: number): number {
    let total = 0;
    if (bookingObj.videaliste?.donneesUsbExamplairesVideoIsChecked) {
      const index = critereObjVideo.remiseFormats.findIndex( element => element.name === 'Clé_USB' );
      const tarifUnitaire = critereObjVideo.remiseFormats[index].tarifUnitaire;
      total += bookingObj.videaliste.donneesUsbExamplairesVideo * tarifUnitaire;
    }
  return total;
  }
  // tslint:disable-next-line:max-line-length
  priceForDonneUsbPhoto(bookingObj: PhotographeVideasteBookingInterface, critereObj: PhotographeCriteres, critereObjVideo: VideasteCriteresInterface, numberOfGuests: number): number {
    let total = 0;
    if (bookingObj.photographe?.donneesUsbExamplairesPhotoIsChecked) {
      const index = critereObj.remiseFormats.findIndex( element => element.name === 'Clé_USB' );
      const tarifUnitaire = critereObj.remiseFormats[index].tarifUnitaire;
      total += bookingObj.photographe.donneesUsbExamplairesPhoto * tarifUnitaire;
  }
  return total;
  }
  priceForOptionDivers(bookingObj: PhotographeVideasteBookingInterface, numberOfGuests: number): number {
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
  // TODO creation album
  // tslint:disable-next-line:max-line-length
  priceForCreationAlbum(bookingObj: PhotographeVideasteBookingInterface, critereObj: PhotographeCriteres, critereObjVideo: VideasteCriteresInterface, numberOfGuests: number): number {
	let total = 0;
	if (!!bookingObj.photographe?.creationAlbum) {
		bookingObj.photographe?.creationAlbum.forEach(format => {
			if (format.checked) {
				format.modeles.forEach(element => {
					if (element.checked) {
						const formatCriteres = critereObj.creationAlbum.formats
							.find(item => item.name === format.name)
							.modeles.find(modele => modele.name === element.name);

						total += formatCriteres.tarif * element.examplaire;
					}
				});
			}
		});
	}
  return total;
  }
  // tslint:disable-next-line:max-line-length
  priceForTiragePapier(bookingObj: PhotographeVideasteBookingInterface, critereObj: PhotographeCriteres, critereObjVideo: VideasteCriteresInterface, numberOfGuests: number): number {
	let total = 0;
	if (!!bookingObj?.photographe?.tiragePapier) {
		bookingObj.photographe?.tiragePapier.forEach(format => {
			if (format.checked) {
				const formatCriteres = critereObj.tiragePapier.formats.find(
					element => element.name === format.name
				);
				if (format.examplaire >= 1 && format.examplaire < 10) {
					total += formatCriteres.modeles[0].tarif * format.examplaire;
				} else if (format.examplaire >= 10 && format.examplaire < 20) {
					total += formatCriteres.modeles[1].tarif * format.examplaire;
				} else if (format.examplaire >= 20 && format.examplaire < 50) {
					total += formatCriteres.modeles[2].tarif * format.examplaire;
				} else if (format.examplaire >= 50 && format.examplaire < 100) {
					total += formatCriteres.modeles[3].tarif * format.examplaire;
				} else if (format.examplaire >= 100 && format.examplaire < 200) {
					total += formatCriteres.modeles[4].tarif * format.examplaire;
				} else if (format.examplaire >= 200 && format.examplaire < 500) {
					total += formatCriteres.modeles[5].tarif * format.examplaire;
				} else if (format.examplaire >= 500 && format.examplaire < 1000) {
					total += formatCriteres.modeles[6].tarif * format.examplaire;
				} else if (format.examplaire >= 1000) {
					total += formatCriteres.modeles[7].tarif * format.examplaire;
				}
			}
		});
	}
  return total;
  }
  // tirage papiers
  // tslint:disable-next-line:max-line-length
	  priceForRetouches(bookingObj: PhotographeVideasteBookingInterface, critereObj: PhotographeCriteres, critereObjVideo: VideasteCriteresInterface, numberOfGuests: number): number {
		let total = 0;
		if (bookingObj.photographe?.retouchesPhoto) {
		  if (bookingObj.photographe.retouchesPhotoExamplaires >=1 && bookingObj.photographe.retouchesPhotoExamplaires<10) {
			  total += critereObj.retouchesPhotoFormats[0].tarifUnitaire
					   * bookingObj.photographe.retouchesPhotoExamplaires;
		  } else if (bookingObj.photographe.retouchesPhotoExamplaires >=10 && bookingObj.photographe.retouchesPhotoExamplaires<20) {
			  total += critereObj.retouchesPhotoFormats[1].tarifUnitaire
					   * bookingObj.photographe.retouchesPhotoExamplaires;
		  } else if (bookingObj.photographe.retouchesPhotoExamplaires >=20 && bookingObj.photographe.retouchesPhotoExamplaires<50) {
			  total += critereObj.retouchesPhotoFormats[2].tarifUnitaire
					   * bookingObj.photographe.retouchesPhotoExamplaires;
		  } else if (bookingObj.photographe.retouchesPhotoExamplaires >=50 && bookingObj.photographe.retouchesPhotoExamplaires<100) {
			  total += critereObj.retouchesPhotoFormats[3].tarifUnitaire
					   * bookingObj.photographe.retouchesPhotoExamplaires;
		  } else if (bookingObj.photographe.retouchesPhotoExamplaires >=100 && bookingObj.photographe.retouchesPhotoExamplaires<200) {
			  total += critereObj.retouchesPhotoFormats[4].tarifUnitaire
					   * bookingObj.photographe.retouchesPhotoExamplaires;
		  } else if (bookingObj.photographe.retouchesPhotoExamplaires >=200 && bookingObj.photographe.retouchesPhotoExamplaires<500) {
			  total += critereObj.retouchesPhotoFormats[5].tarifUnitaire
					   * bookingObj.photographe.retouchesPhotoExamplaires;
		  } else if (bookingObj.photographe.retouchesPhotoExamplaires >=500 && bookingObj.photographe.retouchesPhotoExamplaires<1000) {
			  total += critereObj.retouchesPhotoFormats[6].tarifUnitaire
					   * bookingObj.photographe.retouchesPhotoExamplaires;
		  } else if (bookingObj.photographe.retouchesPhotoExamplaires >=1000) {
			  total += critereObj.retouchesPhotoFormats[7].tarifUnitaire
					   * bookingObj.photographe.retouchesPhotoExamplaires;
		  }
		}
	  return total;
	  }
	// tslint:disable-next-line:max-line-length
	calculatePrice(
		bookingObj: PhotographeVideasteBookingInterface,
		critereObj: PhotographeCriteres,
		critereObjVideo: VideasteCriteresInterface,
		numberOfGuests: number,
		bookingDate: {startDate: Date, endDate: Date},
		settings: Setting[],
		categories: string[],
		weekendVariation: {value: boolean, percentage: number},
	): number {
		console.log('bookingDate', bookingDate);

		let total = 0;
		if (bookingObj.photographe.selected) {
			total = bookingObj.photographe?.dureeMissionPhoto
			? (total += bookingObj.photographe.dureeMissionPhoto * critereObj.tarif_horaire)
			: total;

		total = bookingObj.photographe?.duoPhoto ? (total += critereObj.duoPhotoTarif) : total;

		total = bookingObj.photographe?.photomaton ? (total += critereObj.photomatonTarifUnique) : total;

		total = bookingObj.photographe?.photocall ? (total += critereObj.photocallTraifUnique) : total;

		total = bookingObj.photographe?.livraisonHauteResolutionPhoto
			? (total += critereObj.livraisonHauteResolutionTarif)
			: total;

		total = bookingObj.photographe?.galeriePrive ? (total += critereObj.galeriePriveTarif) : total;

		total = bookingObj.photographe?.seanceEngagementIsChecked
			? (total +=
					critereObj.seanceEngagementDureeMinimumTarifHoraire *
					bookingObj.photographe.dureeMissionSeanceEngagement)
			: total;

		total = bookingObj.photographe?.seanceBrunchOuDejeunerIsChecked
			? // tslint:disable-next-line:max-line-length
			  (total +=
					critereObj.seanceBrunchOuDejeunerDureeMinimumTarifHoraire *
					bookingObj.photographe.dureeMissionSeanceBrunchOuDejeuner)
			: total;

		total = bookingObj.photographe?.seanceApresMariageIsChecked
			? // tslint:disable-next-line:max-line-length
			  (total +=
					critereObj.seanceApresMariageDureeMinimumTarifHoraire *
					bookingObj.photographe.dureeMissionSeanceApresMariage)
			: total;

		if (bookingObj.photographe?.donneesDvdExamplairesPhotoIsChecked) {
			const index = critereObj.remiseFormats.findIndex(element => element.name === 'DVD');
			const tarifUnitaire = critereObj.remiseFormats[index].tarifUnitaire;
			total += bookingObj.photographe.donneesDvdExamplairesPhoto * tarifUnitaire;
		}
		if (bookingObj.photographe?.donneesUsbExamplairesPhotoIsChecked) {
			const index = critereObj.remiseFormats.findIndex(element => element.name === 'Clé_USB');
			const tarifUnitaire = critereObj.remiseFormats[index].tarifUnitaire;
			total += bookingObj.photographe.donneesUsbExamplairesPhoto * tarifUnitaire;
		}

		// TODO tiragePapier
		if (!!bookingObj?.photographe?.tiragePapier) {
			bookingObj.photographe?.tiragePapier.forEach(format => {
				if (format.checked) {
					const formatCriteres = critereObj.tiragePapier.formats.find(
						element => element.name === format.name
					);
					if (format.examplaire >= 1 && format.examplaire < 10) {
						total += formatCriteres.modeles[0].tarif * format.examplaire;
					} else if (format.examplaire >= 10 && format.examplaire < 20) {
						total += formatCriteres.modeles[1].tarif * format.examplaire;
					} else if (format.examplaire >= 20 && format.examplaire < 50) {
						total += formatCriteres.modeles[2].tarif * format.examplaire;
					} else if (format.examplaire >= 50 && format.examplaire < 100) {
						total += formatCriteres.modeles[3].tarif * format.examplaire;
					} else if (format.examplaire >= 100 && format.examplaire < 200) {
						total += formatCriteres.modeles[4].tarif * format.examplaire;
					} else if (format.examplaire >= 200 && format.examplaire < 500) {
						total += formatCriteres.modeles[5].tarif * format.examplaire;
					} else if (format.examplaire >= 500 && format.examplaire < 1000) {
						total += formatCriteres.modeles[6].tarif * format.examplaire;
					} else if (format.examplaire >= 1000) {
						total += formatCriteres.modeles[7].tarif * format.examplaire;
					}
				}
			});
		}

		// TODO creation album
		if (!!bookingObj.photographe?.creationAlbum) {
			bookingObj.photographe?.creationAlbum.forEach(format => {
				if (format.checked) {
					format.modeles.forEach(element => {
						if (element.checked) {
							const formatCriteres = critereObj.creationAlbum.formats
								.find(item => item.name === format.name)
								.modeles.find(modele => modele.name === element.name);

							total += formatCriteres.tarif * element.examplaire;
						}
					});
				}
			});
		}

		if (bookingObj.photographe?.retouchesPhoto) {
			if (
				bookingObj.photographe.retouchesPhotoExamplaires >= 1 &&
				bookingObj.photographe.retouchesPhotoExamplaires < 10
			) {
				total +=
					critereObj.retouchesPhotoFormats[0].tarifUnitaire *
					bookingObj.photographe.retouchesPhotoExamplaires;
			} else if (
				bookingObj.photographe.retouchesPhotoExamplaires >= 10 &&
				bookingObj.photographe.retouchesPhotoExamplaires < 20
			) {
				total +=
					critereObj.retouchesPhotoFormats[1].tarifUnitaire *
					bookingObj.photographe.retouchesPhotoExamplaires;
			} else if (
				bookingObj.photographe.retouchesPhotoExamplaires >= 20 &&
				bookingObj.photographe.retouchesPhotoExamplaires < 50
			) {
				total +=
					critereObj.retouchesPhotoFormats[2].tarifUnitaire *
					bookingObj.photographe.retouchesPhotoExamplaires;
			} else if (
				bookingObj.photographe.retouchesPhotoExamplaires >= 50 &&
				bookingObj.photographe.retouchesPhotoExamplaires < 100
			) {
				total +=
					critereObj.retouchesPhotoFormats[3].tarifUnitaire *
					bookingObj.photographe.retouchesPhotoExamplaires;
			} else if (
				bookingObj.photographe.retouchesPhotoExamplaires >= 100 &&
				bookingObj.photographe.retouchesPhotoExamplaires < 200
			) {
				total +=
					critereObj.retouchesPhotoFormats[4].tarifUnitaire *
					bookingObj.photographe.retouchesPhotoExamplaires;
			} else if (
				bookingObj.photographe.retouchesPhotoExamplaires >= 200 &&
				bookingObj.photographe.retouchesPhotoExamplaires < 500
			) {
				total +=
					critereObj.retouchesPhotoFormats[5].tarifUnitaire *
					bookingObj.photographe.retouchesPhotoExamplaires;
			} else if (
				bookingObj.photographe.retouchesPhotoExamplaires >= 500 &&
				bookingObj.photographe.retouchesPhotoExamplaires < 1000
			) {
				total +=
					critereObj.retouchesPhotoFormats[6].tarifUnitaire *
					bookingObj.photographe.retouchesPhotoExamplaires;
			} else if (bookingObj.photographe.retouchesPhotoExamplaires >= 1000) {
				total +=
					critereObj.retouchesPhotoFormats[7].tarifUnitaire *
					bookingObj.photographe.retouchesPhotoExamplaires;
			}
		}

		total = bookingObj.photographe?.livraisonExpressPhoto
			? (total += critereObj.livraisonHauteResolutionTarif)
			: total;
		}

		if (bookingObj.videaliste.selected) {
			total = bookingObj.videaliste?.dureeMissionVideo
			? (total += bookingObj.videaliste.dureeMissionVideo * critereObjVideo.tarif_horaire)
			: total;

		total = bookingObj.videaliste?.duoVideo ? (total += critereObjVideo.duoVideoTarif) : total;

		total = bookingObj.videaliste?.bandeAnnonce ? (total += critereObjVideo.bandeAnnonceTarif) : total;

		total = bookingObj.videaliste?.filmCourt ? (total += critereObjVideo.filmCourtTarif) : total;

		total = bookingObj.videaliste?.filmLong ? (total += critereObjVideo.filmLongTarif) : total;

		total = bookingObj.videaliste?.courtMetrage ? (total += critereObjVideo.courtMetrageTarif) : total;

		total = bookingObj.videaliste?.videoAerienne ? (total += critereObjVideo.videoAerienneTarif) : total;

		total = bookingObj.videaliste?.etalonnageVideo ? (total += critereObjVideo.etalonnageVideoTarif) : total;

		total = bookingObj.videaliste?.livraisonOriginauxHauteResolutionVideo
			? (total += critereObjVideo.livraisonOriginauxHauteResolutionTarif)
			: total;

		total = bookingObj.videaliste?.livraisonExpressVideo ? (total += critereObjVideo.livraisonExpressTarif) : total;

		if (bookingObj.videaliste?.donneesDvdExamplairesVideoIsChecked) {
			const index = critereObjVideo.remiseFormats.findIndex(element => element.name === 'DVD');
			const tarifUnitaire = critereObjVideo.remiseFormats[index].tarifUnitaire;
			total += bookingObj.videaliste.donneesDvdExamplairesVideo * tarifUnitaire;
		}

		if (bookingObj.videaliste?.donneesUsbExamplairesVideoIsChecked) {
			const index = critereObjVideo.remiseFormats.findIndex(element => element.name === 'Clé_USB');
			const tarifUnitaire = critereObjVideo.remiseFormats[index].tarifUnitaire;
			total += bookingObj.videaliste.donneesUsbExamplairesVideo * tarifUnitaire;
		}
		}

		//#region option divers
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
		//#endregion

		total = this.bookingService.applyMajorationToTotal(total, bookingDate, settings, categories, weekendVariation);
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
	// tslint:disable-next-line:max-line-length
	setInitialPrice(bookingObj: PhotographeVideasteBookingInterface, critereObj: PhotographeCriteres, critereObjVideo: VideasteCriteresInterface): number {
		let total = 0;
		total = bookingObj.photographe?.selected ?
		total += bookingObj.photographe.dureeMissionPhoto * critereObj.tarif_horaire : total;

		total = bookingObj.videaliste?.selected ?
		total += bookingObj.videaliste.dureeMissionVideo * critereObjVideo.tarif_horaire : total;

		return total;
	}
}
