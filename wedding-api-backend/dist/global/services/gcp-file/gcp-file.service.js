"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const googleCloudStorage = require("@google-cloud/storage");
const config_service_1 = require("../../../presentation/config/config-service");
const path_1 = require("path");
let GcpFileService = class GcpFileService {
    constructor() {
        this.configService = new config_service_1.ConfigService();
        this.storage = new googleCloudStorage.Storage({
            projectId: this.configService.get('GCLOUD_PROJECT'),
            keyFilename: path_1.resolve(this.configService.get('GCS_KEYFILE'))
        });
    }
    async uploadFile(bucketName, filename, gcsname) {
        const file = this.storage.bucket(bucketName).file(gcsname);
        const stream = file.createWriteStream({
            metadata: {
                contentType: filename.mimetype
            },
            resumable: false
        });
        stream.on('error', (err) => {
            return 'error upload';
        });
        stream.on('finish', () => {
            return 'sucess upload';
        });
        stream.end(filename.buffer);
    }
    async getUrlFile(gcsname) {
        const file = this.storage
            .bucket(this.configService.get('GCS_BUCKET'))
            .file(gcsname);
        return await file.getSignedUrl({
            action: 'read',
            expires: '03-09-2491'
        });
    }
    async removeFile(gcsname) {
        const name = gcsname.split('/');
        if (name.length >= 4) {
            const file = this.storage
                .bucket(this.configService.get('GCS_BUCKET'))
                .file((gcsname.split('/')[4]).split('?')[0])
                .delete();
            return await file;
        }
        return;
    }
};
GcpFileService = __decorate([
    common_1.Injectable()
], GcpFileService);
exports.GcpFileService = GcpFileService;
//# sourceMappingURL=gcp-file.service.js.map