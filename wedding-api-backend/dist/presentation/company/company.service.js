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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const uuid_1 = require("uuid");
const entities_1 = require("../../infrastructure/databases/entities");
const company_service_1 = require("../../infrastructure/databases/company/company.service");
const services_service_1 = require("../services/services.service");
const photographe_model_1 = require("../../domain/entities/categories/souvenirs/photographe.model");
const videaliste_model_1 = require("../../domain/entities/categories/souvenirs/videaliste.model");
const users_service_1 = require("../../infrastructure/databases/users/users.service");
const decorateur_model_1 = require("../../domain/entities/categories/decoration/decorateur.model");
const fleuriste_model_1 = require("../../domain/entities/categories/decoration/fleuriste.model");
const bus_model_1 = require("../../domain/entities/categories/transport/bus.model");
const voiture_model_1 = require("../../domain/entities/categories/transport/voiture.model");
const animateurAdultes_model_1 = require("../../domain/entities/categories/animateur/animateurAdultes.model");
const animateurEnfants_model_1 = require("../../domain/entities/categories/animateur/animateurEnfants.model");
const lieu_model_1 = require("../../domain/entities/categories/reception/lieu.model");
const traiteur_model_1 = require("../../domain/entities/categories/reception/traiteur.model");
const gateauMariage_model_1 = require("../../domain/entities/categories/reception/gateauMariage.model");
const dj_model_1 = require("../../domain/entities/categories/musique/dj.model");
const groupe_model_1 = require("../../domain/entities/categories/musique/groupe.model");
const musicien_model_1 = require("../../domain/entities/categories/musique/musicien.model");
const lachers_model_1 = require("../../domain/entities/categories/visuelles/lachers.model");
const feuArtifices_model_1 = require("../../domain/entities/categories/visuelles/feuArtifices.model");
const choregrapheMariage_model_1 = require("../../domain/entities/categories/coach/choregrapheMariage.model");
const coachSportif_model_1 = require("../../domain/entities/categories/coach/coachSportif.model");
const officiantCeremonie_model_1 = require("../../domain/entities/categories/coach/officiantCeremonie.model");
const coiffureMariage_model_1 = require("../../domain/entities/categories/beaute-et-soins/coiffureMariage.model");
const maquillageMariage_model_1 = require("../../domain/entities/categories/beaute-et-soins/maquillageMariage.model");
const soins_model_1 = require("../../domain/entities/categories/beaute-et-soins/soins.model");
const esthetique_model_1 = require("../../domain/entities/categories/beaute-et-soins/esthetique.model");
const hebergement_model_1 = require("../../domain/entities/categories/invites/hebergement.model");
const faireParts_model_1 = require("../../domain/entities/categories/invites/faireParts.model");
const voyageNoces_model_1 = require("../../domain/entities/categories/voyage-noces/voyageNoces.model");
const gcp_file_service_1 = require("../../global/services/gcp-file/gcp-file.service");
const logging_1 = require("../../config/logging");
let CompanyService = class CompanyService {
    constructor(companyServices, servicesService, usersService, gcpFileService) {
        this.companyServices = companyServices;
        this.servicesService = servicesService;
        this.usersService = usersService;
        this.gcpFileService = gcpFileService;
    }
    static fileFilter(req1, file, callback) {
        if (['.jpg', '.jpeg', '.png', '.webp', '.bmp'].includes(path_1.extname(file.originalname).toLocaleLowerCase())) {
            return callback(null, true);
        }
        else {
            return callback(new common_1.BadRequestException('File format is not valid , accept only images'), false);
        }
    }
    static filename(req, file, cb) {
        return cb(null, `${uuid_1.v4()}${path_1.extname(file.originalname)}`);
    }
    async createCompany(email, data) {
        var _a, _b, _c, _d;
        if (Array.isArray(data.files)) {
            if (data.files.length <= 2) {
                throw new common_1.ForbiddenException('Min Imagees 3 !! ');
            }
        }
        else {
            throw new common_1.ForbiddenException('Please Add  some images !! ');
        }
        const files = await Promise.all(data.files.map(async (file) => {
            const image = new entities_1.CompanyImageEntity();
            image.id = file.filename.split('.')[0];
            image.description = file.originalname.split('.')[0];
            image.name = file.filename;
            image.path = (await this.gcpFileService.getUrlFile(file.filename))[0];
            return image;
        }));
        const company = new entities_1.CompanyEntity();
        company.images = files;
        company.categories = data.company.categories;
        company.description = data.company.description;
        company.name = data.company.name;
        company.links = ((_b = (_a = data) === null || _a === void 0 ? void 0 : _a.company) === null || _b === void 0 ? void 0 : _b.links) || [];
        company.networks = ((_d = (_c = data) === null || _c === void 0 ? void 0 : _c.company) === null || _d === void 0 ? void 0 : _d.networks) || [];
        company.location = JSON.parse(data.company.location);
        company.questions = JSON.parse(data.company.questions);
        company.dynamiqueQts = !!data.company.dynamiqueQts ? JSON.parse(data.company.dynamiqueQts) : null;
        if (typeof company.categories === 'string') {
            company.categories = [company.categories];
        }
        const createdCompany = await this.companyServices.createCompany(email, company);
        const user = await this.usersService.findProviderByEmail(email);
        this.asyncForEach(company.categories, async (categorieLabel) => {
            const categorie = this.getCategorieByLabel(categorieLabel);
            if (categorie) {
                categorie.userid = user.id;
                categorie.totalNotes = 0;
                categorie.securePayment = false;
                categorie.verifiedProvider = false;
                categorie.location = {
                    address: createdCompany.location.address,
                    geo: {
                        lat: createdCompany.location.lat,
                        lon: createdCompany.location.lng
                    }
                },
                    categorie.criteres = Object.assign({}, categorie.criteres);
                const createdService = await this.servicesService.createService(Object.assign(Object.assign({}, categorie), { categories: [categorieLabel] }));
                logging_1.customLogger('Create Service', {
                    action: 'providerCreated',
                    service: createdService
                });
            }
            else {
                console.log('categorie not found');
                throw new common_1.NotFoundException('categorie not found');
            }
        });
        return createdCompany;
    }
    async deleteImage(id, imageId) {
        return await this.companyServices.deleteImage(id, imageId);
    }
    async deleteCompany(id) {
        return await this.companyServices.deleteCompany(id);
    }
    async deleteJobs(id) {
        return await this.companyServices.deleteJobs(id);
    }
    async createJobs(company, email) {
        const user = await this.usersService.findProviderByEmail(email);
        this.asyncForEach(company.categories, async (categorieLabel) => {
            const categorie = this.getCategorieByLabel(categorieLabel);
            if (categorie) {
                categorie.userid = user.id;
                categorie.criteres = Object.assign({}, categorie.criteres);
                const createdService = await this.servicesService.createService(Object.assign(Object.assign({}, categorie), { categories: [categorieLabel] }));
                logging_1.customLogger('Create Service', {
                    action: 'createdService',
                    service: createdService
                });
            }
            else {
                throw new common_1.NotFoundException('categorie not found');
            }
        });
    }
    async getCompany(email) {
        return this.companyServices.getCompany(email);
    }
    async findCompanyByUserId(userId) {
        return this.companyServices.findCompanyByUserId(userId);
    }
    async findCompany(id, email) {
        return this.companyServices.findCompany(id, email);
    }
    async changeFavorite(email, id, imageId, data) {
        return this.companyServices.patchCompanyImage(email, id, imageId, data);
    }
    async patchCompany(id, email, company, files = [], userId) {
        const fileArray = await Promise.all(files.map(async (file) => {
            const image = new entities_1.CompanyImageEntity();
            image.id = file.filename.split('.')[0];
            image.description = file.originalname.split('.')[0];
            image.name = file.filename;
            image.path = (await this.gcpFileService.getUrlFile(file.filename))[0];
            return image;
        }));
        company.images = fileArray;
        if (typeof company.categories === 'string') {
            company.categories = [company.categories];
        }
        return await this.companyServices.patchCompany(id, company, userId);
    }
    async patchCategories(id, company) {
        return await this.companyServices.patchCategory(id, company);
    }
    async patchCurrentStep(id, company) {
        return await this.companyServices.patchCurrentStep(id, company);
    }
    transformCriteres(object, prefix) {
        return Object.entries(object)
            .map(([k, v]) => ({ [prefix + '_' + k]: v }))
            .reduce((acc, val) => (Object.assign(Object.assign({}, acc), val)), {});
    }
    getCategorieByLabel(label) {
        let categorie;
        switch (label) {
            case 'animateurEnfants': {
                categorie = new animateurEnfants_model_1.AnimateurEnfants();
                categorie.userid = '';
                break;
            }
            case 'animateurAdultes': {
                categorie = new animateurAdultes_model_1.AnimateurAdultes();
                categorie.userid = '';
                break;
            }
            case 'photographe': {
                categorie = new photographe_model_1.Photographe();
                categorie.userid = '';
                break;
            }
            case 'videaliste': {
                categorie = new videaliste_model_1.Videaliste();
                categorie.userid = '';
                break;
            }
            case 'decorateur': {
                categorie = new decorateur_model_1.Decorateur();
                categorie.userid = '';
                break;
            }
            case 'fleuriste': {
                categorie = new fleuriste_model_1.Fleuriste();
                categorie.userid = '';
                break;
            }
            case 'bus': {
                categorie = new bus_model_1.Bus();
                categorie.userid = '';
                break;
            }
            case 'voiture': {
                categorie = new voiture_model_1.Voiture();
                categorie.userid = '';
                break;
            }
            case 'lieu': {
                categorie = new lieu_model_1.Lieu();
                categorie.userid = '';
                break;
            }
            case 'traiteur': {
                categorie = new traiteur_model_1.Traiteur();
                categorie.userid = '';
                break;
            }
            case 'gateaumariage': {
                categorie = new gateauMariage_model_1.GateauMariage();
                categorie.userid = '';
                break;
            }
            case 'dj': {
                categorie = new dj_model_1.Dj();
                categorie.userid = '';
                break;
            }
            case 'groupe': {
                categorie = new groupe_model_1.Groupe();
                categorie.userid = '';
                break;
            }
            case 'musicien': {
                categorie = new musicien_model_1.Musicien();
                categorie.userid = '';
                break;
            }
            case 'lacher': {
                categorie = new lachers_model_1.Lachers();
                categorie.userid = '';
                break;
            }
            case 'feuArtifices': {
                categorie = new feuArtifices_model_1.FeuArtifices();
                categorie.userid = '';
                break;
            }
            case 'choregrapheMariage': {
                categorie = new choregrapheMariage_model_1.ChoregrapheMariage();
                categorie.userid = '';
                break;
            }
            case 'coachSportif': {
                categorie = new coachSportif_model_1.CoachSportif();
                categorie.userid = '';
                break;
            }
            case 'officiantCeremonie': {
                categorie = new officiantCeremonie_model_1.OfficiantCeremonie();
                categorie.userid = '';
                break;
            }
            case 'coiffure': {
                categorie = new coiffureMariage_model_1.CoiffureMariage();
                categorie.userid = '';
                break;
            }
            case 'maquillage': {
                categorie = new maquillageMariage_model_1.MaquillageMariage();
                categorie.userid = '';
                break;
            }
            case 'soins': {
                categorie = new soins_model_1.Soins();
                categorie.userid = '';
                break;
            }
            case 'esthetique': {
                categorie = new esthetique_model_1.Esthetique();
                categorie.userid = '';
                break;
            }
            case 'hebergement': {
                categorie = new hebergement_model_1.Hebergement();
                categorie.userid = '';
                break;
            }
            case 'faireparts': {
                categorie = new faireParts_model_1.FaireParts();
                categorie.userid = '';
                break;
            }
            case 'voyagenoces': {
                categorie = new voyageNoces_model_1.VoyageNoces();
                categorie.userid = '';
                break;
            }
        }
        categorie.criteres = this.transformCriteres(categorie.criteres, label);
        return categorie;
    }
    async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }
};
CompanyService = __decorate([
    common_1.Injectable(),
    __param(1, common_1.Inject(common_1.forwardRef(() => services_service_1.ServicesService))),
    __metadata("design:paramtypes", [company_service_1.CompanyServices,
        services_service_1.ServicesService,
        users_service_1.UsersServices,
        gcp_file_service_1.GcpFileService])
], CompanyService);
exports.CompanyService = CompanyService;
//# sourceMappingURL=company.service.js.map