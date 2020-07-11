"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let BookingGuard = class BookingGuard {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const userRole = user.role;
        console.log(userRole);
        const params = request.params;
        console.log('in booking guard ', user.id);
        console.log('in id', params.contractId);
        const objContract = await this.checkContratPremission(params.contractId);
        console.log('in ids ', objContract['company'].user.id);
        return true;
    }
    async checkContratPremission(id) {
        const contractObj = '';
        return contractObj;
    }
};
BookingGuard = __decorate([
    common_1.Injectable()
], BookingGuard);
exports.BookingGuard = BookingGuard;
//# sourceMappingURL=booking.guard.js.map