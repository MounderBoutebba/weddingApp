"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Videaliste {
    constructor() {
        this.criteres = {
            styleDeVideo: [],
            appareilsVideo: [],
            objectifsVideo: [],
            accessoiresVideo: [],
            tarif_horaire: 80,
            dureeDeReservationMinimum: 1,
            duoVideo: false,
            duoVideoTarif: 1,
            delaisDeLivraisonJours: 20,
            livraisonExpress: false,
            livraisonExpressTarif: 1,
            bandeAnnonce: false,
            bandeAnnonceTarif: 1,
            filmCourt: false,
            filmCourtTarif: 1,
            filmLong: false,
            filmLongTarif: 1,
            courtMetrage: false,
            courtMetrageTarif: 1,
            videoAerienne: false,
            videoAerienneTarif: 1,
            etalonnageVideo: false,
            etalonnageVideoTarif: 1,
            remise: false,
            remiseFormats: [
                { name: 'DVD', tarifUnitaire: 1 },
                { name: 'Clé_USB', tarifUnitaire: 1 },
            ],
            livraisonOriginauxHauteResolution: false,
            livraisonOriginauxHauteResolutionTarif: 1,
        };
        this.label = 'videaliste';
        this.userid = '';
        this.location = { address: '', lat: 0, lng: 0 };
    }
}
exports.Videaliste = Videaliste;
//# sourceMappingURL=videaliste.model.js.map