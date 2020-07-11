"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const company_service_1 = require("../company/company.service");
const users_service_1 = require("../users/users.service");
const reservations_service_1 = require("../../infrastructure/databases/reservations/reservations.service");
const entities_1 = require("../../infrastructure/databases/entities");
const reservation_entity_1 = require("../../infrastructure/databases/entities/reservation.entity");
const date_fns_1 = require("date-fns");
const lodash_1 = require("lodash");
const reservationsIndex_model_1 = require("../../infrastructure/databases/entities/reservationsIndex.model");
const axios_1 = require("axios");
const notifications_service_1 = require("../notifications/notifications.service");
const email_service_1 = require("../../global/services/mail/email.service");
let BookingService = class BookingService {
    constructor(companyService, usersService, reservationsService, notificationsService, emailService) {
        this.companyService = companyService;
        this.usersService = usersService;
        this.reservationsService = reservationsService;
        this.notificationsService = notificationsService;
        this.emailService = emailService;
    }
    async createBooking(order, client) {
        let user;
        let company;
        let proUserES;
        try {
            user = await this.usersService.findUser(order.userId);
            company = await this.companyService.getCompany(user.email);
            proUserES = await this.reservationsService.getCompany(order.userId);
        }
        catch (e) {
            throw new common_1.NotFoundException();
        }
        const reservation = new reservation_entity_1.ReservationEntity();
        reservation.client = client;
        reservation.company = company;
        reservation.start = new Date(order.start);
        reservation.end = new Date(order.end);
        reservation.categories = order.categories;
        reservation.order = order.order;
        reservation.guestcount = order.order.guestsNumber;
        reservation.location = order.location;
        const data = await this.calculateTotalPrice(proUserES, reservation);
        reservation.totalPrice = data.total;
        reservation.finalPrice = data.final;
        reservation.bill = data.bill;
        reservation.variations = data.variations;
        try {
            const res = await this.reservationsService.createReservation(reservation);
            const content = `Vous avez une nouvelle demande de reservation`;
            await this.notificationsService.createNotification({
                content,
                url: '/user/reservation/validate-client-requests',
                userId: user.id
            });
            await this.emailService.sendMmail(content, user.email);
            return res;
        }
        catch (e) {
            throw new common_1.ConflictException();
        }
    }
    async calculateTotalPrice(proUserES, reservation) {
        var _a, _b, _c, _d, _e, _f, _g;
        let bills = {
            total: 0,
            final: 0,
            bill: [],
            variations: []
        };
        if (reservation.categories.includes('photographe')) {
            const photographeStuff = await this.calculatePhotographePrice(reservation.order, proUserES.criteres);
            bills = {
                total: bills.total + photographeStuff.total,
                final: bills.final,
                bill: [...bills.bill, ...photographeStuff.bill],
                variations: [...bills.variations]
            };
        }
        if (reservation.categories.includes('videaliste')) {
            const videasteStuff = await this.calculateVideastePrice(reservation.order, proUserES.criteres);
            bills = {
                total: bills.total + videasteStuff.total,
                final: bills.final,
                bill: [...bills.bill, ...videasteStuff.bill],
                variations: [...bills.variations]
            };
        }
        if (reservation.categories.includes('gateaumariage')) {
            const gateauMariageStuff = await this.calculateGateauMariagePrice(reservation.order, proUserES.criteres);
            bills = {
                total: bills.total + gateauMariageStuff.total,
                final: bills.final,
                bill: [...bills.bill, ...gateauMariageStuff.bill],
                variations: [...bills.variations]
            };
        }
        if (reservation.categories.includes('lieu')) {
            const lieuStuff = await this.calculateLieuPrice(reservation.order, proUserES.criteres);
            bills = {
                total: bills.total + lieuStuff.total,
                final: bills.final,
                bill: [...bills.bill, ...lieuStuff.bill],
                variations: [...bills.variations]
            };
        }
        if (reservation.categories.includes('traiteur')) {
            const traiteurStuff = await this.calculateTraiteurPrice(reservation.order, proUserES.criteres);
            bills = {
                total: bills.total + traiteurStuff.total,
                final: bills.final,
                bill: [...bills.bill, ...traiteurStuff.bill],
                variations: [...bills.variations]
            };
        }
        if (reservation.categories.includes('maquillage')) {
            const maquillageStuff = await this.calculateMaquillagePrice(reservation.order, proUserES.criteres);
            bills = {
                total: bills.total + maquillageStuff.total,
                final: bills.final,
                bill: [...bills.bill, ...maquillageStuff.bill],
                variations: [...bills.variations]
            };
        }
        if (reservation.categories.includes('soins')) {
            const soinsStuff = await this.calculateSoinsPrice(reservation.order, proUserES.criteres);
            bills = {
                total: bills.total + soinsStuff.total,
                final: bills.final,
                bill: [...bills.bill, ...soinsStuff.bill],
                variations: [...bills.variations]
            };
        }
        if (reservation.categories.includes('coiffure')) {
            const coiffureStuff = await this.calculateCoiffurePrice(reservation.order, proUserES.criteres);
            bills = {
                total: bills.total + coiffureStuff.total,
                final: bills.final,
                bill: [...bills.bill, ...coiffureStuff.bill],
                variations: [...bills.variations]
            };
        }
        if (reservation.categories.includes('esthetique')) {
            const esthetiqueStuff = await this.calculateEsthetiquePrice(reservation.order, proUserES.criteres);
            bills = {
                total: bills.total + esthetiqueStuff.total,
                final: bills.final,
                bill: [...bills.bill, ...esthetiqueStuff.bill],
                variations: [...bills.variations]
            };
        }
        if (((_b = (_a = reservation.order.bookingObj) === null || _a === void 0 ? void 0 : _a.optionDivers) === null || _b === void 0 ? void 0 : _b.length) > 0) {
            const optionDivers = await this.calculateOptionDiversPrice(reservation.order, proUserES.options, reservation.categories);
            bills = {
                total: bills.total + optionDivers.total,
                final: bills.final,
                bill: [...bills.bill, ...optionDivers.bill],
                variations: [...bills.variations]
            };
        }
        if (((_e = (_d = (_c = reservation) === null || _c === void 0 ? void 0 : _c.location) === null || _d === void 0 ? void 0 : _d.address) === null || _e === void 0 ? void 0 : _e.length) > 0) {
            const travelDistance = await this.calculateFraisDeplacementPrice(reservation, proUserES);
            bills = {
                total: bills.total + travelDistance.total,
                final: bills.final,
                bill: [...bills.bill, ...travelDistance.bill],
                variations: [...bills.variations]
            };
        }
        if (!((_g = (_f = proUserES) === null || _f === void 0 ? void 0 : _f.variationPeriode) === null || _g === void 0 ? void 0 : _g.length)) {
            proUserES.variationPeriode = [];
        }
        const totalDays = date_fns_1.differenceInDays(reservation.end, reservation.start) + 1;
        const totalOneDay = bills.total / totalDays;
        let appliedVariations = new Set();
        const variations = date_fns_1.eachDayOfInterval({ start: reservation.start, end: reservation.end }).map(date => {
            var _a, _b;
            let augmentation = 0;
            let inPeriode = false;
            (_b = (_a = proUserES) === null || _a === void 0 ? void 0 : _a.variationPeriode) === null || _b === void 0 ? void 0 : _b.map(periode => {
                periode.periodStartDate = new Date(periode.periodStartDate);
                periode.periodEndDate = new Date(periode.periodEndDate);
                if (periode.autoApplication) {
                    const currentYear = new Date(Date.now()).getFullYear();
                    periode.periodEndDate = new Date(periode.periodEndDate.setFullYear(currentYear));
                    periode.periodStartDate = new Date(periode.periodStartDate.setFullYear(currentYear));
                }
                if (date_fns_1.isWithinInterval(date, { start: periode.periodStartDate, end: periode.periodEndDate })) {
                    inPeriode = true;
                    if (date_fns_1.isWeekend(date)) {
                        augmentation = periode.increaseWeekend;
                        if (augmentation > 0) {
                            appliedVariations.add({
                                name: `Majoration période weekend`,
                                start: periode.periodStartDate,
                                end: periode.periodEndDate,
                                basePrice: totalOneDay,
                                type: reservationsIndex_model_1.VariationTypes.WEEKEND_PERIODE,
                                increase: augmentation
                            });
                        }
                    }
                    else {
                        augmentation = periode.increaseWeek;
                        if (augmentation > 0) {
                            appliedVariations.add({
                                name: `Majoration période`,
                                start: periode.periodStartDate,
                                end: periode.periodEndDate,
                                basePrice: totalOneDay,
                                type: reservationsIndex_model_1.VariationTypes.WEEK_PERIODE,
                                increase: augmentation
                            });
                        }
                    }
                }
            });
            if (!inPeriode) {
                if (date_fns_1.isWeekend(date)) {
                    augmentation = proUserES.weekendVariationPercentage;
                    if (augmentation > 0) {
                        appliedVariations.add({
                            name: `Majoration weekend`,
                            type: reservationsIndex_model_1.VariationTypes.WEEKEND,
                            basePrice: totalOneDay,
                            increase: augmentation
                        });
                    }
                }
                else {
                    augmentation = 0;
                }
            }
            return augmentation;
        });
        const duplicated = [...appliedVariations];
        appliedVariations = lodash_1.uniqWith([...appliedVariations], lodash_1.isEqual);
        appliedVariations = appliedVariations.map(variation => {
            let count = 0;
            const array = duplicated.filter(elm => elm.type === variation.type && elm.start === variation.start);
            count = array.length;
            variation.days = count;
            variation.augmentedPrice = count * ((variation.basePrice * variation.increase) / 100);
            return Object.assign({}, variation);
        });
        bills.final = variations
            .map((pourcentage) => totalOneDay + totalOneDay * (pourcentage / 100))
            .reduce((acc, val) => acc + val, 0);
        bills.variations = appliedVariations;
        return bills;
    }
    async deleteBooking(id, user) {
        const reservation = await this.reservationsService.findReservation(id);
        if (reservation.client.id === user.id) {
            return await this.reservationsService.deleteReservation(reservation);
        }
        else {
            throw new common_1.ForbiddenException();
        }
    }
    async updateBooking(id, order) {
        return await this.reservationsService.updateReservation(order, id);
    }
    async findReservation(id) {
        return await this.reservationsService.findReservation(id);
    }
    async findAllBookings(query, page) {
        const reservations = await this.reservationsService.searchES(query, page);
        return reservations;
    }
    async findBooking(id) {
        return await this.reservationsService.findES(id);
    }
    async findBookingPsql(id) {
        const reservation = await this.reservationsService.findReservation(id);
        return reservation;
    }
    async calculatePhotographePrice(order, criteres) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;
        let total = 0;
        const bill = new Set();
        const categorie = 'photographe';
        if (!!((_a = order.bookingObj.photographe) === null || _a === void 0 ? void 0 : _a.dureeMissionPhoto)) {
            const qte = order.bookingObj.photographe.dureeMissionPhoto;
            const unitPrice = criteres.photographe_tarif_horaire;
            const totalOption = qte * unitPrice;
            bill.add({
                option: 'Durée de la mission (photos)',
                qte,
                unitPrice,
                total: totalOption,
                categorie,
                unit: 'H'
            });
            total = total + totalOption;
        }
        if (!!((_b = order.bookingObj.photographe) === null || _b === void 0 ? void 0 : _b.duoPhoto)) {
            const unitPrice = criteres.photographe_duoPhotoTarif;
            const totalOption = unitPrice;
            bill.add({ option: 'Duo photo', qte: 1, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_c = order.bookingObj.photographe) === null || _c === void 0 ? void 0 : _c.photomaton)) {
            const unitPrice = criteres.photographe_photomatonTarifUnique;
            const totalOption = unitPrice;
            bill.add({ option: 'Photomaton', qte: 1, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_d = order.bookingObj.photographe) === null || _d === void 0 ? void 0 : _d.photocall)) {
            const unitPrice = criteres.photographe_photocallTraifUnique;
            const totalOption = unitPrice;
            bill.add({ option: 'Photocall', qte: 1, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_e = order.bookingObj.photographe) === null || _e === void 0 ? void 0 : _e.livraisonHauteResolutionPhoto)) {
            const unitPrice = criteres.photographe_livraisonHauteResolutionTarif;
            const totalOption = unitPrice;
            bill.add({
                option: 'Livraison haute résolution (photos)',
                qte: 1,
                unitPrice,
                total: totalOption,
                categorie
            });
            total = total + totalOption;
        }
        if (!!((_f = order.bookingObj.photographe) === null || _f === void 0 ? void 0 : _f.galeriePrive)) {
            const unitPrice = criteres.photographe_galeriePriveTarif;
            const totalOption = unitPrice;
            bill.add({ option: 'Galerie privé (photos)', qte: 1, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_g = order.bookingObj.photographe) === null || _g === void 0 ? void 0 : _g.dureeMissionSeanceEngagement)) {
            const unitPrice = criteres.photographe_seanceEngagementDureeMinimumTarifHoraire;
            const qte = (_h = order.bookingObj.photographe) === null || _h === void 0 ? void 0 : _h.dureeMissionSeanceEngagement;
            const totalOption = unitPrice * qte;
            bill.add({
                option: 'Durée mission séance engagement (photos)',
                qte,
                unitPrice,
                total: totalOption,
                qteUnit: 'H',
                categorie
            });
            total = total + totalOption;
        }
        if (!!((_j = order.bookingObj.photographe) === null || _j === void 0 ? void 0 : _j.dureeMissionSeanceBrunchOuDejeuner)) {
            const unitPrice = criteres.photographe_seanceBrunchOuDejeunerDureeMinimumTarifHoraire;
            const qte = (_k = order.bookingObj.photographe) === null || _k === void 0 ? void 0 : _k.dureeMissionSeanceBrunchOuDejeuner;
            const totalOption = unitPrice * qte;
            bill.add({
                option: 'Séance brunch déjeuner (photos)',
                qte,
                unitPrice,
                total: totalOption,
                qteUnit: 'H',
                categorie
            });
            total = total + totalOption;
        }
        if (!!((_l = order.bookingObj.photographe) === null || _l === void 0 ? void 0 : _l.dureeMissionSeanceApresMariage)) {
            const unitPrice = criteres.photographe_seanceApresMariageDureeMinimumTarifHoraire;
            const qte = (_m = order.bookingObj.photographe) === null || _m === void 0 ? void 0 : _m.dureeMissionSeanceApresMariage;
            const totalOption = unitPrice * qte;
            bill.add({
                option: 'Séance après mariage (photos)',
                qte,
                unitPrice,
                total: totalOption,
                qteUnit: 'H',
                categorie
            });
            total = total + totalOption;
        }
        if (!!((_o = order.bookingObj.photographe) === null || _o === void 0 ? void 0 : _o.donneesDvdExamplairesPhoto)) {
            const index = criteres.photographe_remiseFormats.findIndex(element => element.name === 'DVD');
            const unitPrice = criteres.photographe_remiseFormats[index].tarifUnitaire;
            const qte = (_p = order.bookingObj.photographe) === null || _p === void 0 ? void 0 : _p.donneesDvdExamplairesPhoto;
            const totalOption = unitPrice * qte;
            bill.add({ option: 'Données sous dvd (photo)', qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_q = order.bookingObj.photographe) === null || _q === void 0 ? void 0 : _q.donneesUsbExamplairesPhoto)) {
            const index = criteres.photographe_remiseFormats.findIndex(element => element.name === 'Clé_USB');
            const unitPrice = criteres.photographe_remiseFormats[index].tarifUnitaire;
            const qte = (_r = order.bookingObj.photographe) === null || _r === void 0 ? void 0 : _r.donneesUsbExamplairesPhoto;
            const totalOption = unitPrice * qte;
            bill.add({ option: 'Données sous usb (photos)', qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_s = order.bookingObj.photographe) === null || _s === void 0 ? void 0 : _s.livraisonExpressPhoto)) {
            const unitPrice = criteres.photographe_livraisonHauteResolutionTarif;
            const qte = 1;
            const totalOption = unitPrice * qte;
            bill.add({ option: 'Livraison express (photos)', qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (((_u = (_t = order.bookingObj.photographe) === null || _t === void 0 ? void 0 : _t.tiragePapier) === null || _u === void 0 ? void 0 : _u.length) > 0) {
            let totalTiragePapier;
            const prices = (_v = order.bookingObj.photographe) === null || _v === void 0 ? void 0 : _v.tiragePapier.map(format => {
                var _a, _b;
                const formatCriteres = criteres.photographe_tiragePapier.formats.find(element => element.name === format.name);
                const qte = format.examplaire;
                let unitPrice = 0;
                let totalOption = 0;
                let model;
                if (qte >= 1 && qte < 10) {
                    model = formatCriteres.modeles.find(mod => mod.name === '1 à 9 tirages');
                    unitPrice = model.tarif;
                    totalOption = unitPrice * qte;
                }
                else if (qte >= 10 && qte < 20) {
                    model = formatCriteres.modeles.find(mod => mod.name === '10 à 19 tirages');
                    unitPrice = model.tarif;
                    totalOption = unitPrice * qte;
                }
                else if (qte >= 20 && qte < 50) {
                    model = formatCriteres.modeles.find(mod => mod.name === '20 à 49 tirages');
                    unitPrice = model.tarif;
                    totalOption = unitPrice * qte;
                }
                else if (qte >= 50 && qte < 100) {
                    model = formatCriteres.modeles.find(mod => mod.name === '50 à 99 tirages');
                    unitPrice = model.tarif;
                    totalOption = unitPrice * qte;
                }
                else if (qte >= 100 && qte < 200) {
                    model = formatCriteres.modeles.find(mod => mod.name === '100 à 199 tirages');
                    unitPrice = model.tarif;
                    totalOption = unitPrice * qte;
                }
                else if (qte >= 200 && qte < 500) {
                    model = formatCriteres.modeles.find(mod => mod.name === '200 à 499 tirages');
                    unitPrice = model.tarif;
                    totalOption = unitPrice * qte;
                }
                else if (qte >= 500 && qte < 1000) {
                    model = formatCriteres.modeles.find(mod => mod.name === '500 à 999 tirages');
                    unitPrice = model.tarif;
                    totalOption = unitPrice * qte;
                }
                else if (qte >= 1000) {
                    model = formatCriteres.modeles.find(mod => mod.name === '1000 tirages et plus');
                    unitPrice = model.tarif;
                    totalOption = unitPrice * qte;
                }
                const finition = [];
                if ((_a = order.bookingObj.photographe) === null || _a === void 0 ? void 0 : _a.tiragePapierFinitionBrillante) {
                    finition.push('Brillant');
                }
                if ((_b = order.bookingObj.photographe) === null || _b === void 0 ? void 0 : _b.tiragePapierFinitionMate) {
                    finition.push('Mate');
                }
                const finitionString = finition.join(' , ');
                bill.add({
                    option: `Tirage Papier (${formatCriteres.name}) (${finitionString}) (photos)`,
                    qte,
                    unitPrice,
                    total: totalOption,
                    categorie
                });
                return totalOption;
            });
            totalTiragePapier = prices.reduce((val, acc) => {
                return val + acc;
            }, 0);
            total = total + totalTiragePapier;
        }
        if (!!((_w = order.bookingObj.photographe) === null || _w === void 0 ? void 0 : _w.retouchesPhotoExamplaires)) {
            const qte = (_x = order.bookingObj.photographe) === null || _x === void 0 ? void 0 : _x.retouchesPhotoExamplaires;
            let unitPrice = 0;
            let format;
            if (qte >= 1 && qte < 10) {
                format = criteres.photographe_retouchesPhotoFormats.find(form => form.name === '1_à_9');
            }
            else if (qte >= 10 && qte < 20) {
                format = criteres.photographe_retouchesPhotoFormats.find(form => form.name === '10_à_19');
            }
            else if (qte >= 20 && qte < 50) {
                format = criteres.photographe_retouchesPhotoFormats.find(form => form.name === '20_à_49');
            }
            else if (qte >= 50 && qte < 100) {
                format = criteres.photographe_retouchesPhotoFormats.find(form => form.name === '50_à_99');
            }
            else if (qte >= 100 && qte < 200) {
                format = criteres.photographe_retouchesPhotoFormats.find(form => form.name === '100_à_199');
            }
            else if (qte >= 200 && qte < 500) {
                format = criteres.photographe_retouchesPhotoFormats.find(form => form.name === '200_à_499');
            }
            else if (qte >= 500 && qte < 1000) {
                format = criteres.photographe_retouchesPhotoFormats.find(form => form.name === '500_à_999');
            }
            else if (qte >= 1000) {
                format = criteres.photographe_retouchesPhotoFormats.find(form => form.name === '1000_et_plus');
            }
            unitPrice = format.tarifUnitaire;
            const totalOption = unitPrice * qte;
            bill.add({ option: `Retouches photos`, qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (((_0 = (_z = (_y = order.bookingObj) === null || _y === void 0 ? void 0 : _y.photographe) === null || _z === void 0 ? void 0 : _z.creationAlbum) === null || _0 === void 0 ? void 0 : _0.length) > 0) {
            const finition = [];
            if ((_1 = order.bookingObj) === null || _1 === void 0 ? void 0 : _1.photographe.creationAlbumFinitionMate) {
                finition.push('Mate');
            }
            if ((_2 = order.bookingObj) === null || _2 === void 0 ? void 0 : _2.photographe.creationAlbumFinitionBrillante) {
                finition.push('Brillant');
            }
            const finitionString = finition.join(' , ');
            (_3 = order.bookingObj) === null || _3 === void 0 ? void 0 : _3.photographe.creationAlbum.map(format => {
                const name = format.name;
                const formatCriteres = criteres.photographe_creationAlbum.formats.find(element => element.name === format.name);
                const models = format.modeles.filter(elm => elm.checked);
                models.map(model => {
                    const formatCriteresModel = formatCriteres.modeles.find(elm => elm.name === model.name);
                    const unitPrice = formatCriteresModel.tarif;
                    const qte = model.examplaire;
                    const totalModel = unitPrice * qte;
                    bill.add({
                        option: `Création album (${name}) (${model.name}) (${finitionString})`,
                        qte,
                        unitPrice,
                        total: totalModel,
                        categorie
                    });
                    total = totalModel + total;
                });
            });
        }
        return { total, bill, categorie };
    }
    async calculateVideastePrice(order, criteres) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        let total = 0;
        const bill = new Set();
        const categorie = 'videaliste';
        if (!!((_a = order.bookingObj.videaliste) === null || _a === void 0 ? void 0 : _a.donneesDvdExamplairesVideo)) {
            const index = criteres.videaliste_remiseFormats.findIndex(element => element.name === 'DVD');
            const unitPrice = criteres.videaliste_remiseFormats[index].tarifUnitaire;
            const qte = (_b = order.bookingObj.videaliste) === null || _b === void 0 ? void 0 : _b.donneesDvdExamplairesVideo;
            const totalOption = unitPrice * qte;
            bill.add({ option: 'Données sous dvd (vidéo)', qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_c = order.bookingObj.videaliste) === null || _c === void 0 ? void 0 : _c.donneesUsbExamplairesVideo)) {
            const index = criteres.videaliste_remiseFormats.findIndex(element => element.name === 'Clé_USB');
            const unitPrice = criteres.videaliste_remiseFormats[index].tarifUnitaire;
            const qte = (_d = order.bookingObj.videaliste) === null || _d === void 0 ? void 0 : _d.donneesUsbExamplairesVideo;
            const totalOption = unitPrice * qte;
            bill.add({ option: 'Données sous clé usb (vidéo)', qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_e = order.bookingObj.videaliste) === null || _e === void 0 ? void 0 : _e.bandeAnnonce)) {
            const qte = 1;
            const unitPrice = criteres.videaliste_bandeAnnonceTarif;
            const totalOption = qte * unitPrice;
            bill.add({ option: 'Bande annonce (vidéo)', qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_f = order.bookingObj.videaliste) === null || _f === void 0 ? void 0 : _f.dureeMissionVideo)) {
            const qte = (_g = order.bookingObj.videaliste) === null || _g === void 0 ? void 0 : _g.dureeMissionVideo;
            const unitPrice = criteres.videaliste_tarif_horaire;
            const totalOption = qte * unitPrice;
            bill.add({
                option: 'Durée de la mission (vidéo)',
                qte,
                unitPrice,
                total: totalOption,
                categorie,
                unit: 'H'
            });
            total = total + totalOption;
        }
        if (!!((_h = order.bookingObj.videaliste) === null || _h === void 0 ? void 0 : _h.courtMetrage)) {
            const qte = 1;
            const unitPrice = criteres.videaliste_courtMetrageTarif;
            const totalOption = qte * unitPrice;
            bill.add({ option: 'Court métrage', qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_j = order.bookingObj.videaliste) === null || _j === void 0 ? void 0 : _j.duoVideo)) {
            const qte = 1;
            const unitPrice = criteres.videaliste_duoVideoTarif;
            const totalOption = qte * unitPrice;
            bill.add({ option: 'Duo vidéo', qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_k = order.bookingObj.videaliste) === null || _k === void 0 ? void 0 : _k.etalonnageVideo)) {
            const qte = 1;
            const unitPrice = criteres.videaliste_etalonnageVideoTarif;
            const totalOption = qte * unitPrice;
            bill.add({ option: 'Étalonnage vidéo', qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_l = order.bookingObj.videaliste) === null || _l === void 0 ? void 0 : _l.filmCourt)) {
            const qte = 1;
            const unitPrice = criteres.videaliste_filmCourtTarif;
            const totalOption = qte * unitPrice;
            bill.add({ option: 'Film court', qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_m = order.bookingObj.videaliste) === null || _m === void 0 ? void 0 : _m.filmLong)) {
            const qte = 1;
            const unitPrice = criteres.videaliste_filmLongTarif;
            const totalOption = qte * unitPrice;
            bill.add({ option: 'Film long', qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_o = order.bookingObj.videaliste) === null || _o === void 0 ? void 0 : _o.livraisonExpressVideo)) {
            const qte = 1;
            const unitPrice = criteres.videaliste_livraisonExpressTarif;
            const totalOption = qte * unitPrice;
            bill.add({ option: 'Livraison express (vidéo)', qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_p = order.bookingObj.videaliste) === null || _p === void 0 ? void 0 : _p.livraisonOriginauxHauteResolutionVideo)) {
            const qte = 1;
            const unitPrice = criteres.videaliste_livraisonOriginauxHauteResolutionTarif;
            const totalOption = qte * unitPrice;
            bill.add({
                option: 'Livraison des originaux haute définition (vidéo)',
                qte,
                unitPrice,
                total: totalOption,
                categorie
            });
            total = total + totalOption;
        }
        if (!!((_q = order.bookingObj.videaliste) === null || _q === void 0 ? void 0 : _q.videoAerienne)) {
            const qte = 1;
            const unitPrice = criteres.videaliste_videoAerienneTarif;
            const totalOption = qte * unitPrice;
            bill.add({ option: 'Vidéo aérienne (Drone)', qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        return { total, bill, categorie };
    }
    async calculateGateauMariagePrice(order, criteres) {
        var _a, _b, _c, _d;
        let total = 0;
        const bill = new Set();
        const categorie = 'gateaumariage';
        if (criteres.gateaumariage_tarif_horaire) {
            const unitPrice = criteres.gateaumariage_tarif_horaire;
            const qte = 1;
            const totalOption = unitPrice * qte;
            bill.add({ option: `Tarif de location (Gateau)`, qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_a = order.bookingObj.gateau) === null || _a === void 0 ? void 0 : _a.livraison)) {
            const unitPrice = criteres.gateaumariage_gateaux.livraison.tarif;
            const qte = 1;
            const totalOption = unitPrice * qte;
            bill.add({ option: 'Livraison (Gâteau)', qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_c = (_b = order.bookingObj) === null || _b === void 0 ? void 0 : _b.gateau) === null || _c === void 0 ? void 0 : _c.produits)) {
            (_d = order.bookingObj.gateau) === null || _d === void 0 ? void 0 : _d.produits.map((produit) => {
                if (!!produit.value) {
                    const option = criteres.gateaumariage_gateaux.options.find(opt => opt.name === produit.name);
                    const unitPrice = option.opts.find(res => res.name === 'Tarif par part').value;
                    const qte = produit.nbrParts;
                    const totalOption = unitPrice * qte;
                    bill.add({ option: `${option.name} (Gâteau)`, qte, unitPrice, total: totalOption, categorie });
                    total = total + totalOption;
                }
            });
        }
        return { total, bill, categorie };
    }
    async calculateLieuPrice(order, criteres) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        let total = 0;
        const bill = new Set();
        const categorie = 'lieu';
        if ((!!order.bookingObj.lieu.debutLocation) && (!!order.bookingObj.lieu.limiteHoraire)) {
            const start = order.bookingObj.lieu.debutLocation;
            const end = order.bookingObj.lieu.limiteHoraire;
            const unitPrice = criteres.lieu_tarif_horaire;
            const qte = 1;
            const totalOption = unitPrice * qte;
            bill.add({
                option: `Tarif de location (Lieu) (${start.heure}:${start.min} - ${end.heure}:${end.min})`,
                qte,
                unitPrice,
                total: totalOption,
                categorie,
            });
            total = total + totalOption;
        }
        if (!!((_a = order.bookingObj) === null || _a === void 0 ? void 0 : _a.lieu.chambrePourLesMariee)) {
            const unitPrice = criteres.lieu_chambrePourLesMarieeTarif;
            const qte = 1;
            const totalOption = unitPrice * qte;
            bill.add({ option: `Chambre pour les mariés`, qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_b = order.bookingObj) === null || _b === void 0 ? void 0 : _b.lieu.cuisinePourLeTraiteur)) {
            const unitPrice = criteres.lieu_cuisinePourLeTraiteurTarif;
            const qte = 1;
            const totalOption = unitPrice * qte;
            bill.add({ option: `Cuisine pour le traiteur`, qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_c = order.bookingObj) === null || _c === void 0 ? void 0 : _c.lieu.terrasse)) {
            const unitPrice = criteres.lieu_terrasseTarif;
            const qte = 1;
            const totalOption = unitPrice * qte;
            bill.add({ option: `Terrasse`, qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_d = order.bookingObj) === null || _d === void 0 ? void 0 : _d.lieu.jardin)) {
            const unitPrice = criteres.lieu_jardinTarif;
            const qte = 1;
            const totalOption = unitPrice * qte;
            bill.add({ option: `Jardin`, qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_e = order.bookingObj) === null || _e === void 0 ? void 0 : _e.lieu.chapiteau)) {
            const unitPrice = criteres.lieu_chapiteauTarif;
            const qte = 1;
            const totalOption = unitPrice * qte;
            bill.add({ option: `Chapiteau`, qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_f = order.bookingObj) === null || _f === void 0 ? void 0 : _f.lieu.parking)) {
            const unitPrice = criteres.lieu_parkingTarif;
            const qte = 1;
            const totalOption = unitPrice * qte;
            bill.add({ option: `Parking x ${(_g = order.bookingObj) === null || _g === void 0 ? void 0 : _g.lieu.parkingNbrPlace}`, qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_h = order.bookingObj) === null || _h === void 0 ? void 0 : _h.lieu.hebergementInvites)) {
            const unitPrice = criteres.lieu_hebergementInvitesTarif;
            const qte = (_j = order.bookingObj) === null || _j === void 0 ? void 0 : _j.lieu.hebergementInvitesNbrInvites;
            const nuits = (_k = order.bookingObj) === null || _k === void 0 ? void 0 : _k.lieu.hebergementInvitesNbrDeNuits;
            const qteFinale = qte * nuits;
            const totalOption = unitPrice * qteFinale;
            bill.add({
                option: `Hébergement invités ( ${nuits} nuits)`,
                qte,
                unitPrice,
                total: totalOption,
                categorie,
                unit: 'invités'
            });
            total = total + totalOption;
        }
        if (!!((_l = order.bookingObj) === null || _l === void 0 ? void 0 : _l.lieu.decoration)) {
            const unitPrice = criteres.lieu_decorationTarif;
            const qte = 1;
            const totalOption = unitPrice * qte;
            bill.add({ option: `Décoration`, qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_m = order.bookingObj) === null || _m === void 0 ? void 0 : _m.lieu.vaiselleEtCouvert)) {
            const unitPrice = criteres.lieu_laviselleEtCouvertTarif;
            const qte = 1;
            const totalOption = unitPrice * qte;
            bill.add({ option: `Vaisselle et Couverts`, qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_o = order.bookingObj) === null || _o === void 0 ? void 0 : _o.lieu.drapeDeTable)) {
            const unitPrice = criteres.lieu_drapeDeTableTarif;
            const qte = 1;
            const totalOption = unitPrice * qte;
            bill.add({ option: `Drapé de table`, qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_p = order.bookingObj) === null || _p === void 0 ? void 0 : _p.lieu.salleDeReception)) {
            const unitPrice = 0;
            const qte = 1;
            const totalOption = unitPrice * qte;
            bill.add({ option: `Salle de réception`, inclus: true, qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_q = order.bookingObj) === null || _q === void 0 ? void 0 : _q.lieu.pisteDeDense)) {
            const unitPrice = 0;
            const qte = 1;
            const totalOption = unitPrice * qte;
            bill.add({ option: `Piste de danse`, inclus: true, qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        return { total, bill, categorie };
    }
    async calculateTraiteurPrice(order, criteres) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        let total = 0;
        const bill = new Set();
        const categorie = 'traiteur';
        if (criteres.traiteur_tarif_horaire) {
            const unitPrice = criteres.traiteur_tarif_horaire;
            const qte = 1;
            const totalOption = unitPrice * qte;
            bill.add({ option: `Tarif de location (Traiteur)`, qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_a = order.bookingObj) === null || _a === void 0 ? void 0 : _a.traiteur.droitDeBouchon) && !!((_b = order.bookingObj) === null || _b === void 0 ? void 0 : _b.traiteur.droitDeBouchonNbrBouteilles)) {
            const unitPrice = criteres.traiteur_droitDeBouchonTarif;
            const qte = (_c = order.bookingObj) === null || _c === void 0 ? void 0 : _c.traiteur.droitDeBouchonNbrBouteilles;
            const totalOption = unitPrice * qte;
            bill.add({ option: `Droit de bouchon`, qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_d = order.bookingObj) === null || _d === void 0 ? void 0 : _d.traiteur.serviceEnSalle)) {
            const unitPrice = criteres.traiteur_serviceEnSalleTarif;
            const qte = 1;
            const totalOption = unitPrice * qte;
            bill.add({ option: `Service en salle`, qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_e = order.bookingObj) === null || _e === void 0 ? void 0 : _e.traiteur.serviceDebarrassageEtNettoyage)) {
            const unitPrice = criteres.traiteur_serviceDebarrassageEtNettoyageTarif;
            const qte = 1;
            const totalOption = unitPrice * qte;
            bill.add({ option: `Service de débarrassage et nettoyage`, qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (((_g = (_f = order.bookingObj) === null || _f === void 0 ? void 0 : _f.traiteur.boissonsAlcoolises) === null || _g === void 0 ? void 0 : _g.length) > 0) {
            (_h = order.bookingObj) === null || _h === void 0 ? void 0 : _h.traiteur.boissonsAlcoolises.map((res) => {
                if (res.value) {
                    const option = criteres.traiteur_boissonsAlcoolises.options.find(op => op.name === res.name);
                    const unitPrice = option.tarif;
                    const qte = res.nbrPieces;
                    const totalOption = unitPrice * qte;
                    bill.add({ option: `${option.name}`, qte, unitPrice, total: totalOption, categorie });
                    total = total + totalOption;
                }
            });
        }
        if (((_k = (_j = order.bookingObj) === null || _j === void 0 ? void 0 : _j.traiteur.boissonsNonAlcoolises) === null || _k === void 0 ? void 0 : _k.length) > 0) {
            (_l = order.bookingObj) === null || _l === void 0 ? void 0 : _l.traiteur.boissonsNonAlcoolises.map((res) => {
                if (res.value) {
                    const option = criteres.traiteur_boissonsNonAlcoolises.options.find(op => op.name === res.name);
                    const unitPrice = option.tarif;
                    const qte = res.nbrPieces;
                    const totalOption = unitPrice * qte;
                    bill.add({ option: `${option.name}`, qte, unitPrice, total: totalOption, categorie });
                    total = total + totalOption;
                }
            });
        }
        if (((_o = (_m = order.bookingObj) === null || _m === void 0 ? void 0 : _m.traiteur.Dinner.products) === null || _o === void 0 ? void 0 : _o.length) > 0) {
            (_p = order.bookingObj) === null || _p === void 0 ? void 0 : _p.traiteur.Dinner.products.map((res) => {
                const products = criteres.traiteur_Dinner.products.find(prod => prod.name === res.name);
                res.options.map(opt => {
                    if (opt.value) {
                        const option = products.options.find(op => op.name === opt.name);
                        const unitPrice = option.tarif;
                        const qte = opt.nbrPieces;
                        const totalOption = unitPrice * qte;
                        bill.add({ option: `${option.name} ( ${products.name} )`, qte, unitPrice, total: totalOption, categorie });
                        total = total + totalOption;
                    }
                });
            });
        }
        if (((_r = (_q = order.bookingObj) === null || _q === void 0 ? void 0 : _q.traiteur.vinHonneurCocktailBuffet.products) === null || _r === void 0 ? void 0 : _r.length) > 0) {
            (_s = order.bookingObj) === null || _s === void 0 ? void 0 : _s.traiteur.vinHonneurCocktailBuffet.products.map((res) => {
                const products = criteres.traiteur_vinHonneurCocktailBuffet.products.find(prod => prod.name === res.name);
                res.options.map(opt => {
                    if (opt.value) {
                        const option = products.options.find(op => op.name === opt.name);
                        const unitPrice = option.tarif;
                        const qte = opt.nbrPieces;
                        const totalOption = unitPrice * qte;
                        bill.add({ option: `${option.name} ( ${products.name} )`, qte, unitPrice, total: totalOption, categorie });
                        total = total + totalOption;
                    }
                });
            });
        }
        return { total, bill, categorie };
    }
    async calculateMaquillagePrice(order, criteres) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        let total = 0;
        const bill = new Set();
        const categorie = 'maquillage';
        if (!!((_b = (_a = order.bookingObj) === null || _a === void 0 ? void 0 : _a.maquillage) === null || _b === void 0 ? void 0 : _b.maquillageNombre)) {
            const unitPrice = criteres.maquillage_tarif_horaire;
            const qte = (_c = order.bookingObj) === null || _c === void 0 ? void 0 : _c.maquillage.maquillageNombre;
            const totalOption = unitPrice * qte;
            bill.add({ option: `Nombre de maquillages`, qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_e = (_d = order.bookingObj) === null || _d === void 0 ? void 0 : _d.maquillage) === null || _e === void 0 ? void 0 : _e.conseilsPersonnalises)) {
            const unitPrice = criteres.maquillage_conseilsPersonnalisesTarif;
            const qte = (_g = (_f = order.bookingObj) === null || _f === void 0 ? void 0 : _f.maquillage) === null || _g === void 0 ? void 0 : _g.conseilsPersonnalisesDuree;
            const totalOption = unitPrice * qte;
            bill.add({ option: `Rendez-vous conseils (Maquillage)`, qte, unitPrice, total: totalOption, categorie, unit: 'H' });
            total = total + totalOption;
        }
        if (!!((_j = (_h = order.bookingObj) === null || _h === void 0 ? void 0 : _h.maquillage) === null || _j === void 0 ? void 0 : _j.essais)) {
            const unitPrice = criteres.maquillage_essaisTarif;
            const qte = (_l = (_k = order.bookingObj) === null || _k === void 0 ? void 0 : _k.maquillage) === null || _l === void 0 ? void 0 : _l.essaisNombre;
            const totalOption = unitPrice * qte;
            bill.add({ option: `Essais (Maquillage)`, qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_o = (_m = order.bookingObj) === null || _m === void 0 ? void 0 : _m.maquillage) === null || _o === void 0 ? void 0 : _o.majorationTypeDePeau)) {
            (_q = (_p = order.bookingObj) === null || _p === void 0 ? void 0 : _p.maquillage) === null || _q === void 0 ? void 0 : _q.majorationTypeDePeau.map(res => {
                if (res.checked) {
                    const option = criteres.maquillage_majorationTypeDePeau.options.find(opt => opt.name === res.name);
                    const unitPrice = option.majoration * 0.01 * criteres.maquillage_tarif_horaire;
                    const qte = 1;
                    const totalOption = unitPrice * qte;
                    bill.add({ option: `Majoration type de peau (${option.name}) (Maquillage)`, qte, unitPrice, total: totalOption, categorie });
                    total = total + totalOption;
                }
            });
        }
        if (((_t = (_s = (_r = order.bookingObj) === null || _r === void 0 ? void 0 : _r.maquillage) === null || _s === void 0 ? void 0 : _s.produitsEtAccessoires) === null || _t === void 0 ? void 0 : _t.length) > 0) {
            order.bookingObj.maquillage.produitsEtAccessoires.map(res => {
                if (res.checked) {
                    const option = criteres.maquillage_produitsEtAccessoires.options.find(opt => opt.name === res.name);
                    const unitPrice = option.tarif;
                    const qte = res.quantity;
                    const totalOption = unitPrice * qte;
                    bill.add({ option: ` Produits et Accessoires (${option.name}) (Maquillage)`, qte, unitPrice, total: totalOption, categorie });
                    total = total + totalOption;
                }
            });
        }
        if (((_w = (_v = (_u = order.bookingObj) === null || _u === void 0 ? void 0 : _u.maquillage) === null || _v === void 0 ? void 0 : _v.prestationInvitesProches) === null || _w === void 0 ? void 0 : _w.length) > 0) {
            order.bookingObj.maquillage.prestationInvitesProches.map(res => {
                if (res.checked) {
                    res.options.map(opts => {
                        criteres.maquillage_prestationInvitesProches.prestations.map(opt => {
                            const option = opt.options.find(o => o.name === opts.name);
                            const unitPrice = option.tarif;
                            const qte = opts.value;
                            const totalOption = unitPrice * qte;
                            bill.add({ option: ` Préstations pour les invités (${option.name})`, qte, unitPrice, total: totalOption, categorie });
                            total = total + totalOption;
                        });
                    });
                }
            });
        }
        return { total, bill, categorie };
    }
    async calculateSoinsPrice(order, criteres) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        let total = 0;
        const bill = new Set();
        const categorie = 'soins';
        if (criteres.soins_tarif_horaire) {
            const unitPrice = criteres.soins_tarif_horaire;
            const qte = 1;
            const totalOption = unitPrice * qte;
            bill.add({ option: `Tarif de location (Soins)`, qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_a = order.bookingObj) === null || _a === void 0 ? void 0 : _a.soins.conseilsPersonnalises)) {
            const unitPrice = criteres.soins_conseilsPersonnalisesTarif;
            const qte = (_b = order.bookingObj) === null || _b === void 0 ? void 0 : _b.soins.conseilsPersonnalisesDuree;
            const totalOption = unitPrice * qte;
            bill.add({ option: `Rendez-vous conseils (Soins)`, qte, unitPrice, total: totalOption, categorie, unit: 'H' });
            total = total + totalOption;
        }
        if (!!((_c = order.bookingObj) === null || _c === void 0 ? void 0 : _c.soins.essais)) {
            const unitPrice = criteres.soins_essaisTarif;
            const qte = (_d = order.bookingObj) === null || _d === void 0 ? void 0 : _d.soins.essaisNombre;
            const totalOption = unitPrice * qte;
            bill.add({ option: `Essais (Soins)`, qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (((_g = (_f = (_e = order.bookingObj) === null || _e === void 0 ? void 0 : _e.soins) === null || _f === void 0 ? void 0 : _f.soins) === null || _g === void 0 ? void 0 : _g.length) > 0) {
            order.bookingObj.soins.soins.map(bookingRes => {
                if (bookingRes.checked) {
                    const prestations = criteres.soins_soins.prestations.find(opt => opt.name === bookingRes.name);
                    bookingRes.options.map(opt => {
                        if (opt.checked) {
                            const option = prestations.options.find(o => o.name === opt.name);
                            const unitPrice = option.tarif;
                            const qte = opt.value;
                            const totalOption = unitPrice * qte;
                            bill.add({ option: `Soins ${prestations.name} (${opt.name}) (Soins)`, qte, unitPrice, total: totalOption, categorie });
                            total = total + totalOption;
                        }
                    });
                }
            });
        }
        if (((_k = (_j = (_h = order.bookingObj) === null || _h === void 0 ? void 0 : _h.soins) === null || _j === void 0 ? void 0 : _j.massage) === null || _k === void 0 ? void 0 : _k.length) > 0) {
            order.bookingObj.soins.massage.map(bookingRes => {
                if (bookingRes.checked) {
                    const prestations = criteres.soins_massage.prestations.find(opt => opt.name === bookingRes.name);
                    bookingRes.options.map(opt => {
                        if (opt.checked) {
                            const option = prestations.options.find(o => o.name === opt.name);
                            const unitPrice = option.tarif;
                            const qte = opt.value;
                            const totalOption = unitPrice * qte;
                            bill.add({ option: `Massage ${prestations.name} (${opt.name}) (Soins)`, qte, unitPrice, total: totalOption, categorie });
                            total = total + totalOption;
                        }
                    });
                }
            });
        }
        return { total, bill, categorie };
    }
    async calculateEsthetiquePrice(order, criteres) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        let total = 0;
        const bill = new Set();
        const categorie = 'esthetique';
        if (criteres.esthetique_tarif_horaire) {
            const unitPrice = criteres.esthetique_tarif_horaire;
            const qte = 1;
            const totalOption = unitPrice * qte;
            bill.add({ option: `Tarif de location (Esthetique)`, qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_a = order.bookingObj) === null || _a === void 0 ? void 0 : _a.esthetique.conseilsPersonnalises)) {
            const unitPrice = criteres.esthetique_conseilsPersonnalisesTarif;
            const qte = (_b = order.bookingObj) === null || _b === void 0 ? void 0 : _b.esthetique.conseilsPersonnalisesDuree;
            const totalOption = unitPrice * qte;
            bill.add({ option: `Rendez-vous conseils (Esthétique)`, qte, unitPrice, total: totalOption, categorie, unit: 'H' });
            total = total + totalOption;
        }
        if (!!((_c = order.bookingObj) === null || _c === void 0 ? void 0 : _c.esthetique.essais)) {
            const unitPrice = criteres.esthetique_essaisTarif;
            const qte = (_d = order.bookingObj) === null || _d === void 0 ? void 0 : _d.esthetique.essaisNombre;
            const totalOption = unitPrice * qte;
            bill.add({ option: `Essais (Esthétique)`, qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (((_g = (_f = (_e = order.bookingObj) === null || _e === void 0 ? void 0 : _e.esthetique) === null || _f === void 0 ? void 0 : _f.manucureEtpedicure) === null || _g === void 0 ? void 0 : _g.length) > 0) {
            order.bookingObj.esthetique.manucureEtpedicure.map(bookingRes => {
                if (bookingRes.checked) {
                    const prestations = criteres.esthetique_manucureEtpedicure.prestations.find(opt => opt.name === bookingRes.name);
                    bookingRes.options.map(opt => {
                        if (opt.checked) {
                            const option = prestations.options.find(o => o.name === opt.name);
                            const unitPrice = option.tarif;
                            const qte = opt.value;
                            const totalOption = unitPrice * qte;
                            bill.add({ option: `Manucure et pédicure ${prestations.name} (${opt.name}) (Esthétique)`, qte, unitPrice, total: totalOption, categorie });
                            total = total + totalOption;
                        }
                    });
                }
            });
        }
        if (((_k = (_j = (_h = order.bookingObj) === null || _h === void 0 ? void 0 : _h.esthetique) === null || _j === void 0 ? void 0 : _j.epilation) === null || _k === void 0 ? void 0 : _k.length) > 0) {
            order.bookingObj.esthetique.epilation.map(bookingRes => {
                if (bookingRes.checked) {
                    const prestations = criteres.esthetique_epilation.prestations.find(opt => opt.name === bookingRes.name);
                    bookingRes.options.map(opt => {
                        if (opt.checked) {
                            const option = prestations.options.find(o => o.name === opt.name);
                            const unitPrice = option.tarif;
                            const qte = opt.value;
                            const totalOption = unitPrice * qte;
                            bill.add({ option: `Épilation ${prestations.name} (${opt.name}) (Esthétique)`, qte, unitPrice, total: totalOption, categorie });
                            total = total + totalOption;
                        }
                    });
                }
            });
        }
        return { total, bill, categorie };
    }
    async calculateCoiffurePrice(order, criteres) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        let total = 0;
        const bill = new Set();
        const categorie = 'coiffure';
        if (!!((_b = (_a = order.bookingObj) === null || _a === void 0 ? void 0 : _a.coiffure) === null || _b === void 0 ? void 0 : _b.coiffureNombre)) {
            const unitPrice = criteres.coiffure_tarif_horaire;
            const qte = (_c = order.bookingObj) === null || _c === void 0 ? void 0 : _c.coiffure.coiffureNombre;
            const totalOption = unitPrice * qte;
            bill.add({ option: `Nombre de coiffures`, qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (!!((_d = order.bookingObj) === null || _d === void 0 ? void 0 : _d.coiffure.conseilsPersonnalises)) {
            const unitPrice = criteres.coiffure_conseilsPersonnalisesTarif;
            const qte = (_e = order.bookingObj) === null || _e === void 0 ? void 0 : _e.coiffure.conseilsPersonnalisesDuree;
            const totalOption = unitPrice * qte;
            bill.add({ option: `Rendez-vous conseils (Coiffure)`, qte, unitPrice, total: totalOption, categorie, unit: 'H' });
            total = total + totalOption;
        }
        if (!!((_f = order.bookingObj) === null || _f === void 0 ? void 0 : _f.coiffure.essais)) {
            const unitPrice = criteres.coiffure_essaisTarif;
            const qte = (_g = order.bookingObj) === null || _g === void 0 ? void 0 : _g.coiffure.essaisNombre;
            const totalOption = unitPrice * qte;
            bill.add({ option: `Essais (Coiffure)`, qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        }
        if (((_k = (_j = (_h = order.bookingObj) === null || _h === void 0 ? void 0 : _h.coiffure) === null || _j === void 0 ? void 0 : _j.majorationTypeCheveux) === null || _k === void 0 ? void 0 : _k.length) > 0) {
            order.bookingObj.coiffure.majorationTypeCheveux.map(bookingRes => {
                if (bookingRes.checked) {
                    const option = criteres.coiffure_majorationTypeCheveux.options.find(opt => opt.name === bookingRes.name);
                    const unitPrice = option.majoration * 0.01 * criteres.coiffure_tarif_horaire;
                    const qte = 1;
                    const totalOption = unitPrice * qte;
                    bill.add({ option: `Majoration type cheveux (${option.name}) (Coiffure)`, qte, unitPrice, total: totalOption, categorie });
                    total = total + totalOption;
                }
            });
        }
        if (((_o = (_m = (_l = order.bookingObj) === null || _l === void 0 ? void 0 : _l.coiffure) === null || _m === void 0 ? void 0 : _m.produitsEtAccessoires) === null || _o === void 0 ? void 0 : _o.length) > 0) {
            order.bookingObj.coiffure.produitsEtAccessoires.map(bookingRes => {
                if (bookingRes.checked) {
                    const option = criteres.coiffure_produitsEtAccessoires.options.find(opt => opt.name === bookingRes.name);
                    const unitPrice = option.tarif;
                    const qte = bookingRes.quantity;
                    const totalOption = unitPrice * qte;
                    bill.add({ option: `Produits et accessoires (${option.name}) (Coiffure)`, qte, unitPrice, total: totalOption, categorie });
                    total = total + totalOption;
                }
            });
        }
        if (((_r = (_q = (_p = order.bookingObj) === null || _p === void 0 ? void 0 : _p.coiffure) === null || _q === void 0 ? void 0 : _q.prestationInvitesProches) === null || _r === void 0 ? void 0 : _r.length) > 0) {
            order.bookingObj.coiffure.prestationInvitesProches.map(bookingRes => {
                if (bookingRes.checked) {
                    const prestations = criteres.coiffure_prestationInvitesProches.prestations.find(opt => opt.name === bookingRes.name);
                    bookingRes.options.map(opt => {
                        const option = prestations.options.find(o => o.name === opt.name);
                        const unitPrice = option.tarif;
                        const qte = opt.value;
                        const totalOption = unitPrice * qte;
                        bill.add({ option: `${prestations.name} (${opt.name}) (Coiffure)`, qte, unitPrice, total: totalOption, categorie });
                        total = total + totalOption;
                    });
                }
            });
        }
        return { total, bill, categorie };
    }
    async calculateOptionDiversPrice(order, options, categories) {
        order.bookingObj.optionDivers = order.bookingObj.optionDivers.filter(res => {
            const optionES = options.find(elm => elm.name === res.name);
            return optionES.categories.some(t => categories.includes(t));
        });
        let total = 0;
        const bill = new Set();
        const categorieG = `options divers`;
        const data = order.bookingObj.optionDivers.map(option => {
            const optionES = options.find(elm => elm.name === option.name);
            const categorie = `options divers (${optionES.feeType})`;
            let qte;
            let unitPrice;
            let totalOption;
            if (optionES.feeType === entities_1.FeeType.SINGLE_FEE) {
                qte = 1;
                unitPrice = optionES.optionRate;
                totalOption = qte * unitPrice;
            }
            if (optionES.feeType === entities_1.FeeType.GUEST_FEE) {
                qte = order.guestsNumber;
                unitPrice = optionES.optionRate;
                totalOption = qte * unitPrice;
            }
            if (optionES.feeType === entities_1.FeeType.UNIT_FEE) {
                qte = option.examplaire;
                unitPrice = optionES.optionRate;
                totalOption = qte * unitPrice;
            }
            bill.add({ option: `${optionES.name}`, qte, unitPrice, total: totalOption, categorie });
            total = total + totalOption;
        });
        return { total, bill, categorieG };
    }
    async calculateFraisDeplacementPrice(reservation, proUserES) {
        let total = 0;
        const bill = new Set();
        const categorieG = `frais de déplacement`;
        if (!!proUserES.tripExpences) {
            if (proUserES.tripExpences.rateType === entities_1.TripFeeType.SINGLE_FEE) {
                const categorie = `frais de déplacement (${proUserES.tripExpences.rateType})`;
                const qte = 1;
                const unitPrice = proUserES.tripExpences.typePrice;
                const totalOption = qte * unitPrice;
                total = total + totalOption;
                bill.add({ option: `Frais de déplacement`, qte, unitPrice, total: totalOption, categorie });
            }
            if (proUserES.tripExpences.rateType === entities_1.TripFeeType.FEE_PER_KM) {
                const config = {
                    params: {
                        units: 'metric',
                        mode: 'driving',
                        key: 'AIzaSyBkjTJgW1LxVJUqIi-wPQsce-GFAtzKJkQ',
                        origins: `${reservation.location.geo.lat},${reservation.location.geo.lon}`,
                        destinations: `${proUserES.location.geo.lat},${proUserES.location.geo.lon}`
                    }
                };
                const { data } = await axios_1.default.get(`https://maps.googleapis.com/maps/api/distancematrix/json`, config);
                const categorie = `frais de déplacement (${proUserES.tripExpences.rateType})`;
                const totalDistance = data.rows[0].elements[0].distance.value / 1000;
                if (totalDistance > proUserES.tripExpences.distance) {
                    const qte = totalDistance - proUserES.tripExpences.distance;
                    const unitPrice = proUserES.tripExpences.typePrice;
                    const totalOption = qte * unitPrice;
                    total = total + totalOption;
                    bill.add({ option: `Frais de déplacement`, qte, unitPrice, total: totalOption, categorie, unit: 'KM' });
                }
            }
        }
        return { total, bill, categorieG };
    }
    async validateReservationByClient(order, id) {
        return await this.reservationsService.validateReservationByClient(order, id);
    }
};
BookingService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [company_service_1.CompanyService,
        users_service_1.UsersService,
        reservations_service_1.ReservationsService,
        notifications_service_1.NotificationsService,
        email_service_1.EmailService])
], BookingService);
exports.BookingService = BookingService;
//# sourceMappingURL=booking.service.js.map