"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
function mapEsObj(obj, prifix) {
    const keyValues = Object.keys(obj).map(key => {
        const regex = new RegExp(`(${prifix.join('|')})`, 'g');
        const newKey = key.replace(regex, '');
        return { [newKey]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
}
exports.mapEsObj = mapEsObj;
function checkAndConvertDate(strDate) {
    try {
        const parsedDate = Date.parse(strDate.toString()) || 0;
        console.log(parsedDate);
        return parsedDate;
    }
    catch (error) {
        throw new common_1.BadRequestException('NOT_VALID_DATE');
    }
}
exports.checkAndConvertDate = checkAndConvertDate;
//# sourceMappingURL=helpersFunctions.js.map