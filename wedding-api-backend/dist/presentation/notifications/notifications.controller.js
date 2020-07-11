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
const notifications_service_1 = require("./notifications.service");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const updateNotification_dto_1 = require("./dto/updateNotification.dto");
let NotificationsController = class NotificationsController {
    constructor(notificationsService) {
        this.notificationsService = notificationsService;
    }
    async updateNotifications(notification, id, req) {
        try {
            const user = req.user;
            const data = await this.notificationsService.updateNotification(notification, user, id);
            return { data };
        }
        catch (e) {
            throw e;
        }
    }
    async marqueAllAsSeen(req) {
        try {
            const user = req.user;
            const data = await this.notificationsService.markAllAsSeen(user);
            return { data };
        }
        catch (e) {
            throw e;
        }
    }
    async getCountUnseenBugs(req) {
        try {
            const user = req.user;
            const count = await this.notificationsService.getUnseeNotification(user);
            return { count };
        }
        catch (e) {
            throw e;
        }
    }
    async getNotifications(page = 0, req) {
        try {
            const user = req.user;
            const data = await this.notificationsService.getNotifications(user, page);
            return data;
        }
        catch (e) {
            throw e;
        }
    }
};
__decorate([
    common_1.Patch(':id'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Body()),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateNotification_dto_1.UpdateNotificationDto, String, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "updateNotifications", null);
__decorate([
    common_1.Put('mark-all-seen'),
    common_1.UseGuards(passport_1.AuthGuard()),
    common_1.HttpCode(common_1.HttpStatus.NO_CONTENT),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "marqueAllAsSeen", null);
__decorate([
    common_1.Get('unseen'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "getCountUnseenBugs", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Query('page')), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "getNotifications", null);
NotificationsController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiTags('notifications'),
    common_1.Controller('notifications'),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService])
], NotificationsController);
exports.NotificationsController = NotificationsController;
//# sourceMappingURL=notifications.controller.js.map