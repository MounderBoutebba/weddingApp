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
const weddings_repository_1 = require("./weddings.repository");
const users_service_1 = require("../users/users.service");
let WeddingsServices = class WeddingsServices {
    constructor(weddingsRepository, usersServices) {
        this.weddingsRepository = weddingsRepository;
        this.usersServices = usersServices;
    }
    async createWedding(email, wedding) {
        wedding.client = await this.usersServices.findClientByEmail(email);
        return await this.weddingsRepository.save(wedding);
    }
    async findWedding(id, email) {
        return await this.weddingsRepository.findOneOrFail(id);
    }
    async findWeddingByEmail(email) {
        const client = await this.usersServices.findClientByEmail(email);
        const wed = await client.wedding;
        if (!wed) {
            throw new common_1.NotFoundException();
        }
        return wed;
    }
    async patchWedding(id, email, wedding) {
        const client = await this.usersServices.findClientByEmail(email);
        if (await client.wedding && (await client.wedding).id === id) {
            await this.weddingsRepository.update(id, wedding);
            return this.weddingsRepository.findOneOrFail(id);
        }
        else {
            throw new common_1.NotFoundException('wedding not found');
        }
    }
};
WeddingsServices = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(weddings_repository_1.WeddingsRepository)),
    __metadata("design:paramtypes", [weddings_repository_1.WeddingsRepository,
        users_service_1.UsersServices])
], WeddingsServices);
exports.WeddingsServices = WeddingsServices;
//# sourceMappingURL=weddings.service.js.map