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
const comments_repository_1 = require("./comments.repository");
const commentsResponse_repository_1 = require("./commentsResponse.repository");
const company_repository_1 = require("../company/company.repository");
const elasticsearch_service_1 = require("../elasticsearch/elasticsearch.service");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
let CommentsServiceDB = class CommentsServiceDB {
    constructor(companyRepository, commentsRepository, commentsResponseRepository, elasticsearchService) {
        this.companyRepository = companyRepository;
        this.commentsRepository = commentsRepository;
        this.commentsResponseRepository = commentsResponseRepository;
        this.elasticsearchService = elasticsearchService;
    }
    async save(comment) {
        try {
            const comments = await this.commentsRepository.save(comment);
            let company = await comments.company;
            company = this.addVotesToCompany(company, comments);
            await this.companyRepository.update(company.id, {
                totalNotes: company.totalNotes,
                countVotes: company.countVotes,
                flexibilite: company.flexibilite,
                countFlexibilite: company.countFlexibilite,
                professionnalisme: company.professionnalisme,
                countProfessionnalisme: company.countProfessionnalisme,
                qualiteService: company.qualiteService,
                countQualiteService: company.countQualiteService,
                rapportQualitePrix: company.rapportQualitePrix,
                countRapportQualitePrix: company.countRapportQualitePrix
            });
            await this.elasticsearchService.updateIndexById('categories', '_doc', company.user.id, {
                totalNotes: company.totalNotes
            });
            delete comments['__company__'];
            delete comments['__reservation__'];
            delete comments['__has_reservation__'];
            delete comments['__has_company__'];
            return comments;
        }
        catch (e) {
            throw new common_1.ConflictException();
        }
    }
    async find(id) {
        try {
            return await this.commentsRepository.findOneOrFail(id);
        }
        catch (e) {
            throw new common_1.NotFoundException();
        }
    }
    async createResponse(response) {
        try {
            const res = await this.commentsResponseRepository.save(response);
            delete res['comment'];
            delete res['user']['__company__'];
            delete res['user']['__has_company__'];
            return res;
        }
        catch (e) {
            throw new common_1.ConflictException();
        }
    }
    async findByCompany(companyId, page) {
        return await nestjs_typeorm_paginate_1.paginate(this.commentsRepository, {
            limit: 10,
            page,
            route: `/api/comments`
        }, { where: { company: { id: companyId } }, order: { createdAt: 'DESC' } });
    }
    async delete(id, userId) {
        const comment = await this.find(id);
        let company = await comment.company;
        if (comment.client.id !== userId || !!comment.response) {
            throw new common_1.ForbiddenException();
        }
        await this.commentsRepository.delete(comment.id);
        company = this.removeVotesFromCompany(company, comment);
        await this.companyRepository.update(company.id, {
            totalNotes: company.totalNotes,
            countVotes: company.countVotes,
            flexibilite: company.flexibilite,
            countFlexibilite: company.countFlexibilite,
            professionnalisme: company.professionnalisme,
            countProfessionnalisme: company.countProfessionnalisme,
            qualiteService: company.qualiteService,
            countQualiteService: company.countQualiteService,
            rapportQualitePrix: company.rapportQualitePrix,
            countRapportQualitePrix: company.countRapportQualitePrix
        });
        company = await this.companyRepository.findOne(company.id);
        await this.elasticsearchService.updateIndexById('categories', '_doc', company.user.id, {
            totalNotes: company.totalNotes
        });
    }
    addVotesToCompany(company, comments) {
        company.countFlexibilite = company.countFlexibilite + comments.flexibilite;
        company.countProfessionnalisme = company.countProfessionnalisme + comments.professionnalisme;
        company.countQualiteService = company.countQualiteService + comments.qualiteService;
        company.countRapportQualitePrix = company.countRapportQualitePrix + comments.rapportQualitePrix;
        company.countVotes = company.countVotes + 1;
        company.flexibilite = company.countFlexibilite / company.countVotes;
        company.professionnalisme = company.countProfessionnalisme / company.countVotes;
        company.qualiteService = company.countQualiteService / company.countVotes;
        company.rapportQualitePrix = company.countRapportQualitePrix / company.countVotes;
        company.totalNotes = (company.flexibilite + company.professionnalisme + company.qualiteService + company.rapportQualitePrix) / 4;
        return company;
    }
    removeVotesFromCompany(company, comments) {
        company.countFlexibilite = company.countFlexibilite - comments.flexibilite;
        company.countProfessionnalisme = company.countProfessionnalisme - comments.professionnalisme;
        company.countQualiteService = company.countQualiteService - comments.qualiteService;
        company.countRapportQualitePrix = company.countRapportQualitePrix - comments.rapportQualitePrix;
        company.countVotes = company.countVotes - 1;
        const divider = company.countVotes || 1;
        company.flexibilite = company.countFlexibilite / divider;
        company.professionnalisme = company.countProfessionnalisme / divider;
        company.qualiteService = company.countQualiteService / divider;
        company.rapportQualitePrix = company.countRapportQualitePrix / divider;
        company.totalNotes = (company.flexibilite + company.professionnalisme + company.qualiteService + company.rapportQualitePrix) / 4;
        return company;
    }
    async deleteResponse(id, userId, commentId) {
        const commentResponse = await this.findResponse(id);
        const comment = await this.find(commentId);
        if (commentResponse.user.id !== userId) {
            throw new common_1.ForbiddenException();
        }
        if (comment.response.id !== id) {
            throw new common_1.NotFoundException();
        }
        return await this.commentsResponseRepository.delete(id);
    }
    async findResponse(id) {
        try {
            return await this.commentsResponseRepository.findOneOrFail(id);
        }
        catch (e) {
            throw new common_1.NotFoundException();
        }
    }
    async updateResponse(id, userId, commentId, responseDto) {
        const commentResponse = await this.findResponse(id);
        const comment = await this.find(commentId);
        if (commentResponse.user.id !== userId) {
            throw new common_1.ForbiddenException();
        }
        if (comment.response.id !== id) {
            throw new common_1.NotFoundException();
        }
        commentResponse.content = responseDto.content;
        return await this.commentsResponseRepository.save(commentResponse);
    }
    async updateComment(id, userId, commentDto) {
        let comment = await this.find(id);
        if (comment.client.id !== userId || !!comment.response) {
            throw new common_1.ForbiddenException();
        }
        let company = await comment.company;
        company = this.removeVotesFromCompany(company, comment);
        comment.rapportQualitePrix = commentDto.rapportQualitePrix;
        comment.qualiteService = commentDto.qualiteService;
        comment.professionnalisme = commentDto.professionnalisme;
        comment.flexibilite = commentDto.flexibilite;
        comment.totalNotes = (comment.flexibilite + comment.professionnalisme + comment.qualiteService + comment.rapportQualitePrix) / 4;
        comment.content = commentDto.content;
        comment = await this.commentsRepository.save(comment);
        company = this.addVotesToCompany(company, comment);
        await this.companyRepository.update(company.id, {
            totalNotes: company.totalNotes,
            countVotes: company.countVotes,
            flexibilite: company.flexibilite,
            countFlexibilite: company.countFlexibilite,
            professionnalisme: company.professionnalisme,
            countProfessionnalisme: company.countProfessionnalisme,
            qualiteService: company.qualiteService,
            countQualiteService: company.countQualiteService,
            rapportQualitePrix: company.rapportQualitePrix,
            countRapportQualitePrix: company.countRapportQualitePrix
        });
        company = await this.companyRepository.findOne(company.id);
        await this.elasticsearchService.updateIndexById('categories', '_doc', company.user.id, {
            totalNotes: company.totalNotes
        });
        delete comment['__company__'];
        delete comment['__has_company__'];
        return comment;
    }
};
CommentsServiceDB = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(company_repository_1.CompanyRepository)),
    __param(1, typeorm_1.InjectRepository(comments_repository_1.CommentsRepository)),
    __param(2, typeorm_1.InjectRepository(commentsResponse_repository_1.CommentsResponseRepository)),
    __metadata("design:paramtypes", [company_repository_1.CompanyRepository,
        comments_repository_1.CommentsRepository,
        commentsResponse_repository_1.CommentsResponseRepository,
        elasticsearch_service_1.ElasticsearchService])
], CommentsServiceDB);
exports.CommentsServiceDB = CommentsServiceDB;
//# sourceMappingURL=comments.service.js.map