import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { ServicesModule } from '../../services/services.module';

@Module({
	imports: [
		ServicesModule
	],
	controllers: [BillingController],
	providers: [BillingService]
})
export class BillingModule {}
