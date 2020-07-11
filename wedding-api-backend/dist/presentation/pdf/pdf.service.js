"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const PlatformTools_1 = require("typeorm/platform/PlatformTools");
const PdfPrinter = require("pdfmake");
const uuid = require("uuid/v4");
let PdfService = class PdfService {
    async printPdf(body) {
        const buffer = Buffer.from('hello world', 'ascii');
        return buffer;
    }
    getReadableStream(buffer) {
        const stream = new PlatformTools_1.Readable();
        stream.push(buffer);
        stream.push(null);
        return stream;
    }
    pdfFile() {
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
                { text: 'google', link: 'http://google.com', pageBreak: 'before', },
                { qr: 'text in QR', foreground: 'green', background: 'white' },
            ],
            defaultStyle: {
                font: 'Helvetica'
            }
        };
        const options = {};
        let file_name = 'PDF' + uuid() + '.pdf';
        const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
        return pdfDoc;
    }
};
PdfService = __decorate([
    common_1.Injectable()
], PdfService);
exports.PdfService = PdfService;
//# sourceMappingURL=pdf.service.js.map