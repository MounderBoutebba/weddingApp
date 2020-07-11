import { Module } from '@nestjs/common';
import { ServicesModule } from '../../services/services.module';
import { OptionController } from './option.controller';
import { OptionService } from './option.service';

@Module({
	imports: [
		ServicesModule
	],
	controllers: [OptionController],
	providers: [OptionService]
})
export class OptionModule {}
