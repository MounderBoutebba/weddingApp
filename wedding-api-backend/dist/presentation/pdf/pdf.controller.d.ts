import { PdfService } from './pdf.service';
import { Response } from 'express';
export declare class PdfController {
    private pdfService;
    constructor(pdfService: PdfService);
    generatePDF(res: Response): void;
}
