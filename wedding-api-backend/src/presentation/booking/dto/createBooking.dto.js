"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var class_validator_1 = require("class-validator");
var CreateBookingDto = /** @class */ (function () {
    function CreateBookingDto() {
    }
    __decorate([
        class_validator_1.IsUUID()
    ], CreateBookingDto.prototype, "userId", void 0);
    __decorate([
        class_validator_1.IsNotEmptyObject()
    ], CreateBookingDto.prototype, "location", void 0);
    __decorate([
        class_validator_1.IsArray()
    ], CreateBookingDto.prototype, "categories", void 0);
    __decorate([
        class_validator_1.IsDate()
    ], CreateBookingDto.prototype, "start", void 0);
    __decorate([
        class_validator_1.IsDate()
    ], CreateBookingDto.prototype, "end", void 0);
    __decorate([
        class_validator_1.IsNotEmptyObject()
    ], CreateBookingDto.prototype, "order", void 0);
    return CreateBookingDto;
}());
exports.CreateBookingDto = CreateBookingDto;
