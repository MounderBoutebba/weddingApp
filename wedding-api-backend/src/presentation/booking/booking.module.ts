import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { ConfigModule } from '../config/config.module';
import { CompanyModule } from '../company/company.module';
import { UsersModule } from '../users/users.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
	controllers: [BookingController],
    providers: [BookingService],
    exports: [BookingService],
	imports: [
		ConfigModule,
		CompanyModule,
		UsersModule,
		NotificationsModule
	]
})
export class BookingModule {}
