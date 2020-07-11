import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
    name: 'companyLabel'
})

export class CompanyLabelPipe implements PipeTransform {
    constructor(private readonly translateService: TranslateService) { }
    transform(value: string): string {
        switch (value) {
            case 'duoPhotoTarif':
            case 'livraisonExpressTarif':
            case 'duoVideoTarif':
                return `Tarif du service`;
            case 'galeriePrive':
                return `Galerie Prive`;
            case 'brancheDeCotonQte':
            case 'bouleMetal8cmMulticoloreQte':
            case 'filDeLaitonQte':
            case 'mitsumataGrandQte':
            case 'rosesQte':
            case 'orchidesQte':
            case 'lysQte':
            case 'lotusQte':
            case 'lierreQte':
            case 'eucalyptusParvifoliaQte':
            case 'eucalyptusCinereaQte':
            case 'alchemilleQte':
            case 'nombreDeChambre':
                return this.translateService.instant(`quantity`);
            case 'debutLocation':
                return this.translateService.instant(`heure de début`);
            case 'limiteHoraire':
                return this.translateService.instant(`limite horaire`);
            case 'vinHonneurCocktailBuffetTarif':
            case 'quantiteCommande':
            case 'commandeMin':
                return this.translateService.instant(`minimal quantity`);
            case 'renaultDuree':
            case 'mercedesSprinterDuree':
            case 'ivecoBusUrbanwayDuree':
            case 'manLionCityDuree':
            case 'hummerH2Duree':
            case 'ferrari458ItaliaDuree':
            case 'mercedecesBenzClassG63AMGDuree':
            case 'bentleyS1Cabriolet1957Duree':
                return this.translateService.instant(`duration`);
            case 'weddingCakeTarifParPart':
            case 'nakedCakeTarifParPart':
            case 'vintageChicTarifParPart':
                return this.translateService.instant(`rate by part`);
            case 'fees per unity':
                return this.translateService.instant(`Tarif par unité`);
            case 'donneesSousDVDTarifUnitaire':
                return this.translateService.instant(`Tarif par unité (DVD)`);
            case 'donneesSousCleUSBTarifUnitaire':
                return this.translateService.instant(`Tarif par unité (USB)`);
            case 'weddingCakeNbrPartMin':
            case 'nakedCakeNbrPartMin':
            case 'vintageChicNbrPartMin':
                return this.translateService.instant(`min parts number`);
            case 'weddingCakeNbrPartMax':
            case 'nakedCakeNbrPartMax':
            case 'vintageChicNbrPartMax':
                return this.translateService.instant(`max parts number`);
            case 'weddingCakeNbrEtagesMax':
            case 'nakedCakeNbrEtagesMax':
            case 'vintageChicNbrEtagesMax':
                return this.translateService.instant(`max floors number`);
            case 'livraisonTarif':
            case 'chambrePourLesMarieeTarif':
            case 'cuisinePourLeTraiteurTarif':
            case 'terrasseTarif':
            case 'jardinTarif':
            case 'chapiteauTarif':
            case 'parkingTarif':
            case 'jongleriesDePivoinesRougesTarif':
            case 'archesDePlumeauxJaunesTarif':
            case 'envoleeDePapillonsTarif':
            case 'batailleDePlumetsBlancsEtCroisillonsTopazeTarif':
            case 'eventailDeGerbesOrTarif':
            case 'rideauxEtoilePoussiereOrTarif':
            case 'tourbillonsSpiraleArgentTarif':
            case 'fontainesOrACascadeDeSaphirTarif':
            case 'plumetsFilamentsNacresTarif':
            case 'bouquetCroisementOrangeTarif':
            case 'coeurRougeTarif':
            case 'pluieScintillanteTarif':
            case 'roseauxAMosaiqueTarif':
            case 'sequencesEffetsTarif':
            case 'palmiersCoiffesTarif':
            case 'elevationCraquanteTarif':
            case 'rideauxPoussiereEmeraudeTarif':
            case 'lettreOuChiffreDeFeuTarif':
            case 'jongleriesDePalmiersOrTarif':
            case 'lanceursDeCoeurBlancOuRougeTarif':
            case 'tableauxDeFontainesTarif':
            case 'facadeDeChandellesTarif':
            case 'tableauxMajestueuxTarif':
            case 'couleursIntensesTarif':
            case 'facadeDeGerbeTarif':
            case 'tableauxAeriensTarif':
            case 'bouquetSpectaculaireTarif':
            case 'miseEnSceneTarif':
            case 'produitsPyrotechniquesTarif':
            case 'bouquetFinalTarif':
            case 'machineAFumeeLourdeTarif':
            case 'machineBullesGeantTarif':
            case 'assuranceTarif':
            case 'sonorisationTarif':
            case 'assuranceTarif':
            case 'chauffeurTarif':
            case 'carburantTarif':
            case 'livraisonTarif':
            case 'decorationDeLaSalleTarif':
            case 'centreDeTableTarif':
            case 'buffetsTarif':
            case 'espaceLoungeTarif':
            case 'espaceJeuxTarif':
            case 'fleursEtCompositionTarif':
            case 'archesTarif':
            case 'tonelleTarif':
            case 'drapesTarif':
            case 'espacePhotoTarif':
            case 'chapiteauTarif':
            case 'tableSignatureTarif':
            case 'signaletiqueTarif':
            case 'planDeTableTarif':
            case 'livraisonDuMaterielTarif':
            case 'montageDemontageTarif':
            case 'creationChoregraphieTarif':
            case 'creationBandeMusicaleTarif':
            case 'correctionsADistanceTarif':
            case 'conseilsSurLesTenuesAdapteesTarif':
            case 'reequilibrageAlimentaireTarif':
            case 'remiseEnFormeTarif':
            case 'perteDeLaMasseGraisseuseTarif':
            case 'priseDeMusclesInclusDansPrix':
            case 'officierLaCeremonieLaiqueAvecRituelTarif':
            case 'officierLaCeremonieLaiqueSansRituelTarif':
            case 'orchestrerLaDureeEtLeTimingTarif':
            case 'creationDuTexteMariesTarif':
            case 'creationDuTexteIntervenantsTarif':
            case 'organisationDesEntreesEtSortiesDeLaCeremonieTarif':
            case 'editionDeLaPlaylistMusicaleTarif':
            case 'priseDeMusclesTarif':
            case 'doreTarif':
            case 'argenteTarif':
            case 'cuivreTarif':
            case 'doreTarif':
            case 'wifiTarif':
            case 'navetteAeroportTarif':
            case 'serviceAutobusTarif':
            case 'serviceEnChambreTarif':
            case 'coupeDeChampagneDeBienvenuTarif':
            case 'livraisonHauteResolutionTarif':
            case 'livraisonOriginauxHauteResolutionTarif':
            case 'photomatonTarifUnique':
            case 'photocallTraifUnique':
            case 'galeriePriveTarif':
            case 'bandeAnnonceTarif':
            case 'filmCourtTarif':
            case 'filmLongTarif':
            case 'courtMetrageTarif':
            case 'videoAerienneTarif':
            case 'etalonnageVideoTarif':
                return this.translateService.instant(`option's fees`);
            case 'tarifParChambre':
                return this.translateService.instant(`fees per room`);
            case 'tarifHoraireLocation':
                return this.translateService.instant(`Tarif de location`);
            case 'heureMinDeDebutLocation':
                return this.translateService.instant(`Heure de début`);
            case 'tarifParPersonne':
            case 'petitDejeunerTarif':
            case 'dejeunerTarif':
            case 'dinerTarif':
            case 'parkingTarif':
            case 'baladeAChevalTarif':
            case 'croisiereEnBateauTarif':
            case 'plongeeTarif':
            case 'massageTarif':
            case 'baladeEnKayakTarif':
            case 'locationEnJetSkiTarif':
                return this.translateService.instant(`fees per person`);
            case 'hebergementInvitesCapacite':
                return this.translateService.instant(`accommodation capacity`);
            case 'hebergementInvitesTarif':
                return this.translateService.instant(`Tarif/Pers./Nuit`);
            case 'essaisTarif':
                return this.translateService.instant(`fees per essay`);
            case 'limiteHoraireDuree':
                return this.translateService.instant(`time limit`);
            case 'prestationInvitesProchesCapacite':
                return this.translateService.instant(`maximum guests' capacity`);
            case 'ranaultTraficCapacite':
            case 'mercedesSprinterCityCapacite':
                return this.translateService.instant(`number of places`);
            case 'manucurePedicureCapacite':
            case 'epilationCapacite':
            case 'soinsCapacite':
            case 'massageCapacite':
                return this.translateService.instant(`maximum interventions' capacity`);
            case 'salleDeReceptionSurface':
            case 'pisteDeDenseSurface':
            case 'chambrePourLesMarieeSurface':
            case 'cuisinePourLeTraiteurSurface':
            case 'terrasseSurface':
            case 'jardinSurface':
            case 'chapiteauSurface':
            case 'parkingSurface':
                return this.translateService.instant(`surface (m²)`);
            case 'decorationTarif':
            case 'laviselleEtCouvertTarif':
            case 'drapeDeTableTarif':
            case 'magieTarif':
            case 'clownTarif':
            case 'dessinTarif':
            case 'danseTarif':
            case 'marionnettisteTarif':
            case 'atelierArtistiqueTarif':
            case 'slupteurDeBallonsTarif':
            case 'maquillageTarif':
            case 'structureGonflableTarif':
            case 'pereNoelTarif':
            case 'compteurTarif':
            case 'spectacleCompletAvecDecorTarif':
            case 'tarif':
                return this.translateService.instant(`fees`);
            case 'tarif_horaire':
                return this.translateService.instant(`fees`);
            case 'conseilsPersonnalisesTarif':
            case 'conseilPersonalisesTarif':
                return this.translateService.instant(`fees per hour`);
            case 'tarifHoraire':
            case 'seanceEngagementDureeMinimumTarifHoraire':
            case 'seanceBrunchOuDejeunerDureeMinimumTarifHoraire':
            case 'seanceApresMariageDureeMinimumTarifHoraire':
                return `Tarif horaire`;
            case 'dinerCapacite':
                return this.translateService.instant(`service capacity`);
            case 'convivesMin':
                return this.translateService.instant(`minimal guests`);
            case 'normandTarif':
            case 'bretonTarif':
            case 'miniCannelesTarif':
            case 'miniEclairsTarif':
            case 'terrineDeSaumonTarif':
            case 'medaillonDeSurimiAuxPetitsLegumesTarif':
            case 'jarretAgneauTarif':
            case 'dosCabillaudTarif':
            case 'trioDeLegumeTarif':
            case 'gratinDauphinoisTarif':
            case 'brieTarif':
            case 'fourmeAmbertTarif':
            case 'tarteletteAuFraisesTarif':
            case 'scintillantAuChocolatTarif':
            case 'vinRougeChateauLagrange2016Tarif':
            case 'vinBlancChateauHauteMayneGravesBlanc2016Tarif':
            case 'jusOrangeTarif':
            case 'cocaColaTarif':
            case 'boucheesMiniTarif':
            case 'boucheesCanapeTarif':
            case 'painPanettoneTomatesTarif':
            case 'painPanettoneThonTarif':
            case 'painPanettoneRicottaTarif':
            case 'FocacciasCaviarTarif':
            case 'tartelettesHoumousTarif':
            case 'verrinesCarotteTarif':
            case 'verrinesFromageTarif':
            case 'navettesTruiteTarif':
            case 'navettesJambonTarif':
            case 'scandinaveFromageTarif':
            case 'scandinavePoissonTarif':
            case 'CanapesTortillasTarif':
            case 'CanapesGougeresTarif':
            case 'verrinesMousseTarif':
            case 'verrineTiramisuTarif':
            case 'verrineMousselineTarif':
            case 'pagnoteGaufrettesTarif':
            case 'macaronsTarif':
            case 'chouquettesTarif':
            case 'miniMuffinsTarif':
            case 'miniTartletteTarif':
            case 'croustillantAmandeTarif':
            case 'mirlitonsTarif':
            case 'assortimentFruitsTarif':
            case 'tranchesSaumonTarif':
            case 'aspergesVertesTarif':
            case 'foieGrasTarif':
            case 'PateEnCroûteTarif':
            case 'portionDeCruditeTarif':
            case 'farandolesDeFruitsTarif':
            case 'demiLangousteTarif':
            case 'blanquetteDeVeauTarif':
            case 'paveDeSaumonTarif':
            case 'coqAuVinTarif':
            case 'ConfitCanardTarif':
            case 'couscousTarif':
            case 'jambonRotiTarif':
            case 'pommesDeTerresSauteesTarif':
            case 'haricotsSautesTarif':
            case 'cantalTarif':
            case 'saintNectaireTarif':
            case 'roquefortTarif':
            case 'bleuTarif':
            case 'framboisierVanilleTarif':
            case 'tarteletteCremeuseTarif':
            case 'blancMangerTarif':
            case 'tarteCitronTarif':
            case 'flanPatissierTarif':
            case 'gateauBasqueTarif':
            case 'gateauAuChocolatTarif':
            case 'briocheSurpriseTarif':
            case 'domaineDuParadisTarif':
            case 'champagneGhTarif':
            case 'whiskyAbderlorTarif':
            case 'iceTeaTarif':
            case 'sanPellegrinoTarif':
            case 'perrierTarif':
            case 'evianTarif':
            case 'christalineTarif':
            case 'serviceEnSalleTarif':
            case 'ballonsPrix':
            case 'lanternesPrix':
            case 'colombesPrix':
            case 'papillonsPrix':
                return this.translateService.instant(`unit price`);
            case 'animateurTarif':
            case 'karaokeTarif':
            case 'derboukaTarif':
            case 'danseursTarif':
            case 'chanteursTarif':
            case 'deguisementsTarif':
            case 'machineFummeeTarif':
            case 'jeuxDeLumiereTarif':
            case 'lasersTarif':
            case 'videoProjecteurTarif':
                return this.translateService.instant(`fees`);
            case 'heureMinDeDebut':
                return this.translateService.instant(`min hour to start`);
            case 'nombreIntervenants':
                return this.translateService.instant(`speakers number`);
            case 'dureeReservationMin':
            case 'dureeDeReservation':
            case 'dureeDeReservationMinimum':
            case 'dureeMin':
            case 'seanceEngagementDureeMinimum':
            case 'seanceBrunchOuDejeunerDureeMinimum':
            case 'seanceApresMariageDureeMinimum':
                return this.translateService.instant(`minimal duration`);
            case 'nombreEnfantsParIntervenant':
                return this.translateService.instant(`number of children`);
            case 'droitDeBouchonTarif':
                return this.translateService.instant(`Tarif par bouteille`);
            default:
                return value;
        }
    }
}
