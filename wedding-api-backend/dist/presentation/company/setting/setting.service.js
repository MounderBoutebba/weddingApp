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
const setting_service_1 = require("../../../infrastructure/databases/company/setting/setting.service");
let SettingService = class SettingService {
    constructor(settingServices) {
        this.settingServices = settingServices;
    }
    async createSetting(setting) {
        const createdSetting = await this.settingServices.createSetting(setting);
        return createdSetting;
    }
    async deleteSetting(id, company) {
        return await this.settingServices.deleteSetting(id, company);
    }
    async getSetting(id) {
        return this.settingServices.getSetting(id);
    }
    async patchSetting(id, setting, company) {
        return await this.settingServices.patchSetting(id, setting, company);
    }
};
SettingService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [setting_service_1.SettingServices])
], SettingService);
exports.SettingService = SettingService;
//# sourceMappingURL=setting.service.js.map