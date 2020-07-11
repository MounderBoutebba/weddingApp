import { Souvernirs, SouvernirsCriteres } from './souvernirs.model';

export class Videaliste implements Souvernirs {
	criteres: VidealisteCriteres = {
	styleDeVideo: [],
	appareilsVideo: [],
	objectifsVideo: [],
	accessoiresVideo: [],

	tarif_horaire: 80,
	dureeDeReservationMinimum: 1,

	duoVideo: false,
	duoVideoTarif: 1,

	delaisDeLivraisonJours: 20,

	livraisonExpress: false,
	livraisonExpressTarif: 1,

	bandeAnnonce: false,
	bandeAnnonceTarif: 1,

	filmCourt: false,
	filmCourtTarif: 1,

	filmLong: false,
	filmLongTarif: 1,

	courtMetrage: false,
	courtMetrageTarif: 1,

	videoAerienne: false,
	videoAerienneTarif: 1,

	etalonnageVideo: false,
	etalonnageVideoTarif: 1,

	remise: false,
	remiseFormats: [
		{name: 'DVD', tarifUnitaire: 1},
		{name: 'Clé_USB', tarifUnitaire: 1},
	],

	livraisonOriginauxHauteResolution: false,
	livraisonOriginauxHauteResolutionTarif: 1,
	};
	label = 'videaliste';
	userid = '';
	location = { address: '', lat: 0, lng: 0 };

}

export interface VidealisteCriteres extends SouvernirsCriteres {
	styleDeVideo: string[];
	appareilsVideo: string[];
	objectifsVideo: string[];
	accessoiresVideo: string[];

	tarif_horaire: number;
	dureeDeReservationMinimum: number;

	duoVideo: boolean;
	duoVideoTarif: number;

	delaisDeLivraisonJours: number;

	livraisonExpress: boolean;
	livraisonExpressTarif: number;

	bandeAnnonce: boolean;
	bandeAnnonceTarif: number;

	filmCourt: boolean;
	filmCourtTarif: number;

	filmLong: boolean;
	filmLongTarif: number;

	courtMetrage: boolean;
	courtMetrageTarif: number;

	videoAerienne: boolean;
	videoAerienneTarif: number;

	etalonnageVideo: boolean;
	etalonnageVideoTarif: number;

	remise: boolean;
	remiseFormats: Array<{ name: string; tarifUnitaire: number }>;

	livraisonOriginauxHauteResolution: boolean;
	livraisonOriginauxHauteResolutionTarif: number;
}
