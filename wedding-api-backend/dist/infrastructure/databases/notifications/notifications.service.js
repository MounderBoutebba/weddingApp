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
const notifications_repository_1 = require("./notifications.repository");
const notifications_entity_1 = require("../entities/notifications.entity");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const users_service_1 = require("../users/users.service");
let NotificationsServiceDB = class NotificationsServiceDB {
    constructor(notificationsRepository, usersServices) {
        this.notificationsRepository = notificationsRepository;
        this.usersServices = usersServices;
    }
    async createNotification(notificationDto) {
        const user = await this.usersServices.findUserById(notificationDto.userId);
        let notifications = new notifications_entity_1.NotificationsEntity();
        notifications.content = notificationDto.content;
        notifications.user = user;
        notifications.url = notificationDto.url;
        notifications = await this.notificationsRepository.save(notifications);
        return notifications;
    }
    async updateNotification(notificationDto, user, id) {
        let notification;
        try {
            notification = await this.notificationsRepository.findOneOrFail(id);
        }
        catch (e) {
            throw new common_1.NotFoundException();
        }
        notification.seen = notificationDto.seen;
        notification = await this.notificationsRepository.save(notification);
        return notification;
    }
    async getCountUnseenNotification(user) {
        try {
            return await this.notificationsRepository.count({ user: { id: user.id }, seen: false });
        }
        catch (e) {
            throw new common_1.NotFoundException();
        }
    }
    async markAllAsSeen(user) {
        try {
            return await this.notificationsRepository.update({ user: { id: user.id }, seen: false }, { seen: true });
        }
        catch (e) {
            throw e;
        }
    }
    async getNotifications(user, page) {
        try {
            return await nestjs_typeorm_paginate_1.paginate(this.notificationsRepository, {
                limit: 10,
                page,
                route: `/api/notifications`
            }, { where: { user: { id: user.id } }, order: { createdAt: 'DESC' } });
        }
        catch (e) {
            throw new common_1.NotFoundException();
        }
    }
};
NotificationsServiceDB = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(notifications_repository_1.NotificationsRepository)),
    __metadata("design:paramtypes", [notifications_repository_1.NotificationsRepository,
        users_service_1.UsersServices])
], NotificationsServiceDB);
exports.NotificationsServiceDB = NotificationsServiceDB;
//# sourceMappingURL=notifications.service.js.map