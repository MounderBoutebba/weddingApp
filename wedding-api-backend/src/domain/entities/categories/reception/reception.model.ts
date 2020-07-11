import { Categorie, Critere } from '../categorie.model';

export class Reception implements Categorie {
	criteres: ReceptionCriteres;
	label = 'reception';
	userid = '';
	location = { address: '', lat: 0, lng: 0 };

}

export interface ReceptionCriteres extends Critere {
}
