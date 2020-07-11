import { Reception, ReceptionCriteres } from './reception.model';
import { FieldTypeEnum } from '../field-type.enum';

export class Lieu implements Reception {
	criteres: LieuCriteres = {
	tarif_horaire: 80,

	typeDeLieu: 'auberge',

	serviceTraiteur: false,
	lieuSansServiceTraiteur: true,

	serviceGateau: false,
	lieuSansServiceGateau: true,

	servicePhotographeVideaste: false,
	lieuSansServicePhotographeVideaste: true,

	serviceMusic: false,
	lieuSansServiceMusic: true,

	serviceDecoration: false,
	lieuSansServiceDecoration: true,

	capaciteInvites: 20,

	typeReception: [],

	utilisationDuLieu: 'interieur_et_exterieur',

	configurationDeLaReception: 'assis_et_debout',

	situationGeographique: 'sur_la_plage',

	adaptabiliteMobiliteReduite: true,

	tarifHoraireLocation: 1200,

	debutLocation: {
		type: FieldTypeEnum.TOGGLE_NUMBER_TIME,
		heures: 8,
		min: 0,
	},

	limiteHoraire: {
		type: FieldTypeEnum.TOGGLE_NUMBER_TIME,
		value: false,
		heures: 0,
		min: 0,
	},

	pisteDeDense: false,
	pisteDeDenseSurface: 20,

	salleDeReception: false,
	salleDeReceptionSurface: 0,

	chambrePourLesMariee: false,
	chambrePourLesMarieeSurface: 20,
	chambrePourLesMarieeInclusDansPrix: false,
	chambrePourLesMarieeTarif: 40,

	cuisinePourLeTraiteur: false,
	cuisinePourLeTraiteurSurface: 20,
	cuisinePourLeTraiteurInclusDansPrix: false,
	cuisinePourLeTraiteurTarif: 40,

	terrasse: false,
	terrasseSurface: 20,
	terrasseInclusDansPrix: false,
	terrasseTarif: 40,

	jardin: false,
	jardinSurface: 20,
	jardinInclusDansPrix: false,
	jardinTarif: 40,

	chapiteau: false,
	chapiteauSurface: 20,
	chapiteauInclusDansPrix: false,
	chapiteauTarif: 40,

	parking: false,
	parkingSurface: 20,
	parkingInclusDansPrix: false,
	parkingTarif: 40,

	hebergementInvites: false,
	hebergementInvitesCapacite: 30,
	hebergementInvitesTarif: 30,

	decoration: false,
	decorationTarif: 0,

	laviselleEtCouvert: false,
	laviselleEtCouvertTarif: 0,

	drapeDeTable: false,
	drapeDeTableTarif: 30,
	};
	label = 'lieu';
	userid = '';
	location = { address: '', lat: 0, lng: 0 };

}

export interface LieuCriteres extends ReceptionCriteres {
	tarif_horaire: number;

	typeDeLieu: string;

	serviceTraiteur: boolean;
	lieuSansServiceTraiteur: boolean;

	serviceGateau: boolean;
	lieuSansServiceGateau: boolean;

	servicePhotographeVideaste: boolean;
	lieuSansServicePhotographeVideaste: boolean;

	serviceMusic: boolean;
	lieuSansServiceMusic: boolean;

	serviceDecoration: boolean;
	lieuSansServiceDecoration: boolean;

	capaciteInvites: number;

	typeReception: string[];

	utilisationDuLieu: string;

	configurationDeLaReception: string;

	situationGeographique: string;

	adaptabiliteMobiliteReduite: boolean;

	tarifHoraireLocation: number;

	debutLocation: {
		type: string,
		heures: number,
		min: number,
	};
	limiteHoraire: {
		type: string,
		heures: number,
		min: number,
		value: boolean,
	};

	pisteDeDense: boolean;
	pisteDeDenseSurface: number;

	salleDeReception: boolean;
	salleDeReceptionSurface: number;

	chambrePourLesMariee: boolean;
	chambrePourLesMarieeSurface: number;
	chambrePourLesMarieeInclusDansPrix: boolean;
	chambrePourLesMarieeTarif: number;

	cuisinePourLeTraiteur: boolean;
	cuisinePourLeTraiteurSurface: number;
	cuisinePourLeTraiteurInclusDansPrix: boolean;
	cuisinePourLeTraiteurTarif: number;

	terrasse: boolean;
	terrasseSurface: number;
	terrasseInclusDansPrix: boolean;
	terrasseTarif: number;

	jardin: boolean;
	jardinSurface: number;
	jardinInclusDansPrix: boolean;
	jardinTarif: number;

	chapiteau: boolean;
	chapiteauSurface: number;
	chapiteauInclusDansPrix: boolean;
	chapiteauTarif: number;

	parking: boolean;
	parkingSurface: number;
	parkingInclusDansPrix: boolean;
	parkingTarif: number;

	hebergementInvites: boolean;
	hebergementInvitesCapacite: number;
	hebergementInvitesTarif: number;

	decoration: boolean;
	decorationTarif: number;

	laviselleEtCouvert: boolean;
	laviselleEtCouvertTarif: number;

	drapeDeTable: boolean;
	drapeDeTableTarif: number;

}
