import { GcpFileService } from './global/services/gcp-file/gcp-file.service';
import express = require('express');
export declare class AppController {
    private readonly gcpFileService;
    constructor(gcpFileService: GcpFileService);
    getCompany(path: any, res: any): Promise<any>;
    getProfile(path: any, res: any): Promise<any>;
    getSupprtedMethods(response: Response): Promise<Response>;
    secretEndpoint(req: express.Request): string;
}
