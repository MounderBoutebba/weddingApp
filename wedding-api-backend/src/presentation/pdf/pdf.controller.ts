import { Get, Controller, HttpCode, HttpStatus, Header, Res } from '@nestjs/common' ;
import * as PdfPrinter from 'pdfmake';
import * as uuid from 'uuid/v4';
import { PdfService } from './pdf.service';
import { Response } from 'express';

@Controller('pdf')
export class PdfController {

    constructor( private pdfService: PdfService ) {}

  @Get('/gen')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'application/pdf')
  generatePDF(@Res() res: Response) {
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
        { text: 'Heading', fontSize: 25},
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            headerRows: 1,
            widths: [ '*', 'auto', 100, '*' ],

            body: [
              [ 'First', 'Second', 'Third', 'The last one' ],
              [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
              [ 'Val 1', 'Val 2', 'Val 3', 'Val 4' ]
            ],
          },
        },
        /*{text: 'google', link: 'http://google.com', pageBreak: 'before',},
        { qr: 'text in QR', foreground: 'green', background: 'white' },*/
      ],
      defaultStyle: {
        font: 'Helvetica'
      }
    };

    const options = {
    };
    let file_name = 'PDF' + uuid() + '.pdf';
    const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
    /*pdfDoc.pipe(fs.createWriteStream(file_name));
    pdfDoc.end();*/
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

}
