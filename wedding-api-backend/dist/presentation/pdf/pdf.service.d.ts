/// <reference types="node" />
import { Readable } from 'typeorm/platform/PlatformTools';
export declare class PdfService {
    printPdf(body: any): Promise<Buffer>;
    getReadableStream(buffer: Buffer): Readable;
    pdfFile(): any;
}
