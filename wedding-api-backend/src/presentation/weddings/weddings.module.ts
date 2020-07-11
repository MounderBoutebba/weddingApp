import { Module } from '@nestjs/common';
import { WeddingsController } from './weddings.controller';
import { WeddingsService } from './weddings.service';
import { ConfigModule } from '../config/config.module';

@Module({
	imports: [
		ConfigModule
	],
	controllers: [WeddingsController],
	providers: [WeddingsService]
})
export class WeddingsModule {}
