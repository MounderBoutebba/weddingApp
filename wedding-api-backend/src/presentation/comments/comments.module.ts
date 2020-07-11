import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { ConfigModule } from '../config/config.module';
import { CompanyModule } from '../company/company.module';
import { BookingService } from '../booking/booking.service';
import { BookingModule } from '../booking/booking.module';

@Module({
	controllers: [CommentsController],
	providers: [CommentsService],
	exports: [CommentsService],
	imports: [ConfigModule, CompanyModule,BookingModule]
})
export class CommentsModule {}
