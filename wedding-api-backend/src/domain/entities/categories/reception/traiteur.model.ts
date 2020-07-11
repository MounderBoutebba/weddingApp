import { Reception, ReceptionCriteres } from './reception.model';
import { FieldTypeEnum } from '../field-type.enum';

export class Traiteur implements Reception {
	criteres: TraiteurCriteres = {

		boissonAlcooliseeEtNonAlcoolise: true,

		tarif_horaire: 80,

		specialiteCuisine: [],

		niveauElaboration: 'cuisine_brut',

		specificiteReligieuses: 'adapte_au_client',

		vinHonneurCocktailBuffet: {
			type: FieldTypeEnum.TOGGLE_VIN_HONNEUR_COCKTAIL_BUFFET,
			value: false,
			quantity: 5,
			products: [
				{
					name: `Produits salés`,
					options: [
						{
							field: 'le_normand',
							search: '',
							value: false,
							name: `Le normand`,
							label: `malted bread, Camembert cream from Normandy with dried fruits and apples`,
							tarif: 2,

						},
						{
							field: 'plateau_bouchees_mini_cakes',
							search: '',
							value: false,
							name: `Plateau bouchées Mini-cakes`,
							label: `Plateau bouchées Mini-cakes aux olives et poivrons`,
							tarif: 2,

						},
						{
							field: 'plateau_bouchees_canapes_crevettes',
							search: '',
							value: false,
							name: `Plateau bouchées Canapés crevettes`,
							label: `Plateau bouchées Canapés crevettes et sauce pamplemousse`,
							tarif: 2,

						},
						{
							field: 'pain_panettone_tomates',
							search: '',
							value: false,
							name: `Pain Panettone Tomates`,
							label: `Pain Panettone Tomates, olives et courgettes`,
							tarif: 2,

						},
						{
							field: 'pain_panettone_thon',
							search: '',
							value: false,
							name: `Pain Panettone Thon`,
							label: `Pain Panettone Thon aux poivrons et piment d'Espelette`,
							tarif: 2,

						},
						{
							field: 'pain_panettone_ricotta',
							search: '',
							value: false,
							name: `Pain Panettone Ricotta`,
							label: `Pain Panettone Ricotta, tomates et pesto`,
							tarif: 2,

						},
						{
							field: 'focaccias_au_caviar_aubergine',
							search: '',
							value: false,
							name: `Focaccias au caviar d'aubergine`,
							label: `Focaccias au caviar d'aubergine, oignons rouges et emmental`,
							tarif: 2,

						},
						{
							field: 'tartelettes_au_houmous',
							search: '',
							value: false,
							name: `Tartelettes au houmous`,
							label: `Tartelettes au houmous, au poivron et à la crème fromagère ail et persil`,
							tarif: 2,

						},
						{
							field: 'verrines_carotte_grillee',
							search: '',
							value: false,
							name: `Verrines Carotte grillée`,
							label: `Verrines Carotte grillée et caviar d'aubergine`,
							tarif: 2,

						},
						{
							field: 'verrines_fromage',
							search: '',
							value: false,
							name: `Verrines Fromage`,
							label: `Verrines Fromage de chèvre et tomate`,
							tarif: 2,

						},
						{
							field: 'pagnote_de_navettes_truite_fumee',
							search: '',
							value: false,
							name: `Pagnote de navettes Truite fumée`,
							label: `Pagnote de navettes Truite fumée, aneth et raifort`,
							tarif: 2,

						},
						{
							field: 'pagnote_de_navettes_jambon',
							search: '',
							value: false,
							name: `Pagnote de navettes Jambon`,
							label: `Pagnote de navettes Jambon sec et moutarde à l'ancienne`,
							tarif: 2,

						},
						{
							field: 'pain_surprise_scandinave_fromage',
							search: '',
							value: false,
							name: `Pain surprise scandinave Fromage`,
							label: `Pain surprise scandinave Fromage blanc aux oeufs de truite`,
							tarif: 2,

						},
						{
							field: 'pain_surprise_scandinave_poisson',
							search: '',
							value: false,
							name: `Pain surprise scandinave Poisson`,
							label: `Pain surprise scandinave Poisson blanc et concombre,`,
							tarif: 2,

						},
						{
							field: 'Canapes_tortillas',
							search: '',
							value: false,
							name: `Canapés Tortillas`,
							label: `Canapés Tortillas au guacamole et perle de poivron`,
							tarif: 2,

						},
						{
							field: 'Canapes_gougeres',
							search: '',
							value: false,
							name: `Canapés Gougères`,
							label: `Canapés Gougères au camembert et confit de cidre`,
							tarif: 2,

						},
					],
				},
				{
					name: `Produits sucrés`,
					options: [
						{
							field: 'canapes_gougeres',
							search: '',
							value: false,
							name: `mini Canneles`,
							label: `mini Canneles`,
							tarif: 2,
						},
						{
							field: 'canapes_eclairs',
							search: '',
							value: false,
							name: `mini Eclairs`,
							label: `mini Eclairs`,
							tarif: 2,
						},
						{
							field: 'verrines_mousse_chocolat',
							search: '',
							value: false,
							name: `Verrines Mousse au chocolat`,
							label: `Verrines Mousse au chocolat`,
							tarif: 2,
						},
						{
							field: 'verrines_tiramisu_framboise_speculoos',
							search: '',
							value: false,
							name: `Verrines Tiramisu framboise spéculoos`,
							label: `Verrines Tiramisu framboise spéculoos`,
							tarif: 2,
						},
						{
							field: 'verrines_mousseline_fraises',
							search: '',
							value: false,
							name: `Verrines Mousseline et fraises`,
							label: `Verrines Mousseline et fraises`,
							tarif: 2,
						},
						{
							field: 'pagnote_gaufrettes',
							search: '',
							value: false,
							name: `Pagnote de gaufrettes`,
							label: `Pagnote de gaufrettes : Nature avec des copeaux de chocolat, chocolatées garnies de crème fouettée au mascarpone`,
							tarif: 2,
						},
						{
							field: 'macarons',
							search: '',
							value: false,
							name: `Macarons`,
							label: `Macarons`,
							tarif: 2,
						},
						{
							field: 'chouquettes',
							search: '',
							value: false,
							name: `Chouquettes`,
							label: `Chouquettes`,
							tarif: 2,
						},
						{
							field: 'mini_muffins',
							search: '',
							value: false,
							name: `mini-Muffins`,
							label: `mini-Muffins`,
							tarif: 2,
						},
						{
							field: 'mini_tartlette',
							search: '',
							value: false,
							name: `mini-Tartlette`,
							label: `mini-Tartlette`,
							tarif: 2,
						},
						{
							field: 'croustillant',
							search: '',
							value: false,
							name: `Croustillant`,
							label: `Croustillant à l'amande avec dôme aux fruits rouges et cassis`,
							tarif: 2,
						},
						{
							field: 'mirlitons',
							search: '',
							value: false,
							name: `Mirlitons`,
							label: `Mirlitons`,
							tarif: 2,
						},
						{
							field: 'assortiment_de_fruits',
							search: '',
							value: false,
							name: `Assortiment de fruits`,
							label: `Assortiment de fruits`,
							tarif: 2,
						},
					],
				},
			],
		},

		Dinner: {
			type: FieldTypeEnum.TOGGLE_DINNER,
			value: false,
			dinerCapacite: 300,
			convivesMin: 15,
			products: [
				{
					name: `Entrées`,
					options: [
						{
							field: 'salmon_terrine',
							search: '',
							value: false,
							name: `salmon terrine`,
							label: `salmon terrine`,
							tarif: 2,
						},
						{
							field: 'medallion_of_surimi_with_small_vegetables',
							search: '',
							value: false,
							name: `medallion of surimi with small vegetables`,
							label: `medallion of surimi with small vegetables`,
							tarif: 2,
						},
						{
							field: 'tranches_de_saumon_fume',
							search: '',
							value: false,
							name: `Tranches de saumon fumé`,
							label: `Tranches de saumon fumé`,
							tarif: 2,
						},
						{
							field: 'asperges_vertes',
							search: '',
							value: false,
							name: `Asperges vertes`,
							label: `Asperges vertes, tomate cerise et saumon fumé`,
							tarif: 2,
						},
						{
							field: 'bloc_de_foie_gras_de_canard',
							search: '',
							value: false,
							name: `Bloc de foie gras de canard`,
							label: `Bloc de foie gras de canard (30% de morceaux) accompagné de son confit de figues aux épices`,
							tarif: 2,
						},
						{
							field: 'pate_en_croute_richelieu',
							search: '',
							value: false,
							name: `Pâté en croûte Richelieu`,
							label: `Pâté en croûte Richelieu`,
							tarif: 2,
						},
						{
							field: 'portion_de_crudite',
							search: '',
							value: false,
							name: `Portion de crudité`,
							label: `Portion de crudité`,
							tarif: 2,
						},
						{
							field: 'farandoles_de_fruits_de_mer',
							search: '',
							value: false,
							name: `Farandoles de fruits de mer`,
							label: `Farandoles de fruits de mer et St Jacques, sauce Noilly Prat`,
							tarif: 2,
						},
						{
							field: 'demi_langouste_la_parisienne',
							search: '',
							value: false,
							name: `Demi langouste à la Parisienne`,
							label: `Demi langouste à la Parisienne`,
							tarif: 2,
						},
						{
							field: 'lamb_shank_with_garlic_and_thyme',
							search: '',
							value: false,
							name: `lamb shank with garlic and thyme`,
							label: `lamb shank with garlic and thyme`,
							tarif: 2,
						},
					],
				},
				{
					name: `Plats`,
					options: [
						{
							field: 'lamb_shank_with_garlic_and_thyme',
							search: '',
							value: false,
							name: `lamb shank with garlic and thyme`,
							label: `lamb shank with garlic and thyme`,
							tarif: 2,
						},
						{
							field: 'back_cod_with_norman_sauce',
							search: '',
							value: false,
							name: `back cod with Norman sauce`,
							label: `back cod with Norman sauce`,
							tarif: 2,
						},
						{
							field: 'blanquette_de_veau',
							search: '',
							value: false,
							name: `Blanquette de veau`,
							label: `Blanquette de veau`,
							tarif: 2,
						},
						{
							field: 'pave_de_saumon_sauce_beurre_argumes',
							search: '',
							value: false,
							name: `Pavé de saumon sauce beurre d'argumes`,
							label: `Pavé de saumon sauce beurre d'argumes`,
							tarif: 2,
						},
						{
							field: 'coq_au_vin',
							search: '',
							value: false,
							name: `Coq au vin`,
							label: `Coq au vin`,
							tarif: 2,
						},
						{
							field: 'confit_de_canard',
							search: '',
							value: false,
							name: `Confit de canard`,
							label: `Confit de canard`,
							tarif: 2,
						},
						{
							field: 'couscous_aux_3_viandes',
							search: '',
							value: false,
							name: `Couscous aux 3 viandes`,
							label: `Couscous aux 3 viandes`,
							tarif: 2,
						},
						{
							field: 'jambon_roti_la_decoupe',
							search: '',
							value: false,
							name: `Jambon rôti à la découpe`,
							label: `Jambon rôti à la découpe`,
							tarif: 2,
						},
					],
				},
				{
					name: `Accompagnements`,
					options: [
						{
							field: 'trio_of_parsley_vegetables',
							search: '',
							value: false,
							name: `trio of parsley vegetables`,
							label: `trio of parsley vegetables`,
							tarif: 2,
						},
						{
							field: 'gratin_dauphinois',
							search: '',
							value: false,
							name: `gratin dauphinois`,
							label: `gratin dauphinois`,
							tarif: 2,
						},
						{
							field: 'pommes_de_terres_sautees',
							search: '',
							value: false,
							name: `Pommes de terres sautées`,
							label: `Pommes de terres sautées`,
							tarif: 2,
						},
						{
							field: 'haricots_sautes_aux_legumes',
							search: '',
							value: false,
							name: `Haricots sautés aux légumes`,
							label: `Haricots sautés aux légumes`,
							tarif: 2,
						},
					],
				},
				{
					name: `Fromages`,
					options: [
						{
							field: 'brie',
							search: '',
							value: false,
							name: `brie`,
							label: `brie`,
							tarif: 2,
						},
						{
							field: 'fourme_dAmbert',
							search: '',
							value: false,
							name: `fourme d'Ambert`,
							label: `fourme d'Ambert`,
							tarif: 2,
						},
						{
							field: 'cantal',
							search: '',
							value: false,
							name: `Cantal`,
							label: `Cantal`,
							tarif: 2,
						},
						{
							field: 'saint_nectaire',
							search: '',
							value: false,
							name: `Saint-Nectaire`,
							label: `Saint-Nectaire`,
							tarif: 2,
						},
						{
							field: 'roquefort',
							search: '',
							value: false,
							name: `Roquefort`,
							label: `Roquefort`,
							tarif: 2,
						},
						{
							field: 'bleu',
							search: '',
							value: false,
							name: `Bleu`,
							label: `Bleu`,
							tarif: 2,
						},
					],
				},
				{
					name: `Desserts`,
					options: [
						{
							field: 'strawberry_tart',
							search: '',
							value: false,
							name: `strawberry tart`,
							label: `strawberry tart`,
							tarif: 2,
						},
						{
							field: 'sparkling_chocolate',
							search: '',
							value: false,
							name: `sparkling chocolate`,
							label: `sparkling chocolate`,
							tarif: 2,
						},
						{
							field: 'framboisier_la_vanille_de_madagascar',
							search: '',
							value: false,
							name: `Framboisier à la vanille de Madagascar`,
							label: `Framboisier à la vanille de Madagascar`,
							tarif: 2,
						},
						{
							field: 'tartelette_cremeuse_la_rhubarbe',
							search: '',
							value: false,
							name: `Tartelette crémeuse à la rhubarbe`,
							label: `Tartelette crémeuse à la rhubarbe`,
							tarif: 2,
						},
						{
							field: 'blanc_manger_aux_fruits_rouges',
							search: '',
							value: false,
							name: `Blanc manger aux fruits rouges`,
							label: `Blanc manger aux fruits rouges`,
							tarif: 2,
						},
						{
							field: 'tarte_citron_meringuee',
							search: '',
							value: false,
							name: `Tarte citron meringuée`,
							label: `Tarte citron meringuée`,
							tarif: 2,
						},
						{
							field: 'flan_patissier',
							search: '',
							value: false,
							name: `Flan pâtissier`,
							label: `Flan pâtissier`,
							tarif: 2,
						},
						{
							field: 'gateau_basque',
							search: '',
							value: false,
							name: `Gateau basque`,
							label: `Gateau basque`,
							tarif: 2,
						},
						{
							field: 'Gateau_au_chocolat_entier',
							search: '',
							value: false,
							name: `Gâteau au chocolat entier`,
							label: `Gâteau au chocolat entier`,
							tarif: 2,
						},
						{
							field: 'brioche_surprise',
							search: '',
							value: false,
							name: `Brioche surprise`,
							label: `Brioche surprise`,
							tarif: 2,
						},

					],
				},
			],
		},

		// boissons
		droitDeBouchon: false,
		sansDroitDeBouchon: true,
		droitDeBouchonTarif: 1,

		// boisson alcoolisés
		boissonsAlcoolises: {
			type: FieldTypeEnum.TOGGLE_NUMBER_LIST,
			options: [
				{
					field: 'red_wine_castle_the_barn_2016',
					search: '',
					value: false,
					name: `red wine - castle the barn 2016`,
					label: `castle the barn 2016`,
					tarif: 2,
				},
				{
					field: 'white_wine_high_mayne_castle_high_white_2016',
					search: '',
					value: false,
					name: `white wine - high mayne castle high white 2016`,
					label: `high mayne castle high white 2016`,
					tarif: 2,
				},
				{
					field: 'domaine_du_paradis_linfini_rose_2018',
					search: '',
					value: false,
					name: `Domaine du Paradis L'Infini Rosé 2018`,
					label: `Domaine du Paradis L'Infini Rosé 2018`,
					tarif: 2,
				},
				{
					field: 'champagne_gh_mumm_cordon_rouge_etui',
					search: '',
					value: false,
					name: `Champagne Gh Mumm Cordon Rouge étui`,
					label: `Champagne Gh Mumm Cordon Rouge étui`,
					tarif: 2,
				},
				{
					field: 'whisky_aberlour_18_ans',
					search: '',
					value: false,
					name: `Whisky Aberlour 18 Ans`,
					label: `Whisky Aberlour 18 Ans`,
					tarif: 2,
				},
			],
		},

		// boisson non-alcoolisés
		boissonsNonAlcoolises: {
			type: FieldTypeEnum.TOGGLE_NUMBER_LIST,
			options: [
				{
					field: 'orange_juice',
					search: '',
					value: false,
					name: `orange juice`,
					label: `orange juice naturally squeezes without added sugar`,
					tarif: 2,
				},
				{
					field: 'coca_cola',
					search: '',
					value: false,
					name: `Coca Cola`,
					label: `coca cola, an originally american drink`,
					tarif: 2,
				},
				{
					field: 'ice_tea',
					search: '',
					value: false,
					name: `Ice Tea`,
					label: `Ice Tea`,
					tarif: 2,
				},
				{
					field: 'san_pellegrino',
					search: '',
					value: false,
					name: `San Pellegrino`,
					label: `San Pellegrino`,
					tarif: 2,
				},
				{
					field: 'perrier',
					search: '',
					value: false,
					name: `Perrier`,
					label: `Perrier`,
					tarif: 2,
				},
				{
					field: 'Evian',
					search: '',
					value: false,
					name: `Evian`,
					label: `Evian`,
					tarif: 2,
				},
				{
					field: 'christaline',
					search: '',
					value: false,
					name: `Christaline`,
					label: `Christaline`,
					tarif: 2,
				},
			],
		},
		serviceEnSalle: false,
		serviceEnSalleTarif: 100,

		serviceDebarrassageEtNettoyage: false,
		serviceDebarrassageEtNettoyageTarif: 30,
	};
	label = 'traiteur';
	userid = '';
	location = { address: '', lat: 0, lng: 0 };

}

export interface TraiteurCriteres extends ReceptionCriteres {
	tarif_horaire: number;

	specialiteCuisine: string[];

	niveauElaboration: string;

	specificiteReligieuses: string;

	// Vin
	vinHonneurCocktailBuffet: {
		type: string,
		value: boolean,
		quantity: number,
		products: {
			name: string,
			options: {
				field?: string,
				search?: string,
				value: boolean,
				name: string,
				label: string,
				tarif: number,
			}[]
		,
		}[],

	};

	// Dinner
	Dinner: {
		type: string,
		value: boolean,
		dinerCapacite: number,
		convivesMin: number,
		products: {
			name: string,
			options: {
				field?: string,
				search?: string,
				value: boolean,
				name: string,
				label: string,
				tarif: number,
			}[]
		,
		}[],

	};

	// boissons
	droitDeBouchon: boolean;
	sansDroitDeBouchon: boolean;
	droitDeBouchonTarif: number;

	// boissons alcoolisés
	boissonsAlcoolises: {
		type: string,
		options: {
			field?: string,
			search?: string,
			value: boolean,
			name: string,
			label: string,
			tarif: number,
			}[]
		,
	};


	// boisson non-alcoolisés
	boissonsNonAlcoolises: {
		type: string,
		options: {
			field?: string,
			search?: string,
			value: boolean,
			name: string,
			label: string,
			tarif: number,
			}[]
		,
	};

	serviceEnSalle: boolean;
	serviceEnSalleTarif: number;

	serviceDebarrassageEtNettoyage: boolean;
	serviceDebarrassageEtNettoyageTarif: number;

	boissonAlcooliseeEtNonAlcoolise: boolean;
}
