import { BeauteEtSoins, BeauteEtSoinsCriteres } from './beauteEtSoins.model';
import { FieldTypeEnum } from '../field-type.enum';

export class Esthetique extends BeauteEtSoins {
	criteres: EsthetiqueCriteres = {
        tarif_horaire: 80,

        conseilsPersonnalises: false,
        conseilsPersonnalisesDuree: 0,
        conseilsPersonnalisesTarif: 80,

        essais: false,
        essaisNombre: 0,
        essaisTarif: 80,

        manucureEtpedicure: {
            type: FieldTypeEnum.TOGGLE_PRESTATIONS,
            value: false,
            capacite: 3,
            prestations: [
                {
                    name: `Mains`,
                    search: `mains`,
                    field: `mains`,
                    options: [
                         {
                             name: `Manucure`,
                             tarif: 25
                         },
                         {
                             name: `Pose de vernis`,
                             tarif: 25
                         },
                         {
                             name: `Pose de vernis Green Manucurist`,
                             tarif: 25
                         },
                         {
                             name: `Manucure + vernis semi-permanent`,
                             tarif: 25
                         },
                         {
                             name: `Supplément French`,
                             tarif: 25
                         },
                         {
                             name: `Dépose semi-permanent`,
                             tarif: 25
                         },
                         {
                             name: `Pose de faux ongles + vernis`,
                             tarif: 25
                         },
                         {
                             name: `Remplissage des ongles au gel`,
                             tarif: 25
                         },
                    ],
                },
                {
                    name: `Pieds`,
                    search: `pieds`,
                    field: `pieds`,
                    options: [
                         {
                             name: `Beauté des pieds`,
                             tarif: 25
                         },
                         {
                             name: `Beauté des pieds + vernis`,
                             tarif: 25
                         },
                         {
                             name: `Beauté des pieds + vernis green Manucurist`,
                             tarif: 25
                         },
                         {
                             name: `Beauté des pieds + vernis semi-permanent`,
                             tarif: 25
                         },
                         {
                             name: `Supplément French`,
                             tarif: 25
                         },
                         {
                             name: `Dépose semi-permanent`,
                             tarif: 25
                         },
                    ],
                },
            ],
        },

        epilation: {
            type: FieldTypeEnum.TOGGLE_PRESTATIONS,
            value: false,
            capacite: 3,
            prestations: [
                {
                    name: `Jambes`,
                    search: `jambes`,
                    field: `jambes`,
                    options: [
                         {
                             name: `½ Jambes`,
                             tarif: 25
                         },
                         {
                             name: `Cuisses`,
                             tarif: 25
                         },
                         {
                             name: `¾ Jambes`,
                             tarif: 25
                         },
                         {
                             name: `Jambes entières`,
                             tarif: 25
                         },
                    ],
                },
                {
                    name: `Corps`,
                    search: `corps`,
                    field: `corps`,
                    options: [
                         {
                             name: `Maillot simple`,
                             tarif: 25
                         },
                         {
                             name: `Maillot brésilien`,
                             tarif: 25
                         },
                         {
                             name: `Maillot semi-intégral`,
                             tarif: 25
                         },
                         {
                             name: `Maillot intégral`,
                             tarif: 25
                         },
                         {
                             name: `Sillon inter-fessier`,
                             tarif: 25
                         },
                         {
                             name: `Aisselles`,
                             tarif: 25
                         },
                         {
                             name: `½ bras`,
                             tarif: 25
                         },
                         {
                             name: `Bras complets`,
                             tarif: 25
                         },

                    ],
                },
                {
                    name: `Visage`,
                    search: `visage`,
                    field: `visage`,
                    options: [
                         {
                             name: `Lèvres`,
                             tarif: 25
                         },
                         {
                             name: `Sourcils`,
                             tarif: 25
                         },
                         {
                             name: `Menton`,
                             tarif: 25
                         },
                         {
                             name: `Cou`,
                             tarif: 25
                         },

                    ],
                },
            ],
        },




        lieuRealisation: [],

        sexPraticien: [],

	};
	label = 'esthetique';
	userid = '';
	location = { address: '', lat: 0, lng: 0 };

}

export interface EsthetiqueCriteres extends BeauteEtSoinsCriteres {

	tarif_horaire: number;

	conseilsPersonnalises: boolean;
	conseilsPersonnalisesDuree: number;
	conseilsPersonnalisesTarif: number;

	essais: boolean;
	essaisNombre: number;
	essaisTarif: number;

	manucureEtpedicure: {
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

	epilation: {
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

	lieuRealisation: string[];

	sexPraticien: string[];

}
