import { FieldTypeEnum } from 'projects/mariage/src/app/modules/shared/components/dynamic-form-builder/models/field-type.enum';

export interface FleuristeCriteres {

	tarif_horaire: number;

	quantiteCommande: number;

	fleurs: {
        type: string,
        value: boolean,
        options: { name: string; tarif: number, label: string, checked: boolean, field: string, search: string}[],
    };

	feuillages: {
        type: string,
        value: boolean,
        options: { name: string; tarif: number, label: string, checked: boolean, field: string, search: string}[],
    };

	decoration: {
        type: string,
        value: boolean,
        options: { name: string; tarif: number, label: string, checked: boolean, field: string, search: string}[],
    };

	livraison: boolean;
	livraisonInclusDansPrix: boolean;
	livraisonTarif: number;

}
export const newFleuristeCriteres: FleuristeCriteres = {

	tarif_horaire: 80,

	quantiteCommande: 5,

	fleurs: {
        value: false,
        type: FieldTypeEnum.TOGGLE_PRODUITS_ACCESSOIRES,
        options: [
            {
            name: `Roses`,
            tarif: 30,
            label: `Tarif par unité`,
            checked: false,
            field: 'roses',
            search: 'roses',
            },
            {
            name: `Orchidées`,
            tarif: 30,
            label: `Tarif par unité`,
            checked: false,
            field: 'orchidees',
            search: 'orchidees',
            },
            {
            name: `Lys`,
            tarif: 30,
            label: `Tarif par unité`,
            checked: false,
            field: 'lys',
            search: 'lys',
            },
            {
            name: `Lotus`,
            tarif: 30,
            label: `Tarif par unité`,
            checked: false,
            field: 'lotus',
            search: 'lotus',
            },
            {
            name: `Alstroemeria`,
            tarif: 30,
            label: `Tarif par unité`,
            checked: false,
            field: 'alstroemeria',
            search: 'alstroemeria',
            },
            {
            name: `Amaryllis`,
            tarif: 30,
            label: `Tarif par unité`,
            checked: false,
            field: 'amaryllis',
            search: 'amaryllis',
            },
            {
            name: `Anthurium`,
            tarif: 30,
            label: `Tarif par unité`,
            checked: false,
            field: 'anthurium',
            search: 'anthurium',
            },
            {
            name: `Aster`,
            tarif: 30,
            label: `Tarif par unité`,
            checked: false,
            field: 'aster',
            search: 'aster',
            },
            {
            name: `Œillet d'amour. (Gypsophile)`,
            tarif: 30,
            label: `Tarif par unité`,
            checked: false,
            field: 'eillet',
            search: 'eillet',
            },
            {
            name: `Clochettes d'Irlande`,
            tarif: 30,
            label: `Tarif par unité`,
            checked: false,
            field: 'clochettes',
            search: 'clochettes',
            },
            {
            name: `Oiseau de paradis`,
            tarif: 30,
            label: `Tarif par unité`,
            checked: false,
            field: 'oiseau',
            search: 'oiseau',
            },
            {
            name: `Bupleurum`,
            tarif: 30,
            label: `Tarif par unité`,
            checked: false,
            field: 'bupleurum',
            search: 'bupleurum',
            },
        ],
    },

	feuillages: {
        value: false,
        type: FieldTypeEnum.TOGGLE_PRODUITS_ACCESSOIRES,
        options: [
            {
            name: `Lierre`,
            tarif: 30,
            label: `Tarif par unité`,
            checked: false,
            field: 'lierre',
            search: 'lierre',
            },
            {
            name: `Eucalyptus parvifolia`,
            tarif: 30,
            label: `Tarif par unité`,
            checked: false,
            field: 'eucalyptusParvifolia',
            search: 'eucalyptusParvifolia',
            },
            {
            name: `Eucalyptus cinerea`,
            tarif: 30,
            label: `Tarif par unité`,
            checked: false,
            field: 'eucalyptusCinerea',
            search: 'eucalyptusCinerea',
            },
            {
            name: `Alchemille`,
            tarif: 30,
            label: `Tarif par unité`,
            checked: false,
            field: 'alchemille',
            search: 'alchemille',
            },
            {
            name: `Aralias`,
            tarif: 30,
            label: `Tarif par unité`,
            checked: false,
            field: 'aralias',
            search: 'aralias',
            },
            {
            name: `Asparagus plumosus`,
            tarif: 30,
            label: `Tarif par unité`,
            checked: false,
            field: 'asparagus',
            search: 'asparagus',
            },
            {
            name: `Fougère US petite`,
            tarif: 30,
            label: `Tarif par unité`,
            checked: false,
            field: 'fougere_us_petite',
            search: 'fougere_us_petite',
            },
            {
            name: `Ruscus`,
            tarif: 30,
            label: `Tarif par unité`,
            checked: false,
            field: 'ruscus',
            search: 'ruscus',
            },
        ],
    },

	decoration: {
        value: false,
        type: FieldTypeEnum.TOGGLE_PRODUITS_ACCESSOIRES,
        options: [
            {
            name: `Branche de coton`,
            tarif: 30,
            label: `Tarif par unité`,
            checked: false,
            field: 'brancheDeCoton',
            search: 'brancheDeCoton',
            },
            {
            name: `Boule métal 8 cm multicolore`,
            tarif: 30,
            label: `Tarif par unité`,
            checked: false,
            field: 'bouleMetal8cmMulticolore',
            search: 'bouleMetal8cmMulticolore',
            },
            {
            name: `Fil de laiton`,
            tarif: 30,
            label: `Tarif par unité`,
            checked: false,
            field: 'filDeLaiton',
            search: 'filDeLaiton',
            },
            {
            name: `Mitsumata grand`,
            tarif: 30,
            label: `Tarif par unité`,
            checked: false,
            field: 'mitsumataGrand',
            search: 'mitsumataGrand',
            },
            {
            name: `Rafia naturel`,
            tarif: 30,
            label: `Tarif par unité`,
            checked: false,
            field: 'rafia',
            search: 'rafia',
            },
            {
            name: `Saule tortueux`,
            tarif: 30,
            label: `Tarif par unité`,
            checked: false,
            field: 'saule',
            search: 'saule',
            },
            {
            name: `Boule métal 5cm jaune`,
            tarif: 30,
            label: `Tarif par unité`,
            checked: false,
            field: 'boule_metal_5cm_jaune',
            search: 'boule_metal_5cm_jaune',
            },
            {
            name: `Pommes de pin`,
            tarif: 30,
            label: `Tarif par unité`,
            checked: false,
            field: 'pommes_de_pin',
            search: 'pommes_de_pin',
            },
        ],
    },

	livraison: false,
	livraisonInclusDansPrix: false,
	livraisonTarif: 40,
};
