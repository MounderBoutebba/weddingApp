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
const option_service_1 = require("../../../infrastructure/databases/company/option/option.service");
let OptionService = class OptionService {
    constructor(optionServices) {
        this.optionServices = optionServices;
    }
    async createOption(option, email) {
        const createdOption = await this.optionServices.createOption(option, email);
        return createdOption;
    }
    async deleteOption(id, company) {
        return await this.optionServices.deleteOption(id, company);
    }
    async getOption(id) {
        return this.optionServices.getOption(id);
    }
    async patchOption(id, option, company) {
        return await this.optionServices.patchOption(id, option, company);
    }
};
OptionService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [option_service_1.OptionServices])
], OptionService);
exports.OptionService = OptionService;
//# sourceMappingURL=option.service.js.map