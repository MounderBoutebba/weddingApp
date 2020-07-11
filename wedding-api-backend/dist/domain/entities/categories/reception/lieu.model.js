"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const field_type_enum_1 = require("../field-type.enum");
class Lieu {
    constructor() {
        this.criteres = {
            tarif_horaire: 80,
            typeDeLieu: 'auberge',
            serviceTraiteur: false,
            lieuSansServiceTraiteur: true,
            serviceGateau: false,
            lieuSansServiceGateau: true,
            servicePhotographeVideaste: false,
            lieuSansServicePhotographeVideaste: true,
            serviceMusic: false,
            lieuSansServiceMusic: true,
            serviceDecoration: false,
            lieuSansServiceDecoration: true,
            capaciteInvites: 20,
            typeReception: [],
            utilisationDuLieu: 'interieur_et_exterieur',
            configurationDeLaReception: 'assis_et_debout',
            situationGeographique: 'sur_la_plage',
            adaptabiliteMobiliteReduite: true,
            tarifHoraireLocation: 1200,
            debutLocation: {
                type: field_type_enum_1.FieldTypeEnum.TOGGLE_NUMBER_TIME,
                heures: 8,
                min: 0,
            },
            limiteHoraire: {
                type: field_type_enum_1.FieldTypeEnum.TOGGLE_NUMBER_TIME,
                value: false,
                heures: 0,
                min: 0,
            },
            pisteDeDense: false,
            pisteDeDenseSurface: 20,
            salleDeReception: false,
            salleDeReceptionSurface: 0,
            chambrePourLesMariee: false,
            chambrePourLesMarieeSurface: 20,
            chambrePourLesMarieeInclusDansPrix: false,
            chambrePourLesMarieeTarif: 40,
            cuisinePourLeTraiteur: false,
            cuisinePourLeTraiteurSurface: 20,
            cuisinePourLeTraiteurInclusDansPrix: false,
            cuisinePourLeTraiteurTarif: 40,
            terrasse: false,
            terrasseSurface: 20,
            terrasseInclusDansPrix: false,
            terrasseTarif: 40,
            jardin: false,
            jardinSurface: 20,
            jardinInclusDansPrix: false,
            jardinTarif: 40,
            chapiteau: false,
            chapiteauSurface: 20,
            chapiteauInclusDansPrix: false,
            chapiteauTarif: 40,
            parking: false,
            parkingSurface: 20,
            parkingInclusDansPrix: false,
            parkingTarif: 40,
            hebergementInvites: false,
            hebergementInvitesCapacite: 30,
            hebergementInvitesTarif: 30,
            decoration: false,
            decorationTarif: 0,
            laviselleEtCouvert: false,
            laviselleEtCouvertTarif: 0,
            drapeDeTable: false,
            drapeDeTableTarif: 30,
        };
        this.label = 'lieu';
        this.userid = '';
        this.location = { address: '', lat: 0, lng: 0 };
    }
}
exports.Lieu = Lieu;
//# sourceMappingURL=lieu.model.js.map