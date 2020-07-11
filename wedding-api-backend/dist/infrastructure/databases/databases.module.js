"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const presentation_module_1 = require("../../presentation/presentation.module");
const config_service_1 = require("../../presentation/config/config-service");
const users_service_1 = require("./users/users.service");
const services_repository_1 = require("./services/services.repository");
const users_repository_1 = require("./users/users.repository");
const clients_repository_1 = require("./users/clients.repository");
const providers_repository_1 = require("./users/providers.repository");
const weddings_service_1 = require("./weddings/weddings.service");
const weddings_repository_1 = require("./weddings/weddings.repository");
const elasticsearch_service_1 = require("./elasticsearch/elasticsearch.service");
const paiements_repository_service_1 = require("./paiements/paiements-repository.service");
const stripe_service_1 = require("../externalInterfaces/stripe/stripe.service");
const paiements_repository_1 = require("./paiements/paiements.repository");
const company_repository_1 = require("./company/company.repository");
const company_service_1 = require("./company/company.service");
const image_repository_1 = require("./company/image.repository");
const setting_repository_1 = require("./company/setting/setting.repository");
const option_repository_1 = require("./company/option/option.repository");
const option_service_1 = require("./company/option/option.service");
const setting_service_1 = require("./company/setting/setting.service");
const billing_repository_1 = require("./company/billing/billing.repository");
const billing_service_1 = require("./company/billing/billing.service");
const reservation_repository_1 = require("./reservations/reservation.repository");
const reservations_service_1 = require("./reservations/reservations.service");
const disponibility_repository_1 = require("./disponibility/disponibility.repository");
const disponibility_service_1 = require("./disponibility/disponibility.service");
const comments_service_1 = require("./comments/comments.service");
const comments_repository_1 = require("./comments/comments.repository");
const user_favorites_repository_1 = require("./user-favorites/user-favorites.repository");
const user_favorites_service_1 = require("./user-favorites/user-favorites.service");
const logging_1 = require("../../config/logging");
const path = require("path");
const commentsResponse_repository_1 = require("./comments/commentsResponse.repository");
const notifications_repository_1 = require("./notifications/notifications.repository");
const notifications_service_1 = require("./notifications/notifications.service");
const invoices_repository_1 = require("./invoices/invoices.repository");
const invoices_service_1 = require("./invoices/invoices.service");
const configService = new config_service_1.ConfigService();
logging_1.customLogger('ConfigService', {
    action: 'typeOrmConfig',
    host: configService.get(`DATABASE_HOST`),
    port: parseInt(configService.get(`DATABASE_PORT`), 10),
    username: configService.get(`DATABASE_USERNAME`),
    password: configService.get(`DATABASE_PASSWORD`),
    database: configService.get(`DATABASE_NAME`)
});
let typeOrmConfigExport = {
    type: configService.get(`DATABASE_TYPE`),
    host: configService.get(`DATABASE_HOST`),
    port: parseInt(configService.get(`DATABASE_PORT`), 10),
    username: configService.get(`DATABASE_USERNAME`),
    password: configService.get(`DATABASE_PASSWORD`),
    database: configService.get(`DATABASE_NAME`),
    entities: [path.join(__dirname, '**/*.entity.js')],
    migrationsRun: true,
    logging: true,
    logger: 'file',
    migrations: ['src/migration/*.js'],
    cli: {
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
        type: configService.get(`DATABASE_TYPE`),
        host: configService.get(`DATABASE_HOST`),
        username: configService.get(`DATABASE_USERNAME`),
        password: configService.get(`DATABASE_PASSWORD`),
        database: configService.get(`DATABASE_NAME`),
        entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
        migrationsRun: true,
        logging: false,
        migrations: [path.join(__dirname, '**/migrations/*.js')],
        cli: {
            migrationsDir: 'src/migrations'
        },
        synchronize: true,
        cache: {
            type: 'database',
            tableName: 'query_result_cache'
        }
    };
}
exports.typeOrmConfig = typeOrmConfigExport;
let DatabasesModule = class DatabasesModule {
};
DatabasesModule = __decorate([
    common_1.Global(),
    common_1.Module({
        imports: [
            presentation_module_1.PresentationModule,
            typeorm_1.TypeOrmModule.forRoot(exports.typeOrmConfig),
            typeorm_1.TypeOrmModule.forFeature([
                notifications_repository_1.NotificationsRepository,
                users_repository_1.UsersRepository,
                clients_repository_1.ClientsRepository,
                providers_repository_1.ProvidersRepository,
                weddings_repository_1.WeddingsRepository,
                paiements_repository_1.PaiementsRepository,
                company_repository_1.CompanyRepository,
                image_repository_1.ImageRepository,
                setting_repository_1.SettingRepository,
                option_repository_1.OptionRepository,
                billing_repository_1.BillingRepository,
                disponibility_repository_1.DisponibilityRepository,
                reservation_repository_1.ReservationRepository,
                comments_repository_1.CommentsRepository,
                user_favorites_repository_1.UserFavoritesRepository,
                commentsResponse_repository_1.CommentsResponseRepository,
                invoices_repository_1.InvoicesRepository
            ])
        ],
        providers: [
            notifications_service_1.NotificationsServiceDB,
            users_service_1.UsersServices,
            services_repository_1.ServicesRepository,
            weddings_service_1.WeddingsServices,
            elasticsearch_service_1.ElasticsearchService,
            paiements_repository_service_1.PaiementsRepositoryService,
            stripe_service_1.StripeService,
            company_service_1.CompanyServices,
            option_service_1.OptionServices,
            setting_service_1.SettingServices,
            billing_service_1.BillingServices,
            reservations_service_1.ReservationsService,
            disponibility_service_1.DisponibilityServiceDB,
            comments_service_1.CommentsServiceDB,
            user_favorites_service_1.UserFavoritesServices,
            invoices_service_1.InvoicesService
        ],
        exports: [
            notifications_service_1.NotificationsServiceDB,
            users_service_1.UsersServices,
            weddings_service_1.WeddingsServices,
            elasticsearch_service_1.ElasticsearchService,
            company_service_1.CompanyServices,
            paiements_repository_service_1.PaiementsRepositoryService,
            option_service_1.OptionServices,
            setting_service_1.SettingServices,
            billing_service_1.BillingServices,
            reservations_service_1.ReservationsService,
            disponibility_service_1.DisponibilityServiceDB,
            comments_service_1.CommentsServiceDB,
            user_favorites_service_1.UserFavoritesServices,
            invoices_service_1.InvoicesService
        ]
    })
], DatabasesModule);
exports.DatabasesModule = DatabasesModule;
//# sourceMappingURL=databases.module.js.map