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
const typeorm_1 = require("@nestjs/typeorm");
const company_repository_1 = require("./company.repository");
const users_service_1 = require("../users/users.service");
const entities_1 = require("../entities");
const image_repository_1 = require("./image.repository");
const elasticsearch_service_1 = require("../elasticsearch/elasticsearch.service");
const logging_1 = require("../../../config/logging");
const disponibility_repository_1 = require("../disponibility/disponibility.repository");
const typeorm_2 = require("typeorm");
let CompanyServices = class CompanyServices {
    constructor(companyRepository, disponibilityRepository, imageRepository, elasticsearchService, usersServices) {
        this.companyRepository = companyRepository;
        this.disponibilityRepository = disponibilityRepository;
        this.imageRepository = imageRepository;
        this.elasticsearchService = elasticsearchService;
        this.usersServices = usersServices;
    }
    async createCompany(email, company) {
        company.user = await this.usersServices.findProviderByEmail(email);
        company = await this.companyRepository.save(company);
        logging_1.customLogger('CompanyServices', {
            action: 'createCompany',
            companyId: company.id
        });
        return this.companyRepository.findOneOrFail(company.id);
    }
    async deleteImage(id, imageId) {
        const company = await this.companyRepository.findOneOrFail(id);
        const image = await this.imageRepository.findOneOrFail(imageId);
        if (company.images.filter(value => value.id === imageId).length > 0) {
            logging_1.customLogger('CompanyServices', {
                action: 'deleteCompany',
                companyId: id,
                imageId
            });
            return await this.imageRepository.remove(image);
        }
        else {
            throw new common_1.NotFoundException();
        }
    }
    async deleteCompany(id) {
        const company = await this.companyRepository.findOneOrFail(id);
        const user = await company.user;
        await this.elasticsearchService.deleteIndexById('categories', '_doc', user.id);
        await this.imageRepository.remove(company.images);
        await this.companyRepository.remove(company);
        logging_1.customLogger('CompanyServices', {
            action: 'deleteCompany',
            companyId: id
        });
        return company;
    }
    async deleteJobs(id) {
        this.deleteCompany(id);
    }
    async getCompany(email) {
        const user = await this.usersServices.findProviderByEmail(email);
        logging_1.customLogger('CompanyServices', {
            action: 'getCompany',
            userEmail: email
        });
        const company = await this.companyRepository.findOneOrFail((await user.company).id);
        const dispo = await this.disponibilityRepository.find({
            where: {
                company: { id: company.id },
                end: typeorm_2.MoreThan(new Date())
            },
            order: { start: 'ASC' }
        });
        return Object.assign(Object.assign({}, company), { disponibility: dispo });
    }
    async findCompany(id, email) {
        if (!!email) {
            const user = await this.usersServices.findProviderByEmail(email);
            if ((await user.company).id === id) {
                logging_1.customLogger('CompanyServices', {
                    action: 'findCompany',
                    companyId: id
                });
                return await this.companyRepository.findOneOrFail(id);
            }
            throw new common_1.NotFoundException();
        }
        else {
            return await this.companyRepository.findOneOrFail(id);
        }
    }
    async patchCategory(id, company) {
        logging_1.customLogger('CompanyServices', {
            action: 'patchCategory',
            companyId: id
        });
        const patchCompany = await this.companyRepository.update(id, company);
        console.log('patchCompany', patchCompany);
        return patchCompany;
    }
    async patchCurrentStep(id, company) {
        logging_1.customLogger('CompanyServices', {
            action: 'patchCurrentStep',
            companyId: id,
            currentStep: company.currentStep
        });
        return await this.companyRepository.update(id, company);
    }
    async patchCompanyImage(email, id, imageId, data) {
        const company = await this.findCompany(id, email);
        const images = company.images.map(async (image) => {
            if (image.id === imageId) {
                image.favorite = true;
                await this.imageRepository.update(imageId, { favorite: true });
            }
            else {
                image.favorite = false;
                await this.imageRepository.update(image.id, { favorite: false });
            }
        });
        const imgs = await Promise.all(company.images);
        return imgs;
    }
    async patchCompany(id, company, userId) {
        var _a, _b, _c, _d, _e, _f, _g;
        company.tripExpences = ((_a = company.tripExpences) === null || _a === void 0 ? void 0 : _a.toString()) === 'true';
        company.suppHours = ((_b = company.suppHours) === null || _b === void 0 ? void 0 : _b.toString()) === 'true';
        company.weekendVariation = ((_c = company.weekendVariation) === null || _c === void 0 ? void 0 : _c.toString()) === 'true';
        const companyDB = await this.companyRepository.findOneOrFail(id);
        companyDB.images = [...companyDB.images, ...company.images];
        companyDB.name = company.name;
        companyDB.location = JSON.parse(company.location);
        companyDB.questions = JSON.parse(company.questions);
        companyDB.dynamiqueQts = !!company.dynamiqueQts ? JSON.parse(company.dynamiqueQts) : null;
        companyDB.links = ((_d = company) === null || _d === void 0 ? void 0 : _d.links) || [];
        companyDB.networks = ((_e = company) === null || _e === void 0 ? void 0 : _e.networks) || [];
        companyDB.categories = company.categories;
        companyDB.description = company.description;
        companyDB.periodeVariation = ((_f = company.periodeVariation) === null || _f === void 0 ? void 0 : _f.toString()) === 'true';
        companyDB.optionsProposed = ((_g = company.optionsProposed) === null || _g === void 0 ? void 0 : _g.toString()) === 'true';
        companyDB.weekendVariation = !!company.weekendVariation;
        companyDB.weekendVariationPercentage = !!company.weekendVariation ? company.weekendVariationPercentage : 0;
        companyDB.suppHours = !!company.suppHours;
        companyDB.suppHoursRate = !!company.suppHours ? company.suppHoursRate : 0;
        companyDB.tripExpences = !!company.tripExpences;
        companyDB.tripExpencesDistance = !!company.tripExpences ? company.tripExpencesDistance : 0;
        companyDB.tripExpencesRateType = !!company.tripExpences ? company.tripExpencesRateType : entities_1.TripFeeType.SINGLE_FEE;
        companyDB.tripExpencesTypePrice = !!company.tripExpences ? company.tripExpencesTypePrice : 0;
        const savedCompany = await this.companyRepository.save(companyDB);
        await this.elasticsearchService.updateIndexById('categories', '_doc', userId, {
            location: {
                address: savedCompany.location.address,
                geo: {
                    lat: savedCompany.location.lat,
                    lon: savedCompany.location.lng
                }
            },
            weekendVariationPercentage: companyDB.weekendVariationPercentage,
            tripExpences: !company.tripExpences
                ? null
                : {
                    distance: companyDB.tripExpencesDistance,
                    rateType: companyDB.tripExpencesRateType,
                    typePrice: companyDB.tripExpencesTypePrice
                }
        });
        logging_1.customLogger('CompanyServices', {
            action: 'patchCompany',
            companyId: savedCompany.id
        });
        return savedCompany;
    }
    async findCompanyByUserId(userId) {
        const company = await this.companyRepository.findOne({ user: { id: userId } });
        const dispo = await this.disponibilityRepository.find({
            company: { id: company.id },
            end: typeorm_2.MoreThan(new Date())
        });
        return Object.assign(Object.assign({}, company), { disponibility: dispo });
    }
};
CompanyServices = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(company_repository_1.CompanyRepository)),
    __param(1, typeorm_1.InjectRepository(disponibility_repository_1.DisponibilityRepository)),
    __param(2, typeorm_1.InjectRepository(image_repository_1.ImageRepository)),
    __metadata("design:paramtypes", [company_repository_1.CompanyRepository,
        disponibility_repository_1.DisponibilityRepository,
        image_repository_1.ImageRepository,
        elasticsearch_service_1.ElasticsearchService,
        users_service_1.UsersServices])
], CompanyServices);
exports.CompanyServices = CompanyServices;
//# sourceMappingURL=company.service.js.map