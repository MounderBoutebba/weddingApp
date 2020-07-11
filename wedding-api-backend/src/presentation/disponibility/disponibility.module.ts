import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { CompanyModule } from '../company/company.module';
import { DisponibilityController } from './disponibility.controller';
import { DisponibilityService } from './disponibility.service';

@Module({
	controllers: [DisponibilityController],
	providers: [DisponibilityService],
	exports: [DisponibilityService],
	imports: [ConfigModule, InfrastructureModule, forwardRef(() => CompanyModule)]
})
export class DisponibilityModule {}
