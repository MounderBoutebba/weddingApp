import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { CompanyModule } from '../company/company.module';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';

@Module({
	controllers: [PdfController],
	providers: [PdfService],
	exports: [PdfService],
	imports: [ConfigModule, InfrastructureModule, forwardRef(() => CompanyModule)]
})
export class PdfModule {}
