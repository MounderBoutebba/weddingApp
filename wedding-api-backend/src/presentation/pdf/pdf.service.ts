import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Readable } from 'typeorm/platform/PlatformTools';
import * as fs from 'fs';
import * as PdfPrinter from 'pdfmake';
import * as uuid from 'uuid/v4';

@Injectable( )
export class PdfService {

    async printPdf(body): Promise<Buffer> {
        // ...
        const buffer = Buffer.from('hello world', 'ascii');
        return buffer;
      }
      
      getReadableStream(buffer: Buffer): Readable {
        const stream = new Readable();
      
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
              { text: 'Heading', fontSize: 25},
              {
                layout: 'lightHorizontalLines', // optional
                table: {
                  headerRows: 1,
                  widths: [ '*', 'auto', 100, '*' ],
       
                  body: [
                    [ 'First', 'Second', 'Third', 'The last one' ],
                    [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
                    [ 'Val 1','Val 2', 'Val 3', 'Val 4' ]
                  ],
                },
              },
              {text: 'google', link: 'http://google.com', pageBreak: 'before',},
              { qr: 'text in QR', foreground: 'green', background: 'white' },
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
          return pdfDoc;
    }
}
