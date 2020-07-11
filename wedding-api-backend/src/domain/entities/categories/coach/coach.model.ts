import { Categorie, Critere } from '../categorie.model';

export class Coach implements Categorie {
	criteres: CoachCriteres;
	label = 'coach';
	userid = '';
	location = { address: '', lat: 0, lng: 0 };

}

export interface CoachCriteres extends Critere {}
