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
const notifications_service_1 = require("../../infrastructure/databases/notifications/notifications.service");
let NotificationsService = class NotificationsService {
    constructor(notificationsServiceDB) {
        this.notificationsServiceDB = notificationsServiceDB;
    }
    async createNotification(notification) {
        return this.notificationsServiceDB.createNotification(notification);
    }
    async updateNotification(notification, user, id) {
        return this.notificationsServiceDB.updateNotification(notification, user, id);
    }
    async getUnseeNotification(user) {
        return this.notificationsServiceDB.getCountUnseenNotification(user);
    }
    async markAllAsSeen(user) {
        return this.notificationsServiceDB.markAllAsSeen(user);
    }
    async getNotifications(user, page) {
        return this.notificationsServiceDB.getNotifications(user, page);
    }
};
NotificationsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsServiceDB])
], NotificationsService);
exports.NotificationsService = NotificationsService;
//# sourceMappingURL=notifications.service.js.map