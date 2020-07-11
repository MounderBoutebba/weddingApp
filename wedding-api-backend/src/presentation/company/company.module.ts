import { forwardRef, Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { MulterModule } from '@nestjs/platform-express';
import { ServicesModule } from '../services/services.module';

@Module({
	imports: [
		MulterModule,
		forwardRef(() => ServicesModule)
	],
	controllers: [CompanyController],
	providers: [CompanyService],
	exports: [CompanyService]
})
export class CompanyModule {}
