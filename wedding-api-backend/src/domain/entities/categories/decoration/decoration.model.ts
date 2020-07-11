import { Categorie, Critere } from '../categorie.model';

export class Decoration implements Categorie {
	criteres: DecorationCriteres;
	label = 'decoration';
	userid = '';
	location = { address: '', lat: 0, lng: 0 };

}

export interface DecorationCriteres extends Critere {

}
