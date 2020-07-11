import { Categorie, Critere } from '../categorie.model';

export class AnimateurAdultes implements Categorie {
	criteres: AdultesCriteres = {

		typeDeService: 'magicien',

		tarif_horaire: 80,

		dureeDeReservation: 3,
	};
	label = 'animateurAdultes';
	userid = '';
	location = { address: '', lat: 0, lng: 0 };

}

export interface AdultesCriteres extends Critere {

	typeDeService: string;

	tarif_horaire: number;

	dureeDeReservation: number;

}
