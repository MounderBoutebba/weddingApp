"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
function NoteDto(validationOptions) {
    return (object, propertyName) => {
        class_validator_1.registerDecorator({
            name: 'NoteDto',
            target: object.constructor,
            propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const note = isJson(value) ? JSON.parse(value) : false;
                    return note && isValidReview(note);
                },
            },
        });
    };
}
exports.NoteDto = NoteDto;
function isJson(str) {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
}
function isValidReview(note) {
    const keys = ['serviceQuality', 'profesionalisme', 'flexibility', 'rapportqualityPrice'];
    const point = new RegExp('[0-5]{1}');
    const dataKeys = Object.keys(note);
    for (let index = 0; index < keys.length; index++) {
        const element = keys[index];
        if (element in note && /^[1-5]{1}$/.test(note[element])) {
            continue;
        }
        else {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=Note.dto.js.map