import { FieldTypeEnum } from '../../../../../shared/components/dynamic-form-builder/models/field-type.enum';

export interface MaquillageCriteres {
    tarif_horaire: number;

	conseilsPersonnalises: boolean;
	conseilsPersonnalisesDuree: number;
	conseilsPersonnalisesTarif: number;

	essais: boolean;
	essaisNombre: number;
	essaisTarif: number;

    majorationTypeDePeau: {
        type: string,
        value: boolean,
        options: { name: string; majoration: number, label: string }[],
    };

	produits: {
        type: string,
        value: boolean,
        options: { name: string; tarif: number, label: string, checked: boolean, field: string, search: string}[],
    };
	prestationInvitesProches: {
        type: string,
        value: boolean,
        capacite: number,
        prestations: {
            name: string,
            search: string,
            field: string,
            options: {
                name: string,
                tarif: number,
            }[],
        }[],
    };
	maquillageNombre: number;


	lieuRealisation: string[];
}
export const newMaquillageCriteres: MaquillageCriteres = {
    tarif_horaire: 80,

    conseilsPersonnalises: false,
    conseilsPersonnalisesDuree: 0,
    conseilsPersonnalisesTarif: 80,

    essais: false,
    essaisNombre: 0,
    essaisTarif: 80,

    majorationTypeDePeau: {
        value: false,
        type: FieldTypeEnum.TOGGLE_MAJORATION,
        options: [
            {name: `Sèche`, majoration: 10, label: `Majoration en %`},
            {name: `Grasse`, majoration: 10, label: `Majoration en %`},
            {name: `Peau mixte`, majoration: 10, label: `Majoration en %`},
            {name: `Sensible`, majoration: 10, label: `Majoration en %`},
        ],
    },

    produits: {
        value: false,
        type: FieldTypeEnum.TOGGLE_PRODUITS_ACCESSOIRES,
        options: [
            {
            name: `Produit de maintien`,
            tarif: 15,
            label: `Tarif par unité`,
            checked: false,
            field: 'produit_de_maintien',
            search: 'produit_de_maintien',
            },
            {
            name: `Soin visage`,
            tarif: 15,
            label: `Tarif par unité`,
            checked: false,
            field: 'soin_visage',
            search: 'soin_visage',
            },
            {
            name: `Crème hydratante`,
            tarif: 15,
            label: `Tarif par unité`,
            checked: false,
            field: 'creme_hydratante',
            search: 'creme_hydratante',
            },
            {
            name: `Pinceau kabuki`,
            tarif: 15,
            label: `Tarif par unité`,
            checked: false,
            field: 'pinceau_kabuki',
            search: 'pinceau_kabuki',
            },
            {
            name: `Gel sculptant`,
            tarif: 15,
            label: `Tarif par unité`,
            checked: false,
            field: 'gel_sculptant',
            search: 'gel_sculptant',
            },
            {
            name: `Faux-cils`,
            tarif: 15,
            label: `Tarif par unité`,
            checked: false,
            field: 'faux_cils',
            search: 'faux_cils',
            },
            {
            name: `Éponge à maquillage`,
            tarif: 15,
            label: `Tarif par unité`,
            checked: false,
            field: 'eponge_a_maquillage',
            search: 'eponge_a_maquillage',
            },
            {
            name: `Brosses maquillage ovales`,
            tarif: 15,
            label: `Tarif par unité`,
            checked: false,
            field: 'brosses_maquillage_ovales',
            search: 'brosses_maquillage_ovales',
            },

        ],
    },
    prestationInvitesProches: {
        type: FieldTypeEnum.TOGGLE_PRESTATIONS,
        value: false,
        capacite: 3,
        prestations: [
            {
                name: ``,
                search: ``,
                field: ``,
                options: [
                     {
                         name: `Maquillage simple`,
                         tarif: 25
                     },
                     {
                         name: `Maquillage semi-élaboré`,
                         tarif: 25
                     },
                     {
                         name: `Maquillage élaboré`,
                         tarif: 25
                     },
                ],
            },
        ],
    },

    maquillageNombre: 0,

    lieuRealisation: []
};
