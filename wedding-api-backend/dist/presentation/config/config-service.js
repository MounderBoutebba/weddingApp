"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const fs = require("fs");
const logging_1 = require("../../config/logging");
class ConfigService {
    constructor() {
        logging_1.customLogger('ConfigService', {
            action: 'init Config Service',
            env_var: process.env.NODE_ENV
        });
        if (!process.env.NODE_ENV) {
            process.env.NODE_ENV = 'production';
        }
        this.envConfig = dotenv.parse(fs.readFileSync(`${process.env.NODE_ENV}.env`));
    }
    get(key) {
        return this.envConfig[key];
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config-service.js.map