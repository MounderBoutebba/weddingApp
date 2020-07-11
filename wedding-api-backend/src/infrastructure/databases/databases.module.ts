import { Global, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PresentationModule } from '../../presentation/presentation.module';
import { ConfigService } from '../../presentation/config/config-service';
import { UsersServices } from './users/users.service';
import { ServicesRepository } from './services/services.repository';
import { UsersRepository } from './users/users.repository';
import { ClientsRepository } from './users/clients.repository';
import { ProvidersRepository } from './users/providers.repository';
import { WeddingsServices } from './weddings/weddings.service';
import { WeddingsRepository } from './weddings/weddings.repository';
import { ElasticsearchService } from './elasticsearch/elasticsearch.service';
import { PaiementsRepositoryService } from './paiements/paiements-repository.service';
import { StripeService } from '../externalInterfaces/stripe/stripe.service';
import { PaiementsRepository } from './paiements/paiements.repository';
import { CompanyRepository } from './company/company.repository';
import { CompanyServices } from './company/company.service';
import { ImageRepository } from './company/image.repository';
import { SettingRepository } from './company/setting/setting.repository';
import { OptionRepository } from './company/option/option.repository';
import { OptionServices } from './company/option/option.service';
import { SettingServices } from './company/setting/setting.service';
import { BillingRepository } from './company/billing/billing.repository';
import { BillingServices } from './company/billing/billing.service';
import { ReservationRepository } from './reservations/reservation.repository';
import { ReservationsService } from './reservations/reservations.service';
import { DisponibilityRepository } from './disponibility/disponibility.repository';
import { DisponibilityServiceDB } from './disponibility/disponibility.service';
import { CommentsServiceDB } from './comments/comments.service';
import { CommentsRepository } from './comments/comments.repository';
import { UserFavoritesRepository } from './user-favorites/user-favorites.repository';
import { UserFavoritesServices } from './user-favorites/user-favorites.service';

import { customLogger } from '../../config/logging';

import * as path from 'path';
import { CommentsResponseRepository } from './comments/commentsResponse.repository';
import { NotificationsRepository } from './notifications/notifications.repository';
import { NotificationsServiceDB } from './notifications/notifications.service';
import { InvoicesRepository } from './invoices/invoices.repository';
import { InvoicesService } from './invoices/invoices.service';

const configService = new ConfigService();

customLogger('ConfigService', {
	action: 'typeOrmConfig',
	host: configService.get(`DATABASE_HOST`),
	port: parseInt(configService.get(`DATABASE_PORT`), 10),
	username: configService.get(`DATABASE_USERNAME`),
	password: configService.get(`DATABASE_PASSWORD`),
	database: configService.get(`DATABASE_NAME`)
});

let typeOrmConfigExport: TypeOrmModuleOptions = {
	type: configService.get(`DATABASE_TYPE`) as any,
	host: configService.get(`DATABASE_HOST`),
	port: parseInt(configService.get(`DATABASE_PORT`), 10),
	username: configService.get(`DATABASE_USERNAME`),
	password: configService.get(`DATABASE_PASSWORD`),
	database: configService.get(`DATABASE_NAME`),
	entities: [path.join(__dirname, '**/*.entity.js')],
	migrationsRun: true,
	logging: true,
	logger: 'file',
	// Allow both start:prod and start:dev to use migrations
	// __dirname is either dist or src folder, meaning either
	// the compiled js in prod or the ts in dev.
	migrations: ['src/migration/*.js'],
	cli: {
		// Location of migration should be inside src folder
		// to be compiled into dist/ folder.
		migrationsDir: 'src/migrations'
	},
	synchronize: true,
	extra: { max: 1, min: 1 },
	cache: {
		type: 'database',
		tableName: 'query_result_cache'
	}
};

if (process.env.NODE_ENV === 'gcp') {
	typeOrmConfigExport = {
		type: configService.get(`DATABASE_TYPE`) as any,
		host: configService.get(`DATABASE_HOST`),
		username: configService.get(`DATABASE_USERNAME`),
		password: configService.get(`DATABASE_PASSWORD`),
		database: configService.get(`DATABASE_NAME`),
		entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
		migrationsRun: true,
		logging: false,
		//  logger: 'file',
		// Allow both start:prod and start:dev to use migrations
		// __dirname is either dist or src folder, meaning either
		// the compiled js in prod or the ts in dev.
		migrations: [path.join(__dirname, '**/migrations/*.js')],
		cli: {
			// Location of migration should be inside src folder
			// to be compiled into dist/ folder.
			migrationsDir: 'src/migrations'
		},
		synchronize: true,
		cache: {
			type: 'database',
			tableName: 'query_result_cache'
		}
	};
}

export const typeOrmConfig: TypeOrmModuleOptions = typeOrmConfigExport;

@Global()
@Module({
	imports: [
		PresentationModule,
		TypeOrmModule.forRoot(typeOrmConfig),
		TypeOrmModule.forFeature([
			NotificationsRepository,
			UsersRepository,
			ClientsRepository,
			ProvidersRepository,
			WeddingsRepository,
			PaiementsRepository,
			CompanyRepository,
			ImageRepository,
			SettingRepository,
			OptionRepository,
			BillingRepository,
			DisponibilityRepository,
			ReservationRepository,
			CommentsRepository,
			UserFavoritesRepository,
			CommentsResponseRepository,
			InvoicesRepository
		])
	],
	providers: [
		NotificationsServiceDB,
		UsersServices,
		ServicesRepository,
		WeddingsServices,
		ElasticsearchService,
		PaiementsRepositoryService,
		StripeService,
		CompanyServices,
		OptionServices,
		SettingServices,
		BillingServices,
		ReservationsService,
		DisponibilityServiceDB,
		CommentsServiceDB,
		UserFavoritesServices,
		InvoicesService
	],
	exports: [
		NotificationsServiceDB,
		UsersServices,
		WeddingsServices,
		ElasticsearchService,
		CompanyServices,
		PaiementsRepositoryService,
		OptionServices,
		SettingServices,
		BillingServices,
		ReservationsService,
		DisponibilityServiceDB,
		CommentsServiceDB,
		UserFavoritesServices,
		InvoicesService
	]
})
export class DatabasesModule {}
