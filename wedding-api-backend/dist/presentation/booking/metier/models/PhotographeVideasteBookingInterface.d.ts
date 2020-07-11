import { OptionDivers } from './optionDivers';
export interface BookingInterface {
    photographe: PhotographeBooking;
    videaliste: VideasteBooking;
    gateau: GateauMariageBooking;
    lieu: LieuBooking;
    traiteur: TraiteurBooking;
    maquillage: MaquillageBooking;
    soins: SoinsBooking;
    esthetique: EsthetiqueBooking;
    coiffure: CoiffureBooking;
    optionDivers: OptionDivers[];
}
export interface CreationAlbulCalcule {
    name: string;
    checked: boolean;
    examplaire: number;
}
export interface CreationAlbumModule {
    name: string;
    checked: boolean;
    modeles: CreationAlbulCalcule[];
}
export interface PhotographeBooking {
    dureeMissionPhoto?: number;
    duoPhoto?: boolean;
    photomaton?: boolean;
    photocall?: boolean;
    livraisonHauteResolutionPhoto?: boolean;
    galeriePrive?: boolean;
    dureeMissionSeanceEngagement?: number;
    seanceEngagementIsChecked?: boolean;
    dureeMissionSeanceBrunchOuDejeuner?: number;
    seanceBrunchOuDejeunerIsChecked?: boolean;
    dureeMissionSeanceApresMariage?: number;
    seanceApresMariageIsChecked?: boolean;
    donneesDvdExamplairesPhoto?: number;
    donneesDvdExamplairesPhotoIsChecked?: boolean;
    donneesUsbExamplairesPhoto?: number;
    donneesUsbExamplairesPhotoIsChecked?: boolean;
    tiragePapierFinitionMate?: boolean;
    tiragePapierFinitionBrillante?: boolean;
    tiragePapier?: {
        name: string;
        checked: boolean;
        examplaire: number;
    }[];
    creationAlbumFinitionMate?: boolean;
    creationAlbumFinitionBrillante?: boolean;
    creationAlbumCalcule?: CreationAlbulCalcule[];
    creationAlbum?: CreationAlbumModule[];
    retouchesPhotoExamplaires?: number;
    retouchesPhoto?: boolean;
    livraisonExpressPhoto?: boolean;
}
export interface PhotographeCriteresES {
    photographe_styleDePhoto: string[];
    photographe_techniqueUtilisees: string[];
    photographe_appareils: string[];
    photographe_objectifs: string[];
    photographe_accessoires: string[];
    photographe_tarif_horaire: number;
    photographe_dureeDeReservationMinimum: number;
    photographe_duoPhoto: boolean;
    photographe_duoPhotoTarif: number;
    photographe_delaisDeLivraisonJours: number;
    photographe_livraisonExpress: boolean;
    photographe_livraisonExpressTarif: number;
    photographe_seanceEngagement: boolean;
    photographe_seanceEngagementDureeMinimum: number;
    photographe_seanceEngagementDureeMinimumTarifHoraire: number;
    photographe_seanceBrunchOuDejeuner: boolean;
    photographe_seanceBrunchOuDejeunerDureeMinimum: number;
    photographe_seanceBrunchOuDejeunerDureeMinimumTarifHoraire: number;
    photographe_seanceApresMariage: boolean;
    photographe_seanceApresMariageDureeMinimum: number;
    photographe_seanceApresMariageDureeMinimumTarifHoraire: number;
    photographe_photomaton: boolean;
    photographe_photomatonTarifUnique: number;
    photographe_photocall: boolean;
    photographe_photocallTraifUnique: number;
    photographe_creationAlbum: {
        type: string;
        value: boolean;
        finitions: string[];
        formats: {
            field?: string;
            search?: string;
            name: string;
            value: boolean;
            modeles: {
                name: string;
                tarif: number;
                checked: boolean;
            }[];
        }[];
    };
    photographe_tiragePapier: {
        type: string;
        value: boolean;
        finitions: string[];
        formats: {
            field?: string;
            search?: string;
            name: string;
            value: boolean;
            modeles: {
                name: string;
                tarif: number;
            }[];
        }[];
    };
    photographe_galeriePrive: boolean;
    photographe_galeriePriveTarif: number;
    photographe_retouchesPhoto: boolean;
    photographe_retouchesPhotoFormats: {
        name: string;
        tarifUnitaire: number;
    }[];
    photographe_remise: boolean;
    photographe_remiseFormats: {
        name: string;
        tarifUnitaire: number;
    }[];
    photographe_livraisonHauteResolution: boolean;
    photographe_livraisonHauteResolutionTarif: number;
}
export interface VideasteBooking {
    dureeMissionVideo?: number;
    duoVideo?: boolean;
    bandeAnnonce?: boolean;
    filmCourt?: boolean;
    filmLong?: boolean;
    courtMetrage?: boolean;
    videoAerienne?: boolean;
    etalonnageVideo?: boolean;
    livraisonOriginauxHauteResolutionVideo?: boolean;
    livraisonExpressVideo?: boolean;
    donneesDvdExamplairesVideo?: number;
    donneesDvdExamplairesVideoIsChecked?: boolean;
    donneesUsbExamplairesVideo?: number;
    donneesUsbExamplairesVideoIsChecked?: boolean;
}
export interface VideasteCriteresES {
    videaliste_styleDeVideo: string[];
    videaliste_appareils: string[];
    videaliste_objectifs: string[];
    videaliste_accessoires: string[];
    videaliste_tarif_horaire: number;
    videaliste_dureeDeReservationMinimum: number;
    videaliste_duoVideo: boolean;
    videaliste_duoVideoTarif: number;
    videaliste_delaisDeLivraisonJours: number;
    videaliste_livraisonExpress: boolean;
    videaliste_livraisonExpressTarif: number;
    videaliste_bandeAnnonce: boolean;
    videaliste_bandeAnnonceTarif: number;
    videaliste_filmCourt: boolean;
    videaliste_filmCourtTarif: number;
    videaliste_filmLong: boolean;
    videaliste_filmLongTarif: number;
    videaliste_courtMetrage: boolean;
    videaliste_courtMetrageTarif: number;
    videaliste_videoAerienne: boolean;
    videaliste_videoAerienneTarif: number;
    videaliste_etalonnageVideo: boolean;
    videaliste_etalonnageVideoTarif: number;
    videaliste_remise: boolean;
    videaliste_remiseFormats: {
        name: string;
        tarifUnitaire: number;
    }[];
    videaliste_livraisonOriginauxHauteResolution: boolean;
    videaliste_livraisonOriginauxHauteResolutionTarif: number;
}
export interface GateauMariageCriteresES {
    gateaumariage_tarif_horaire: number;
    gateaumariage_typesDeCreation: Array<string>;
    gateaumariage_gateaux: {
        type: string;
        value: boolean;
        livraison: {
            value: boolean;
            tarif: number;
        };
        options: Array<{
            field?: string;
            search?: string;
            value: boolean;
            name: string;
            label: string;
            opts: Array<{
                name: string;
                value: number;
                step: number;
                unit: string;
            }>;
        }>;
    };
}
export interface Gateau {
    name: string;
    value: boolean;
    label: string;
    nbrParts: number;
    nbrEtages: number;
}
export interface GateauMariageBooking {
    selected: boolean;
    livraison?: boolean;
    produits?: Gateau[];
}
export interface LieuBooking {
    selected: boolean;
    debutLocation?: {
        min: number;
        heure: number;
    };
    limiteHoraire?: {
        min: number;
        heure: number;
    };
    salleDeReception?: boolean;
    pisteDeDense?: boolean;
    chambrePourLesMariee?: boolean;
    cuisinePourLeTraiteur?: boolean;
    terrasse?: boolean;
    jardin?: boolean;
    chapiteau?: boolean;
    tente?: boolean;
    parking?: boolean;
    parkingNbrPlace?: number;
    hebergementInvites?: boolean;
    hebergementInvitesNbrDeNuits?: number;
    hebergementInvitesNbrInvites?: number;
    decoration?: boolean;
    vaiselleEtCouvert?: boolean;
    drapeDeTable?: boolean;
}
export interface LieuCriteresES {
    lieu_tarif_horaire: number;
    lieu_typeDeLieu: string;
    lieu_serviceTraiteur: boolean;
    lieu_lieuSansServiceTraiteur: boolean;
    lieu_serviceGateau: boolean;
    lieu_lieuSansServiceGateau: boolean;
    lieu_servicePhotographeVideaste: boolean;
    lieu_lieuSansServicePhotographeVideaste: boolean;
    lieu_serviceMusic: boolean;
    lieu_lieuSansServiceMusic: boolean;
    lieu_serviceDecoration: boolean;
    lieu_lieuSansServiceDecoration: boolean;
    lieu_capaciteInvites: number;
    lieu_typeReception: string[];
    lieu_utilisationDuLieu: string;
    lieu_configurationDeLaReception: string;
    lieu_situationGeographique: string;
    lieu_adaptabiliteMobiliteReduite: boolean;
    lieu_tarifHoraireLocation: number;
    lieu_debutLocation: {
        type: string;
        heures: number;
        min: number;
    };
    lieu_limiteHoraire: {
        type: string;
        heures: number;
        min: number;
        value: boolean;
    };
    lieu_pisteDeDense: boolean;
    lieu_pisteDeDenseSurface: number;
    lieu_salleDeReception: boolean;
    lieu_salleDeReceptionSurface: number;
    lieu_chambrePourLesMariee: boolean;
    lieu_chambrePourLesMarieeSurface: number;
    lieu_chambrePourLesMarieeInclusDansPrix: boolean;
    lieu_chambrePourLesMarieeTarif: number;
    lieu_cuisinePourLeTraiteur: boolean;
    lieu_cuisinePourLeTraiteurSurface: number;
    lieu_cuisinePourLeTraiteurInclusDansPrix: boolean;
    lieu_cuisinePourLeTraiteurTarif: number;
    lieu_terrasse: boolean;
    lieu_terrasseSurface: number;
    lieu_terrasseInclusDansPrix: boolean;
    lieu_terrasseTarif: number;
    lieu_jardin: boolean;
    lieu_jardinSurface: number;
    lieu_jardinInclusDansPrix: boolean;
    lieu_jardinTarif: number;
    lieu_chapiteau: boolean;
    lieu_chapiteauSurface: number;
    lieu_chapiteauInclusDansPrix: boolean;
    lieu_chapiteauTarif: number;
    lieu_parking: boolean;
    lieu_parkingSurface: number;
    lieu_parkingInclusDansPrix: boolean;
    lieu_parkingTarif: number;
    lieu_hebergementInvites: boolean;
    lieu_hebergementInvitesCapacite: number;
    lieu_hebergementInvitesTarif: number;
    lieu_decoration: boolean;
    lieu_decorationTarif: number;
    lieu_laviselleEtCouvert: boolean;
    lieu_laviselleEtCouvertTarif: number;
    lieu_drapeDeTable: boolean;
    lieu_drapeDeTableTarif: number;
}
export interface Objet {
    name: string;
    value: boolean;
    nbrPieces: number;
    label: string;
}
export interface TraiteurBooking {
    selected: boolean;
    serviceEnSalle?: boolean;
    serviceDebarrassageEtNettoyage?: boolean;
    droitDeBouchon?: boolean;
    droitDeBouchonNbrBouteilles?: number;
    vinHonneurCocktailBuffet?: {
        products: {
            name: string;
            options: Objet[];
        }[];
    };
    Dinner?: {
        products: {
            name: string;
            options: Objet[];
        }[];
    };
    boissonsAlcoolises?: Objet[];
    boissonsNonAlcoolises?: Objet[];
}
export interface TraiteurCriteresES {
    traiteur_tarif_horaire: number;
    traiteur_specialiteCuisine: string[];
    traiteur_niveauElaboration: string;
    traiteur_specificiteReligieuses: string;
    traiteur_vinHonneurCocktailBuffet: {
        type: string;
        value: boolean;
        quantity: number;
        products: Array<{
            name: string;
            options: Array<{
                field?: string;
                search?: string;
                value: boolean;
                name: string;
                label: string;
                tarif: number;
            }>;
        }>;
    };
    traiteur_Dinner: {
        type: string;
        value: boolean;
        dinerCapacite: number;
        convivesMin: number;
        products: Array<{
            name: string;
            options: Array<{
                field?: string;
                search?: string;
                value: boolean;
                name: string;
                label: string;
                tarif: number;
            }>;
        }>;
    };
    traiteur_droitDeBouchon: boolean;
    traiteur_sansDroitDeBouchon: boolean;
    traiteur_droitDeBouchonTarif: number;
    traiteur_boissonsAlcoolises: {
        type: string;
        options: Array<{
            field?: string;
            search?: string;
            value: boolean;
            name: string;
            label: string;
            tarif: number;
        }>;
    };
    traiteur_boissonsNonAlcoolises: {
        type: string;
        options: Array<{
            field?: string;
            search?: string;
            value: boolean;
            name: string;
            label: string;
            tarif: number;
        }>;
    };
    traiteur_serviceEnSalle: boolean;
    traiteur_serviceEnSalleTarif: number;
    traiteur_serviceDebarrassageEtNettoyage: boolean;
    traiteur_serviceDebarrassageEtNettoyageTarif: number;
    traiteur_boissonAlcooliseeEtNonAlcoolise: boolean;
}
export interface ComplexeObj {
    name: string;
    checked: boolean;
    quantity: number;
}
export interface MaquillageBooking {
    selected: boolean;
    maquillageNombre?: number;
    conseilsPersonnalises?: boolean;
    conseilsPersonnalisesDuree?: number;
    essais?: boolean;
    essaisNombre?: number;
    majorationTypeDePeau?: {
        name: string;
        checked: boolean;
    }[];
    produitsEtAccessoires?: ComplexeObj[];
    prestationInvitesProches?: {
        name: string;
        checked: boolean;
        options: {
            name: string;
            value: number;
        }[];
    }[];
}
export interface MaquillageCriteresES {
    maquillage_tarif_horaire: number;
    maquillage_conseilsPersonnalises: boolean;
    maquillage_conseilsPersonnalisesDuree: number;
    maquillage_conseilsPersonnalisesTarif: number;
    maquillage_essais: boolean;
    maquillage_essaisNombre: number;
    maquillage_essaisTarif: number;
    maquillage_majorationTypeDePeau: {
        type: string;
        value: boolean;
        options: {
            name: string;
            majoration: number;
            label: string;
        }[];
    };
    maquillage_produitsEtAccessoires: {
        type: string;
        value: boolean;
        options: {
            name: string;
            tarif: number;
            label: string;
            checked: boolean;
            field: string;
            search: string;
        }[];
    };
    maquillage_prestationInvitesProches: {
        type: string;
        value: boolean;
        capacite: number;
        prestations: {
            name: string;
            search: string;
            field: string;
            options: {
                name: string;
                tarif: number;
            }[];
        }[];
    };
    maquillage_maquillageNombre: number;
    maquillage_lieuRealisation: string[];
}
export interface SoinsBooking {
    selected: boolean;
    conseilsPersonnalises?: boolean;
    conseilsPersonnalisesDuree?: number;
    essais?: boolean;
    essaisNombre?: number;
    soins?: {
        name: string;
        checked: boolean;
        options: {
            name: string;
            value: number;
            checked: boolean;
        }[];
    }[];
    massage?: {
        name: string;
        checked: boolean;
        options: {
            name: string;
            value: number;
            checked: boolean;
        }[];
    }[];
}
export interface SoinsCriteresES {
    soins_tarif_horaire: number;
    soins_conseilsPersonnalises: boolean;
    soins_conseilsPersonnalisesDuree: number;
    soins_conseilsPersonnalisesTarif: number;
    soins_essais: boolean;
    soins_essaisNombre: number;
    soins_essaisTarif: number;
    soins_soins: {
        type: string;
        value: boolean;
        capacite: number;
        prestations: {
            name: string;
            search: string;
            field: string;
            options: {
                name: string;
                tarif: number;
            }[];
        }[];
    };
    soins_massage: {
        type: string;
        value: boolean;
        capacite: number;
        prestations: {
            name: string;
            search: string;
            field: string;
            options: {
                name: string;
                tarif: number;
            }[];
        }[];
    };
    soins_lieuRealisation: string[];
    soins_sexPraticien: string[];
}
export interface EsthetiqueBooking {
    selected: boolean;
    conseilsPersonnalises?: boolean;
    conseilsPersonnalisesDuree?: number;
    essais?: boolean;
    essaisNombre?: number;
    manucureEtpedicure?: {
        name: string;
        checked: boolean;
        options: {
            name: string;
            value: number;
            checked: boolean;
        }[];
    }[];
    epilation?: {
        name: string;
        checked: boolean;
        options: {
            name: string;
            value: number;
            checked: boolean;
        }[];
    }[];
}
export interface EsthetiqueCriteresES {
    esthetique_tarif_horaire: number;
    esthetique_conseilsPersonnalises: boolean;
    esthetique_conseilsPersonnalisesDuree: number;
    esthetique_conseilsPersonnalisesTarif: number;
    esthetique_essais: boolean;
    esthetique_essaisNombre: number;
    esthetique_essaisTarif: number;
    esthetique_manucureEtpedicure: {
        type: string;
        value: boolean;
        capacite: number;
        prestations: {
            name: string;
            search: string;
            field: string;
            options: {
                name: string;
                tarif: number;
            }[];
        }[];
    };
    esthetique_epilation: {
        type: string;
        value: boolean;
        capacite: number;
        prestations: {
            name: string;
            search: string;
            field: string;
            options: {
                name: string;
                tarif: number;
            }[];
        }[];
    };
    esthetique_lieuRealisation: string[];
    esthetique_sexPraticien: string[];
}
export interface CoiffureBooking {
    selected: boolean;
    coiffureNombre?: number;
    conseilsPersonnalises?: boolean;
    conseilsPersonnalisesDuree?: number;
    essais?: boolean;
    essaisNombre?: number;
    majorationTypeCheveux?: {
        name: string;
        checked: boolean;
    }[];
    produitsEtAccessoires?: ComplexeObj[];
    prestationInvitesProches?: {
        name: string;
        checked: boolean;
        options: {
            name: string;
            value: number;
        }[];
    }[];
}
export interface CoiffureCriteresES {
    coiffure_tarif_horaire: number;
    coiffure_coiffureNombre: number;
    coiffure_conseilsPersonnalises: boolean;
    coiffure_conseilsPersonnalisesDuree: number;
    coiffure_conseilsPersonnalisesTarif: number;
    coiffure_essais: boolean;
    coiffure_essaisNombre: number;
    coiffure_essaisTarif: number;
    coiffure_majorationTypeCheveux: {
        type: string;
        value: boolean;
        options: {
            name: string;
            majoration: number;
            label: string;
        }[];
    };
    coiffure_produitsEtAccessoires: {
        type: string;
        value: boolean;
        options: {
            name: string;
            tarif: number;
            label: string;
            checked: boolean;
            field: string;
            search: string;
        }[];
    };
    coiffure_prestationInvitesProches: {
        type: string;
        value: boolean;
        capacite: number;
        prestations: {
            name: string;
            search: string;
            field: string;
            options: {
                name: string;
                tarif: number;
            }[];
        }[];
    };
    coiffure_lieuRealisation: string[];
}
