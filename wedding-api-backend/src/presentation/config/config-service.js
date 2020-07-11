"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var fs = require("fs");
var logging_1 = require("../../config/logging");
var ConfigService = /** @class */ (function () {
    function ConfigService() {
        logging_1.customLogger('ConfigService', {
            action: 'init Config Service',
            env_var: process.env.NODE_ENV
        });
        if (!process.env.NODE_ENV) {
            process.env.NODE_ENV = 'production';
        }
        this.envConfig = dotenv.parse(fs.readFileSync(process.env.NODE_ENV + ".env"));
    }
    ConfigService.prototype.get = function (key) {
        return this.envConfig[key];
    };
    return ConfigService;
}());
exports.ConfigService = ConfigService;
