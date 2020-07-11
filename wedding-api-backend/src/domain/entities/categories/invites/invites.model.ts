import { Categorie, Critere } from '../categorie.model';

export class Invites implements Categorie {
	criteres: InvitesCriteres;
	label = 'invites';
	userid = '';
	location = { address: '', lat: 0, lng: 0 };

}

export interface InvitesCriteres extends Critere {
}
