import { Module } from '@nestjs/common';
import { ServicesModule } from './services/services.module';
import { ConfigModule } from './config/config.module';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { UsersModule } from './users/users.module';
import { WeddingsModule } from './weddings/weddings.module';
import { CompanyModule } from './company/company.module';
import { PaiementsModule } from './paiements/paiements.module';
import { OptionModule } from './company/option/option.module';
import { SettingModule } from './company/setting/setting.module';
import { BillingModule } from './company/billing/billing.module';
import { BookingModule } from './booking/booking.module';
import { DisponibilityModule } from './disponibility/disponibility.module';
import { CommentsModule } from './comments/comments.module';
import { PdfModule } from './pdf/pdf.module';
import { UserFavoritesModule } from './user-favorites/user-favorites.module';
import { NotificationsModule } from './notifications/notifications.module';
import { GlobalModule } from '../global/global.module';

@Module({
	imports: [
		NotificationsModule,
		BookingModule,
		ServicesModule,
		ConfigModule,
		InfrastructureModule,
		UsersModule,
		WeddingsModule,
		PaiementsModule,
		CompanyModule,
		OptionModule,
		SettingModule,
		BillingModule,
		DisponibilityModule,
		CommentsModule,
		PdfModule,
		UserFavoritesModule,
		GlobalModule
	],
	exports: [ConfigModule, UsersModule],
	providers: []
})
export class PresentationModule {}
