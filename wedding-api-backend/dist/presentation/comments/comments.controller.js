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
const comments_service_1 = require("./comments.service");
const comment_dto_1 = require("./dto/comment.dto");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../../global/guards/roles.guard");
const roles_decorator_1 = require("../../global/decorators/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
const commentResponse_dto_1 = require("./dto/commentResponse.dto");
let CommentsController = class CommentsController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    async addComment(comment, req, res) {
        try {
            const client = req.user;
            const data = await this.commentService.createComment(comment, client);
            return res.status(common_1.HttpStatus.CREATED).json({ data });
        }
        catch (e) {
            throw e;
        }
    }
    async addCommentResponse(response, id, req, res) {
        try {
            const provider = req.user;
            const data = await this.commentService.createCommentRespose(response, provider, id);
            return res.status(common_1.HttpStatus.CREATED).json({ data });
        }
        catch (e) {
            throw e;
        }
    }
    async getComment(id, page = 1, req) {
        try {
            return await this.commentService.getCommentByCompanyId(id, page);
        }
        catch (e) {
            throw e;
        }
    }
    async deleteComment(id, req, res) {
        try {
            const user = req.user;
            const data = await this.commentService.deleteComment(id, user.id);
            return res.status(common_1.HttpStatus.CREATED).json({ data });
        }
        catch (e) {
            throw e;
        }
    }
    async updateComment(comment, id, req, res) {
        try {
            const user = req.user;
            const data = await this.commentService.updateComment(id, user.id, comment);
            return res.status(common_1.HttpStatus.CREATED).json({ data });
        }
        catch (e) {
            throw e;
        }
    }
    async deleteCommentResponse(id, commentId, req, res) {
        try {
            const user = req.user;
            const data = await this.commentService.deleteCommentResponse(id, user.id, commentId);
            return res.status(common_1.HttpStatus.NO_CONTENT).json({ data });
        }
        catch (e) {
            throw e;
        }
    }
    async updateCommentResponse(responseDto, id, commentId, req, res) {
        try {
            const user = req.user;
            const data = await this.commentService.updateCommentResponse(id, user.id, commentId, responseDto);
            return res.status(common_1.HttpStatus.CREATED).json({ data });
        }
        catch (e) {
            throw e;
        }
    }
};
__decorate([
    common_1.Post(),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('client'),
    __param(0, common_1.Body()), __param(1, common_1.Request()), __param(2, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.AddCommentDto, Object, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "addComment", null);
__decorate([
    common_1.Post(':id/response'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider'),
    __param(0, common_1.Body()), __param(1, common_1.Param('id')), __param(2, common_1.Request()), __param(3, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [commentResponse_dto_1.CommentResponseDto, String, Object, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "addCommentResponse", null);
__decorate([
    common_1.Get('company/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Query('page')), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "getComment", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('client'),
    __param(0, common_1.Param('id')), __param(1, common_1.Request()), __param(2, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "deleteComment", null);
__decorate([
    common_1.Put(':id'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('client'),
    __param(0, common_1.Body()),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Request()), __param(3, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.AddCommentDto, String, Object, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "updateComment", null);
__decorate([
    common_1.Delete(':commentId/response/:id'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Param('commentId')),
    __param(2, common_1.Request()), __param(3, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "deleteCommentResponse", null);
__decorate([
    common_1.Put(':commentId/response/:id'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider'),
    __param(0, common_1.Body()),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Param('commentId')),
    __param(3, common_1.Request()), __param(4, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [commentResponse_dto_1.CommentResponseDto, String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "updateCommentResponse", null);
CommentsController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiTags('comments'),
    common_1.Controller('comments'),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], CommentsController);
exports.CommentsController = CommentsController;
//# sourceMappingURL=comments.controller.js.map