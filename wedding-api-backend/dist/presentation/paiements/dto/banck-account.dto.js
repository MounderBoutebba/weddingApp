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
const swagger_1 = require("@nestjs/swagger");
class BankAccountDto {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], BankAccountDto.prototype, "country", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], BankAccountDto.prototype, "currency", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], BankAccountDto.prototype, "account_holder_name", void 0);
__decorate([
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], BankAccountDto.prototype, "account_holder_type", void 0);
__decorate([
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], BankAccountDto.prototype, "account_number", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], BankAccountDto.prototype, "address", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], BankAccountDto.prototype, "bank_name", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], BankAccountDto.prototype, "firstname", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], BankAccountDto.prototype, "lastname", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], BankAccountDto.prototype, "postalCode", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], BankAccountDto.prototype, "dateOfBirth", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], BankAccountDto.prototype, "city", void 0);
exports.BankAccountDto = BankAccountDto;
//# sourceMappingURL=banck-account.dto.js.map