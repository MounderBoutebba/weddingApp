"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bunyan = require("bunyan");
var logger = bunyan.createLogger({
    name: 'my-service',
    streams: [
        { stream: process.stdout, level: 'info' }
    ],
});
exports.customLogger = process.env.LOG_DEBUG ?
    function (action, metadata) { return console.warn(JSON.stringify({ action: action, metadata: metadata }, null, 1)); } :
    function (action, metadata) { return logger.info({ labels: { action: action }, metadata: metadata }); };
