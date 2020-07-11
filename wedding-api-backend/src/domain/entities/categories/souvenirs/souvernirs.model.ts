import { Categorie, Critere } from '../categorie.model';

export class Souvernirs implements Categorie {
	criteres: SouvernirsCriteres;
	label = 'souvenirs';
	userid = '';
	location = { address: '', lat: 0, lng: 0 };

}

export interface SouvernirsCriteres extends Critere {}
