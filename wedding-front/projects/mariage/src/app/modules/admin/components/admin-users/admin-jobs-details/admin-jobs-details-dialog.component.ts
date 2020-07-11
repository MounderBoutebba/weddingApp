import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryLabelEnum } from '../../../../user/components/company/company-details/category-label.enum';
import { AnimateurAdultsService } from '../../../../user/components/company/company-details/animateur-adults/animateur-adults.service';
import { VoyageNocesService } from '../../../../user/components/company/company-details/voyage-noces/voyage-noces.service';
import { VoitureService } from '../../../../user/components/company/company-details/voiture/voiture.service';
import { VideasteService } from '../../../../user/components/company/company-details/videaste/videaste.service';
import { TraiteurService } from '../../../../user/components/company/company-details/traiteur/traiteur.service';
import { SoinService } from '../../../../user/components/company/company-details/soin/soin.service';
import { PhotographeService } from '../../../../user/components/company/company-details/photographe/photographe.service';
import { OfficiantService } from '../../../../user/components/company/company-details/officiant/officiant.service';
import { MusicienService } from '../../../../user/components/company/company-details/musicien/musicien.service';
import { MaquillageService } from '../../../../user/components/company/company-details/maquillage/maquillage.service';
import { LieuService } from '../../../../user/components/company/company-details/lieu/lieu.service';
import { LachersService } from '../../../../user/components/company/company-details/lachers/lachers.service';
import { HebergementService } from '../../../../user/components/company/company-details/hebergement/hebergement.service';
import { GroupeService } from '../../../../user/components/company/company-details/groupe/groupe.service';
import { GateauMariageService } from '../../../../user/components/company/company-details/gateau-mariage/gateau-mariage.service';
import { FleuristeService } from '../../../../user/components/company/company-details/fleuriste/fleuriste.service';
import { FeuArtificesService } from '../../../../user/components/company/company-details/feu-artifices/feu-artifices.service';
import { FairePartService } from '../../../../user/components/company/company-details/faire-part/faire-part.service';
import { EsthetiqueService } from '../../../../user/components/company/company-details/esthetique/esthitique.service';
import { DjService } from '../../../../user/components/company/company-details/dj/dj.service';
import { DecorateurService } from '../../../../user/components/company/company-details/decorateur/decorateur.service';
import { CoiffureService } from '../../../../user/components/company/company-details/coiffure/coiffure.service';
import { CoachService } from '../../../../user/components/company/company-details/coach/coach.service';
import { ChoregrapheService } from '../../../../user/components/company/company-details/choregraphe/choregraphe.service';
import { BusService } from '../../../../user/components/company/company-details/bus/bus.service';
import { AnimateurEnfantsService } from '../../../../user/components/company/company-details/animateur-enfants/animateur-enfants.service';
import { AnimateurAdultsPricingService } from '../../../../user/components/company/company-pricing/animateur-adults-pricing/animateur-adults-pricing.service';
import { AnimateurEnfantsPricingService } from '../../../../user/components/company/company-pricing/animateur-enfants-pricing/animateur-enfants-pricing.service';
import { BusPricingService } from '../../../../user/components/company/company-pricing/bus-pricing/bus-pricing.service';
import { ChoregraphePricingService } from '../../../../user/components/company/company-pricing/choregraphe-pricing/choregraphe-pricing.service';
import { CoachPricingService } from '../../../../user/components/company/company-pricing/coach-pricing/coach-pricing.service';
import { CoiffurePricingService } from '../../../../user/components/company/company-pricing/coiffure-pricing/coiffure-pricing.service';
import { DecorateurPricingService } from '../../../../user/components/company/company-pricing/decorateur-pricing/decorateur-pricing.service';
import { DjPricingService } from '../../../../user/components/company/company-pricing/dj-pricing/dj-pricing.service';
import { EsthetiquePricingService } from '../../../../user/components/company/company-pricing/esthetique-pricing/esthetique-pricing.service';
import { FairePartPricingService } from '../../../../user/components/company/company-pricing/faire-part-pricing/faire-part-pricing.service';
import { FeuArtificesPricingService } from '../../../../user/components/company/company-pricing/feu-artifices-pricing/feu-artifices-pricing.service';
import { FleuristePricingService } from '../../../../user/components/company/company-pricing/fleuriste-pricing/fleuriste-pricing.service';
import { GateauMariagePricingService } from '../../../../user/components/company/company-pricing/gateau-mariage-pricing/gateau-mariage-pricing.service';
import { GroupePricingService } from '../../../../user/components/company/company-pricing/groupe-pricing/groupe-pricing.service';
import { HebergementPricingService } from '../../../../user/components/company/company-pricing/hebergement-pricing/hebergement-pricing.service';
import { LachersPricingService } from '../../../../user/components/company/company-pricing/lachers-pricing/lachers-pricing.service';
import { LieuPricingService } from '../../../../user/components/company/company-pricing/lieu-pricing/lieu-pricing.service';
import { MaquillagePricingService } from '../../../../user/components/company/company-pricing/maquillage-pricing/maquillage-pricing.service';
import { MusicienPricingService } from '../../../../user/components/company/company-pricing/musicien-pricing/musicien-pricing.service';
import { OfficiantPricingService } from '../../../../user/components/company/company-pricing/officiant-pricing/officiant-pricing.service';
import { PhotographePricingService } from '../../../../user/components/company/company-pricing/photographe-pricing/photographe-pricing.service';
import { SoinPricingService } from '../../../../user/components/company/company-pricing/soin-pricing/soin-pricing.service';
import { TraiteurPricingService } from '../../../../user/components/company/company-pricing/traiteur-pricing/traiteur-pricing.service';
import { VideastePricingService } from '../../../../user/components/company/company-pricing/videaste-pricing/videaste-pricing.service';
import { VoiturePricingService } from '../../../../user/components/company/company-pricing/voiture-pricing/voiture-pricing.service';
import { VoyageNocesPricingService } from '../../../../user/components/company/company-pricing/voyage-noces-pricing/voyage-noces-pricing.service';
import { CompanyService } from '../../../../user/services/company.service';

@Component({
	selector: 'app-admin-jobs-details-dialog',
	templateUrl: './admin-jobs-details-dialog.component.html',
	styleUrls: ['./admin-jobs-details-dialog.component.scss']
})
export class AdminJobsDetailsDialogComponent implements OnInit {
	typesOfJobs: string[];
	display = false;

	constructor(
		public dialogRef: MatDialogRef<AdminJobsDetailsDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private companyService: CompanyService,
		private animateurAdultsService: AnimateurAdultsService,
		private animateurAdultsPricingService: AnimateurAdultsPricingService,
		private animateurEnfantsService: AnimateurEnfantsService,
		private animateurEnfantsPricingService: AnimateurEnfantsPricingService,
		private busService: BusService,
		private busPricingService: BusPricingService,
		private choregrapheService: ChoregrapheService,
		private choregraphePricingService: ChoregraphePricingService,
		private coachService: CoachService,
		private coachPricingService: CoachPricingService,
		private coiffureService: CoiffureService,
		private coiffurePricingService: CoiffurePricingService,
		private decorateurService: DecorateurService,
		private decorateurPricingService: DecorateurPricingService,
		private djService: DjService,
		private djPricingService: DjPricingService,
		private esthetiqueService: EsthetiqueService,
		private esthetiquePricingService: EsthetiquePricingService,
		private fairePartService: FairePartService,
		private fairePartPricingService: FairePartPricingService,
		private feuArtificesService: FeuArtificesService,
		private feuArtificesPricingService: FeuArtificesPricingService,
		private fleuristeService: FleuristeService,
		private fleuristePricingService: FleuristePricingService,
		private gateauMariageService: GateauMariageService,
		private gateauMariagePricingService: GateauMariagePricingService,
		private groupeService: GroupeService,
		private groupePricingService: GroupePricingService,
		private hebergementService: HebergementService,
		private hebergementPricingService: HebergementPricingService,
		private lachersService: LachersService,
		private lachersPricingService: LachersPricingService,
		private lieuService: LieuService,
		private lieuPricingService: LieuPricingService,
		private maquillageService: MaquillageService,
		private maquillagePricingService: MaquillagePricingService,
		private musicienService: MusicienService,
		private musicienPricingService: MusicienPricingService,
		private officiantService: OfficiantService,
		private officiantPricingService: OfficiantPricingService,
		private photographeService: PhotographeService,
		private photographePricingService: PhotographePricingService,
		private soinService: SoinService,
		private soinPricingService: SoinPricingService,
		private traiteurService: TraiteurService,
		private traiteurPricingService: TraiteurPricingService,
		private videasteService: VideasteService,
		private videastePricingService: VideastePricingService,
		private voitureService: VoitureService,
		private voiturePricingService: VoiturePricingService,
		private voyageNocesService: VoyageNocesService,
		private voyageNocesPricingService: VoyageNocesPricingService
	) {}

	ngOnInit() {
		this.data && this.data.company && this.data.company.categories
			? (this.typesOfJobs = this.data.company.categories)
			: (this.typesOfJobs = []);
		this.display = true;
	}

	onResetJobs(event: Event, selectedCategories) {
		for (const jobCategory of selectedCategories) {
			this.callCategoryService(jobCategory.value);
		}
	}

	onDeleteJobs(event: Event) {
		console.log(event);
		event.preventDefault();
		const formData = new FormData();
		this.data.company.categories = [''];
		Object.entries(this.data.company).forEach(([key, value]) => {
			if (Array.isArray(value)) {
				value.forEach(data => {
					formData.append(key, data);
				});
			} else if (key === 'questions') {
				formData.append(key, JSON.stringify(value));
			} else if (key === 'location') {
				formData.append(key, JSON.stringify(value));
			} else {
				formData.append(key, value as string);
			}
		});
		this.companyService.deleteCompanyJobs(this.data.company.id, this.data.providerEmail).subscribe(res2 => {
			this.refrechListData();
		});

		/*  this.companyService.putCompany(this.data.company.id, this.data.providerEmail, formData).subscribe(res => {
			this.companyService.deleteCompanyJobs(this.data.company.id, this.data.providerEmail).subscribe(res2 => {
				console.log(res2);
				this.refrechListData();
			});
		});*/
	}

	refrechListData() {
		this.companyService.findCompanyByEmail(this.data.providerEmail).subscribe(res => {
			this.typesOfJobs = res.categories;
		});
	}

	callCategoryService(category: string) {
		switch (category) {
			case CategoryLabelEnum.PHOTOGRAPHE:
				this.photographeService.resetCriteria(this.data.providerEmail).subscribe(res1 => {
					this.photographePricingService.resetCriteria(this.data.providerEmail).subscribe(res2 => {
						this.refrechListData();
					});
				});
				break;
			case CategoryLabelEnum.VIDEALISTE:
				this.videasteService.resetCriteria(this.data.providerEmail).subscribe(res1 => {
					this.videastePricingService.resetCriteria(this.data.providerEmail).subscribe(res2 => {
						this.refrechListData();
					});
				});
				break;
			case CategoryLabelEnum.DECORATUER:
				this.decorateurService.resetCriteria(this.data.providerEmail).subscribe(res1 => {
					this.decorateurPricingService.resetCriteria(this.data.providerEmail).subscribe(res2 => {
						this.refrechListData();
					});
				});
				break;
			case CategoryLabelEnum.FLEURISTE:
				this.fleuristeService.resetCriteria(this.data.providerEmail).subscribe(res1 => {
					this.fleuristePricingService.resetCriteria(this.data.providerEmail).subscribe(res2 => {
						this.refrechListData();
					});
				});
				break;
			case CategoryLabelEnum.VOITURE:
				this.voitureService.resetCriteria(this.data.providerEmail).subscribe(res1 => {
					this.voiturePricingService.resetCriteria(this.data.providerEmail).subscribe(res2 => {
						this.refrechListData();
					});
				});
				break;
			case CategoryLabelEnum.BUS:
				this.busService.resetCriteria(this.data.providerEmail).subscribe(res1 => {
					this.busPricingService.resetCriteria(this.data.providerEmail).subscribe(res2 => {
						this.refrechListData();
					});
				});
				break;
			case CategoryLabelEnum.LIEU:
				this.lieuService.resetCriteria(this.data.providerEmail).subscribe(res1 => {
					this.lieuPricingService.resetCriteria(this.data.providerEmail).subscribe(res2 => {
						this.refrechListData();
					});
				});
				break;
			case CategoryLabelEnum.TRAITEUR:
				this.traiteurService.resetCriteria(this.data.providerEmail).subscribe(res1 => {
					this.traiteurPricingService.resetCriteria(this.data.providerEmail).subscribe(res2 => {
						this.refrechListData();
					});
				});
				break;
			case CategoryLabelEnum.GATEAU_MARIAGE:
				this.gateauMariageService.resetCriteria(this.data.providerEmail).subscribe(res1 => {
					this.gateauMariagePricingService.resetCriteria(this.data.providerEmail).subscribe(res2 => {
						this.refrechListData();
					});
				});
				break;
			case CategoryLabelEnum.DJ:
				this.djService.resetCriteria(this.data.providerEmail).subscribe(res1 => {
					this.djPricingService.resetCriteria(this.data.providerEmail).subscribe(res2 => {
						this.refrechListData();
					});
				});
				break;
			case CategoryLabelEnum.GROUPE:
				this.groupeService.resetCriteria(this.data.providerEmail).subscribe(res1 => {
					this.groupePricingService.resetCriteria(this.data.providerEmail).subscribe(res2 => {
						this.refrechListData();
					});
				});
				break;
			case CategoryLabelEnum.MUSICIEN:
				this.musicienService.resetCriteria(this.data.providerEmail).subscribe(res1 => {
					this.musicienPricingService.resetCriteria(this.data.providerEmail).subscribe(res2 => {
						this.refrechListData();
					});
				});
				break;
			case CategoryLabelEnum.ANIMATEUR_ADULTS:
				this.animateurAdultsService.resetCriteria(this.data.providerEmail).subscribe(res1 => {
					this.animateurAdultsPricingService.resetCriteria(this.data.providerEmail).subscribe(res2 => {
						this.refrechListData();
					});
				});
				break;
			case CategoryLabelEnum.ANIMATEUR_ENFANTS:
				this.animateurEnfantsService.resetCriteria(this.data.providerEmail).subscribe(res1 => {
					this.animateurEnfantsPricingService.resetCriteria(this.data.providerEmail).subscribe(res2 => {
						this.refrechListData();
					});
				});
				break;
			case CategoryLabelEnum.FEU_ARTIFICES:
				this.feuArtificesService.resetCriteria(this.data.providerEmail).subscribe(res1 => {
					this.feuArtificesPricingService.resetCriteria(this.data.providerEmail).subscribe(res2 => {
						this.refrechListData();
					});
				});
				break;
			case CategoryLabelEnum.LACHERS:
				this.lachersService.resetCriteria(this.data.providerEmail).subscribe(res1 => {
					this.lachersPricingService.resetCriteria(this.data.providerEmail).subscribe(res2 => {
						this.refrechListData();
					});
				});
				break;
			case CategoryLabelEnum.COACH:
				this.coachService.resetCriteria(this.data.providerEmail).subscribe(res1 => {
					this.coachPricingService.resetCriteria(this.data.providerEmail).subscribe(res2 => {
						this.refrechListData();
					});
				});
				break;
			case CategoryLabelEnum.CHOREGRAPHE:
				this.choregrapheService.resetCriteria(this.data.providerEmail).subscribe(res1 => {
					this.choregraphePricingService.resetCriteria(this.data.providerEmail).subscribe(res2 => {
						this.refrechListData();
					});
				});
				break;
			case CategoryLabelEnum.OFFICIANT:
				this.officiantService.resetCriteria(this.data.providerEmail).subscribe(res1 => {
					this.officiantPricingService.resetCriteria(this.data.providerEmail).subscribe(res2 => {
						this.refrechListData();
					});
				});
				break;
			case CategoryLabelEnum.COIFFURE:
				this.coiffureService.resetCriteria(this.data.providerEmail).subscribe(res1 => {
					this.coiffurePricingService.resetCriteria(this.data.providerEmail).subscribe(res2 => {
						this.refrechListData();
					});
				});
				break;
			case CategoryLabelEnum.MAQUILLAGE:
				this.maquillageService.resetCriteria(this.data.providerEmail).subscribe(res1 => {
					this.maquillagePricingService.resetCriteria(this.data.providerEmail).subscribe(res2 => {
						this.refrechListData();
					});
				});
				break;
			case CategoryLabelEnum.ESTHETIQUE:
				this.esthetiqueService.resetCriteria(this.data.providerEmail).subscribe(res1 => {
					this.esthetiquePricingService.resetCriteria(this.data.providerEmail).subscribe(res2 => {
						this.refrechListData();
					});
				});
				break;
			case CategoryLabelEnum.SOIN:
				this.soinService.resetCriteria(this.data.providerEmail).subscribe(res1 => {
					this.soinPricingService.resetCriteria(this.data.providerEmail).subscribe(res2 => {
						this.refrechListData();
					});
				});
				break;
			case CategoryLabelEnum.HEBERGEMENT:
				this.hebergementService.resetCriteria(this.data.providerEmail).subscribe(res1 => {
					this.hebergementPricingService.resetCriteria(this.data.providerEmail).subscribe(res2 => {
						this.refrechListData();
					});
				});
				break;
			case CategoryLabelEnum.FAIRE_PART:
				this.fairePartService.resetCriteria(this.data.providerEmail).subscribe(res1 => {
					this.fairePartPricingService.resetCriteria(this.data.providerEmail).subscribe(res2 => {
						this.refrechListData();
					});
				});
				break;
			case CategoryLabelEnum.VOYAGE_DE_NOCES:
				this.voyageNocesService.resetCriteria(this.data.providerEmail).subscribe(res1 => {
					this.voyageNocesPricingService.resetCriteria(this.data.providerEmail).subscribe(res2 => {
						this.refrechListData();
					});
				});
				break;
			default:
				break;
		}
	}
}
