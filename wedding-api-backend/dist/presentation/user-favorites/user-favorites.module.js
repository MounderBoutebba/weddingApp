"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const user_favorites_controller_1 = require("./user-favorites.controller");
const user_favorites_service_1 = require("./user-favorites.service");
const company_module_1 = require("../company/company.module");
const users_module_1 = require("../users/users.module");
let UserFavoritesModule = class UserFavoritesModule {
};
UserFavoritesModule = __decorate([
    common_1.Module({
        imports: [company_module_1.CompanyModule, users_module_1.UsersModule],
        controllers: [user_favorites_controller_1.UserFavoritesController],
        providers: [user_favorites_service_1.UserFavoritesService],
        exports: [user_favorites_service_1.UserFavoritesService]
    })
], UserFavoritesModule);
exports.UserFavoritesModule = UserFavoritesModule;
//# sourceMappingURL=user-favorites.module.js.map