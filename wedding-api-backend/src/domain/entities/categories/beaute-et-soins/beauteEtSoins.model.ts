import { Categorie, Critere } from '../categorie.model';

export class BeauteEtSoins implements Categorie {
	criteres: BeauteEtSoinsCriteres;
	label = 'beautertsoins';
	userid = '';
	location = { address: '', lat: 0, lng: 0 };
}

export interface BeauteEtSoinsCriteres extends Critere {

}
