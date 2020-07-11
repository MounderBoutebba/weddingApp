import { FeeType } from '../../../../../user/models/option.model';

export interface LieuTraiteurGateauBookingInterface {
	lieu: {
		selected: boolean,
		debutLocation?: {
			min: number,
			heure: number,
		};
		finLocation?: {
			min: number,
			heure: number,
		};
		salleDeReception?: boolean;
		pisteDeDense?: boolean;
		chambrePourLesMariee?: boolean;
		cuisinePourLeTraiteur?: boolean;
		terrasse?: boolean;
		jardin?: boolean;
		chapiteau?: boolean;
		tente?: boolean;

		parking?: boolean;
		parkingNbrPlace?: number;

		hebergementInvites?: boolean;
		hebergementInvitesNbrDeNuits?: number;
		hebergementInvitesNbrInvites?: number;

		decoration?: boolean;
		vaiselleEtCouvert?: boolean;
		drapeDeTable?: boolean;
	};

	traiteur: {
		selected: boolean,
		serviceEnSalle?: boolean;
		serviceDebarrassageEtNettoyage?: boolean;
		droitDeBouchon?: boolean;
		droitDeBouchonNbrBouteilles?: number;
		vinHonneurCocktailBuffet?: {
			products: {
				name: string,
				options: Objet[],
			}[]
		};
		Dinner?: {
			products: {
				name: string,
				options: Objet[],
			}[]
		};
		boissonsAlcoolises?: Objet[];
		boissonsNonAlcoolises?: Objet[];
	};
	gateau: {
		selected: boolean,
		livraison?: boolean;
		produits?: Gateau[];
	};
	optionDivers: Option[];
}
interface Objet {
	name: string;
	value: boolean;
	nbrPieces: number;
	label: string;
}
interface Gateau {
	name: string;
	value: boolean;
	label: string;
	nbrParts: number;
	nbrEtages: number;
}
interface Option {
	id: string,
	name: string;
	description: string;
	optionRate: number;
	examplaire?: number;
	feeType: FeeType;
	checked: boolean;
	categories: string[],
}
export const bookingObj: LieuTraiteurGateauBookingInterface = {
	lieu: {selected: false},
	traiteur: {selected: false},
	gateau: {selected: false},
	optionDivers: []
};
