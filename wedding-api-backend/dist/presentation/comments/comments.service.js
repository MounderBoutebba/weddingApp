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
const comments_service_1 = require("../../infrastructure/databases/comments/comments.service");
const booking_service_1 = require("../booking/booking.service");
const comments_entity_1 = require("../../infrastructure/databases/entities/comments.entity");
const commentsResponse_entity_1 = require("../../infrastructure/databases/entities/commentsResponse.entity");
const company_service_1 = require("../company/company.service");
let CommentsService = class CommentsService {
    constructor(commentsServiceDB, bookingService, companyService) {
        this.commentsServiceDB = commentsServiceDB;
        this.bookingService = bookingService;
        this.companyService = companyService;
    }
    async createComment(commentDto, client) {
        const reservation = await this.bookingService.findBookingPsql(commentDto.reservationId);
        const comment = new comments_entity_1.CommentsEntity();
        comment.reservation = reservation;
        comment.client = client;
        comment.content = commentDto.content;
        comment.flexibilite = commentDto.flexibilite;
        comment.professionnalisme = commentDto.professionnalisme;
        comment.qualiteService = commentDto.qualiteService;
        comment.rapportQualitePrix = commentDto.rapportQualitePrix;
        comment.totalNotes = (comment.flexibilite + comment.professionnalisme + comment.qualiteService + comment.rapportQualitePrix) / 4;
        comment.company = reservation.company;
        return this.commentsServiceDB.save(comment);
    }
    async createCommentRespose(responseDto, provider, commentId) {
        const comment = await this.commentsServiceDB.find(commentId);
        const company = await comment.company;
        if (company.id !== (await provider.company).id) {
            throw new common_1.ForbiddenException();
        }
        const response = new commentsResponse_entity_1.CommentsResponseEntity();
        response.user = provider;
        response.content = responseDto.content;
        response.comment = comment;
        return this.commentsServiceDB.createResponse(response);
    }
    async getCommentByCompanyId(id, page) {
        return await this.commentsServiceDB.findByCompany(id, page);
    }
    async deleteComment(id, userId) {
        return this.commentsServiceDB.delete(id, userId);
    }
    async deleteCommentResponse(id, userId, commentId) {
        return this.commentsServiceDB.deleteResponse(id, userId, commentId);
    }
    async updateCommentResponse(id, userId, commentId, responseDto) {
        return this.commentsServiceDB.updateResponse(id, userId, commentId, responseDto);
    }
    async updateComment(id, userId, commentDto) {
        return this.commentsServiceDB.updateComment(id, userId, commentDto);
    }
};
CommentsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [comments_service_1.CommentsServiceDB,
        booking_service_1.BookingService,
        company_service_1.CompanyService])
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map