"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const booking_controller_1 = require("./booking.controller");
const booking_service_1 = require("./booking.service");
const config_module_1 = require("../config/config.module");
const company_module_1 = require("../company/company.module");
const users_module_1 = require("../users/users.module");
const notifications_module_1 = require("../notifications/notifications.module");
let BookingModule = class BookingModule {
};
BookingModule = __decorate([
    common_1.Module({
        controllers: [booking_controller_1.BookingController],
        providers: [booking_service_1.BookingService],
        exports: [booking_service_1.BookingService],
        imports: [
            config_module_1.ConfigModule,
            company_module_1.CompanyModule,
            users_module_1.UsersModule,
            notifications_module_1.NotificationsModule
        ]
    })
], BookingModule);
exports.BookingModule = BookingModule;
//# sourceMappingURL=booking.module.js.map