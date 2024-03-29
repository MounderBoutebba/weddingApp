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
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const disponibility_entity_1 = require("../../../infrastructure/databases/entities/disponibility.entity");
class CreateDisponibilityDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsDateString(),
    __metadata("design:type", Date)
], CreateDisponibilityDto.prototype, "start", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsDateString(),
    __metadata("design:type", Date)
], CreateDisponibilityDto.prototype, "end", void 0);
__decorate([
    swagger_1.ApiProperty({ enum: disponibility_entity_1.DiponibilityType }),
    class_validator_1.IsEnum(disponibility_entity_1.DiponibilityType),
    __metadata("design:type", String)
], CreateDisponibilityDto.prototype, "type", void 0);
exports.CreateDisponibilityDto = CreateDisponibilityDto;
//# sourceMappingURL=disponibility.dto.js.map