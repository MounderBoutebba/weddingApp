"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const services_module_1 = require("./services/services.module");
const config_module_1 = require("./config/config.module");
const infrastructure_module_1 = require("../infrastructure/infrastructure.module");
const users_module_1 = require("./users/users.module");
const weddings_module_1 = require("./weddings/weddings.module");
const company_module_1 = require("./company/company.module");
const paiements_module_1 = require("./paiements/paiements.module");
const option_module_1 = require("./company/option/option.module");
const setting_module_1 = require("./company/setting/setting.module");
const billing_module_1 = require("./company/billing/billing.module");
const booking_module_1 = require("./booking/booking.module");
const disponibility_module_1 = require("./disponibility/disponibility.module");
const comments_module_1 = require("./comments/comments.module");
const pdf_module_1 = require("./pdf/pdf.module");
const user_favorites_module_1 = require("./user-favorites/user-favorites.module");
const notifications_module_1 = require("./notifications/notifications.module");
const global_module_1 = require("../global/global.module");
let PresentationModule = class PresentationModule {
};
PresentationModule = __decorate([
    common_1.Module({
        imports: [
            notifications_module_1.NotificationsModule,
            booking_module_1.BookingModule,
            services_module_1.ServicesModule,
            config_module_1.ConfigModule,
            infrastructure_module_1.InfrastructureModule,
            users_module_1.UsersModule,
            weddings_module_1.WeddingsModule,
            paiements_module_1.PaiementsModule,
            company_module_1.CompanyModule,
            option_module_1.OptionModule,
            setting_module_1.SettingModule,
            billing_module_1.BillingModule,
            disponibility_module_1.DisponibilityModule,
            comments_module_1.CommentsModule,
            pdf_module_1.PdfModule,
            user_favorites_module_1.UserFavoritesModule,
            global_module_1.GlobalModule
        ],
        exports: [config_module_1.ConfigModule, users_module_1.UsersModule],
        providers: []
    })
], PresentationModule);
exports.PresentationModule = PresentationModule;
//# sourceMappingURL=presentation.module.js.map