import { Module } from '@nestjs/common';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';
import { ServicesModule } from '../../services/services.module';

@Module({
	imports: [
		ServicesModule
	],
	controllers: [SettingController],
	providers: [SettingService]
})
export class SettingModule {}
