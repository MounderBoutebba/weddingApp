export interface Categorie {
	userid: string;
	label: string;
	sousCategories?: Categorie[];
	criteres?: Critere;
	location: { address: string; lat: number; lng: number };
	totalNotes?: number;
	securePayment?: boolean;
	verifiedProvider?: boolean;
}

export interface Critere {}
