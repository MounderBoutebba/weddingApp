"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const PdfPrinter = require("pdfmake");
const uuid = require("uuid/v4");
const pdf_service_1 = require("./pdf.service");
let PdfController = class PdfController {
    constructor(pdfService) {
        this.pdfService = pdfService;
    }
    generatePDF(res) {
        const fonts = {
            Helvetica: {
                normal: 'Helvetica',
                bold: 'Helvetica-Bold',
                italics: 'Helvetica-Oblique',
                bolditalics: 'Helvetica-BoldOblique'
            }
        };
        const printer = new PdfPrinter(fonts);
        const docDefinition = {
            content: [
                { text: 'Heading', fontSize: 25 },
                {
                    layout: 'lightHorizontalLines',
                    table: {
                        headerRows: 1,
                        widths: ['*', 'auto', 100, '*'],
                        body: [
                            ['First', 'Second', 'Third', 'The last one'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
                            ['Val 1', 'Val 2', 'Val 3', 'Val 4']
                        ],
                    },
                },
            ],
            defaultStyle: {
                font: 'Helvetica'
            }
        };
        const options = {};
        let file_name = 'PDF' + uuid() + '.pdf';
        const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
        pdfDoc.pipe(res);
        pdfDoc.end();
    }
};
__decorate([
    common_1.Get('/gen'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    common_1.Header('Content-Type', 'application/pdf'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PdfController.prototype, "generatePDF", null);
PdfController = __decorate([
    common_1.Controller('pdf'),
    __metadata("design:paramtypes", [pdf_service_1.PdfService])
], PdfController);
exports.PdfController = PdfController;
//# sourceMappingURL=pdf.controller.js.map