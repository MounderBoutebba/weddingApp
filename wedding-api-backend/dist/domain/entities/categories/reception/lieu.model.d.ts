import { Reception, ReceptionCriteres } from './reception.model';
export declare class Lieu implements Reception {
    criteres: LieuCriteres;
    label: string;
    userid: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
}
export interface LieuCriteres extends ReceptionCriteres {
    tarif_horaire: number;
    typeDeLieu: string;
    serviceTraiteur: boolean;
    lieuSansServiceTraiteur: boolean;
    serviceGateau: boolean;
    lieuSansServiceGateau: boolean;
    servicePhotographeVideaste: boolean;
    lieuSansServicePhotographeVideaste: boolean;
    serviceMusic: boolean;
    lieuSansServiceMusic: boolean;
    serviceDecoration: boolean;
    lieuSansServiceDecoration: boolean;
    capaciteInvites: number;
    typeReception: string[];
    utilisationDuLieu: string;
    configurationDeLaReception: string;
    situationGeographique: string;
    adaptabiliteMobiliteReduite: boolean;
    tarifHoraireLocation: number;
    debutLocation: {
        type: string;
        heures: number;
        min: number;
    };
    limiteHoraire: {
        type: string;
        heures: number;
        min: number;
        value: boolean;
    };
    pisteDeDense: boolean;
    pisteDeDenseSurface: number;
    salleDeReception: boolean;
    salleDeReceptionSurface: number;
    chambrePourLesMariee: boolean;
    chambrePourLesMarieeSurface: number;
    chambrePourLesMarieeInclusDansPrix: boolean;
    chambrePourLesMarieeTarif: number;
    cuisinePourLeTraiteur: boolean;
    cuisinePourLeTraiteurSurface: number;
    cuisinePourLeTraiteurInclusDansPrix: boolean;
    cuisinePourLeTraiteurTarif: number;
    terrasse: boolean;
    terrasseSurface: number;
    terrasseInclusDansPrix: boolean;
    terrasseTarif: number;
    jardin: boolean;
    jardinSurface: number;
    jardinInclusDansPrix: boolean;
    jardinTarif: number;
    chapiteau: boolean;
    chapiteauSurface: number;
    chapiteauInclusDansPrix: boolean;
    chapiteauTarif: number;
    parking: boolean;
    parkingSurface: number;
    parkingInclusDansPrix: boolean;
    parkingTarif: number;
    hebergementInvites: boolean;
    hebergementInvitesCapacite: number;
    hebergementInvitesTarif: number;
    decoration: boolean;
    decorationTarif: number;
    laviselleEtCouvert: boolean;
    laviselleEtCouvertTarif: number;
    drapeDeTable: boolean;
    drapeDeTableTarif: number;
}
