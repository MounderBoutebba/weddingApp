import { FeeType } from 'projects/mariage/src/app/modules/user/models/option.model';

export interface PhotographeVideasteBookingInterface {
	photographe: {
		selected: boolean,

		dureeMissionPhoto?: number;

		duoPhoto?: boolean;

		photomaton?: boolean;

		photocall?: boolean;

		livraisonHauteResolutionPhoto?: boolean;

		galeriePrive?: boolean;

		dureeMissionSeanceEngagement?: number;
		seanceEngagementIsChecked?: boolean;

		dureeMissionSeanceBrunchOuDejeuner?: number;
		seanceBrunchOuDejeunerIsChecked?: boolean;

		dureeMissionSeanceApresMariage?: number;
		seanceApresMariageIsChecked?: boolean;

		donneesDvdExamplairesPhoto?: number;
		donneesDvdExamplairesPhotoIsChecked?: boolean;

		donneesUsbExamplairesPhoto?: number;
		donneesUsbExamplairesPhotoIsChecked?: boolean;

		tiragePapierFinitionMate?: boolean;
		tiragePapierFinitionBrillante?: boolean;
		tiragePapier?: { name: string; checked: boolean; examplaire: number }[];

		creationAlbumFinitionMate?: boolean;
		creationAlbumFinitionBrillante?: boolean;
		creationAlbum?: { name: string; checked: boolean; modeles: Modele[] }[];

		retouchesPhotoExamplaires?: number;
		retouchesPhoto?: boolean;

		livraisonExpressPhoto?: boolean;
	};
	videaliste: {
		selected: boolean,

		dureeMissionVideo?: number;

		duoVideo?: boolean;

		bandeAnnonce?: boolean;

		filmCourt?: boolean;

		filmLong?: boolean;

		courtMetrage?: boolean;

		videoAerienne?: boolean;

		etalonnageVideo?: boolean;

		livraisonOriginauxHauteResolutionVideo?: boolean;

		livraisonExpressVideo?: boolean;

		donneesDvdExamplairesVideo?: number;
		donneesDvdExamplairesVideoIsChecked?: boolean;

		donneesUsbExamplairesVideo?: number;
		donneesUsbExamplairesVideoIsChecked?: boolean;
	};
	optionDivers: Option[],
}
interface Option {
	name: string,
	id: string,
	description: string,
	optionRate: number,
	examplaire?: number,
	feeType: FeeType,
	checked: boolean,
	categories: string[],
}
interface Modele {
	name: string;
	checked: boolean;
	examplaire?: number;
}
export const bookingObj: PhotographeVideasteBookingInterface = {
	photographe: {selected: false},
	videaliste: {selected: false},
	optionDivers: [],
};
