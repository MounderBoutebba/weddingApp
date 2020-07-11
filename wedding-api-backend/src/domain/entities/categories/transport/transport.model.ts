import { Categorie, Critere } from '../categorie.model';

export class Transport implements Categorie {
	criteres: TransportCriteres;
	label = 'transport';
	userid = '';
	location = { address: '', lat: 0, lng: 0 };

}

export interface TransportCriteres extends Critere {

}
