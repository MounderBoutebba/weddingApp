import {Module} from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { ConfigModule } from '../config/config.module';


@Module({
	controllers: [NotificationsController],
	providers: [NotificationsService],
	exports: [NotificationsService],
	imports: [ConfigModule]
})
export class NotificationsModule {}
