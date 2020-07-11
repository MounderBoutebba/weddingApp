import { FieldTypeEnum } from '../../../../../shared/components/dynamic-form-builder/models/field-type.enum';

export interface FeuArtificesCriteres {
	tarif_horaire: number;
	dureeMin: number; // minutes
	effets: {
		type: string,
		options: Array<
			{
			field?: string,
			search?: string,
			value: boolean,
			name: string,
			label: string,
			inclusDansPrix: boolean,
			tarif: number,
			}>
		,
	};
	programmes: {
		type: string,
		options: Array<
			{
			field?: string,
			search?: string,
			value: boolean,
			name: string,
			label: string,
			inclusDansPrix: boolean,
			tarif: number,
			}>
		,
	};

	PersonnalisationPlaylisteMusical: boolean;
}
export const newFeuArtificesCriteres: FeuArtificesCriteres = {
	tarif_horaire: 1200,

	effets: {
		type: FieldTypeEnum.TOGGLE_NUMBER_RADIO_LIST,
		options: [
			{
				field: 'jongleriesDePivoinesRouges',
				search: '',
				value: false,
				name: `juggling red peonies`,
				label: `do you propose this effect ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'archesDePlumeauxJaunes',
				search: '',
				value: false,
				name: `yellow feather arches`,
				label: `do you propose this effect ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'envolees_de_papillons',
				search: '',
				value: false,
				name: `Envolées de papillons`,
				label: `do you propose this effect ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'batailleDePlumetsBlancsEtCroisillonsTopaze',
				search: '',
				value: false,
				name: `Bataille de plumets blancs et croisillons topaze`,
				label: `do you propose this effect ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'eventailDeGerbesOr',
				search: '',
				value: false,
				name: `Éventail de gerbes d\'or`,
				label: `do you propose this effect ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'rideaux_etoiles_de_poussiereor',
				search: '',
				value: false,
				name: `Rideaux d'étoiles de poussière d'or`,
				label: `do you propose this effect ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'palmiers_coiffes_de_lucioles',
				search: '',
				value: false,
				name: `Palmiers coiffés de lucioles`,
				label: `do you propose this effect ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'elevation_craquante_pointes_violettes',
				search: '',
				value: false,
				name: `Élévation craquante à pointes violettes`,
				label: `do you propose this effect ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'rideau_de_poussieres_emeraude',
				search: '',
				value: false,
				name: `Rideau de poussières d'émeraude`,
				label: `do you propose this effect ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'tourbillons_spirale_argent',
				search: '',
				value: false,
				name: `Tourbillons spirale d'argent`,
				label: `do you propose this effect ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'fontaines_or_cascade_de_saphir',
				search: '',
				value: false,
				name: `Fontaines d'or à cascade de saphir`,
				label: `do you propose this effect ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'plumets_filaments_nacres',
				search: '',
				value: false,
				name: `Plumets filaments nacrés`,
				label: `do you propose this effect ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'bouquet_croisement_orange',
				search: '',
				value: false,
				name: `Bouquet à croisement orangé`,
				label: `do you propose this effect ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'coeur_rouge_et_jet_argent',
				search: '',
				value: false,
				name: `Coeur rouge et jet argent`,
				label: `do you propose this effect ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'pluie_scintillante_argentee',
				search: '',
				value: false,
				name: `Pluie scintillante argentée`,
				label: `do you propose this effect ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'roseaux_mosaique_de_cocotiers_argent',
				search: '',
				value: false,
				name: `Roseaux à mosaïque de cocotiers d'argent`,
				label: `do you propose this effect ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'sequences_effets_speciaux',
				search: '',
				value: false,
				name: `Séquences d’effets spéciaux`,
				label: `do you propose this effect ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'lettre_ou_chiffre_de_feu',
				search: '',
				value: false,
				name: `Lettre ou chiffre de feu`,
				label: `do you propose this effect ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'jongleries_de_palmiers_or',
				search: '',
				value: false,
				name: `Jongleries de palmiers d'or`,
				label: `do you propose this effect ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'lanceurs_de_coeurs_blanc_ou_rouge',
				search: '',
				value: false,
				name: `Lanceurs de coeurs blanc ou rouge`,
				label: `do you propose this effect ?`,
				inclusDansPrix: false,
				tarif: 40,

			},

		],
	},
	programmes: {
		type: FieldTypeEnum.TOGGLE_NUMBER_RADIO_LIST,
		options: [
			{
				field: 'tableauxDeFontaines',
				search: '',
				value: false,
				name: `paintings of fountains`,
				label: `do you propose this program ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'facadeDeChandelles',
				search: '',
				value: false,
				name: `candlelight facade`,
				label: `do you propose this program ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'tableauxMajestueux',
				search: '',
				value: false,
				name: `Tableaux majestueux`,
				label: `do you propose this program ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'couleursIntenses',
				search: '',
				value: false,
				name: `Couleurs intenses`,
				label: `do you propose this program ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'couleursIntenses',
				search: '',
				value: false,
				name: `Façade de gerbes`,
				label: `do you propose this program ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'tableaux_aeriens',
				search: '',
				value: false,
				name: `Tableaux aériens`,
				label: `do you propose this program ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'bouquet_spectaculaire_avant_le_bouquet_final',
				search: '',
				value: false,
				name: `« faux » Bouquet spectaculaire avant le bouquet final`,
				label: `do you propose this program ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'mise_en_scene_exceptionnelle',
				search: '',
				value: false,
				name: `Mise en scène exceptionnelle`,
				label: `do you propose this program ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'produits_pyrotechniques_grand_spectacle',
				search: '',
				value: false,
				name: `Produits pyrotechniques grand spectacle`,
				label: `do you propose this program ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'bouquet_final_puissant_et_volumineux',
				search: '',
				value: false,
				name: `Bouquet final puissant et volumineux`,
				label: `do you propose this program ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
		],
	},
	dureeMin: 5,

	PersonnalisationPlaylisteMusical: false,
};

