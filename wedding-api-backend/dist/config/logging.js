"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan = require("bunyan");
const logger = bunyan.createLogger({
    name: 'my-service',
    streams: [
        { stream: process.stdout, level: 'info' }
    ],
});
exports.customLogger = process.env.LOG_DEBUG ?
    (action, metadata) => console.warn(JSON.stringify({ action, metadata }, null, 1)) :
    (action, metadata) => logger.info({ labels: { action }, metadata });
//# sourceMappingURL=logging.js.map