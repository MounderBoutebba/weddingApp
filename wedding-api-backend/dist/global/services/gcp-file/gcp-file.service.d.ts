import * as googleCloudStorage from '@google-cloud/storage';
export declare class GcpFileService {
    private readonly configService;
    private storage;
    uploadFile(bucketName: any, filename: any, gcsname: string): Promise<void>;
    getUrlFile(gcsname: string): Promise<googleCloudStorage.GetSignedUrlResponse>;
    removeFile(gcsname: string): Promise<[import("teeny-request").Response<any>]>;
}
