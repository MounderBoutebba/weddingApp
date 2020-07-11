import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { PresentationModule } from './presentation/presentation.module';
import { DatabasesModule } from './infrastructure/databases/databases.module';
import { StripeModule } from './infrastructure/externalInterfaces/stripe/stripe.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { GlobalModule } from './global/global.module';
import { MailModule } from './infrastructure/externalInterfaces/mail/mail.module';
import { StatusMonitorModule, } from 'nest-status-monitor';

const config={
	pageTitle: 'Nest.js Monitoring Page',
	port: 3000,
	path: '/status',
	ignoreStartsWith: '/health/alive',
	spans: [
		{
			interval: 1, // Every second
			retention: 60, // Keep 60 datapoints in memory
		},
		{
			interval: 5, // Every 5 seconds
			retention: 60,
		},
		{
			interval: 15, // Every 15 seconds
			retention: 60,
		}
	],
	chartVisibility: {
		cpu: true,
		mem: true,
		load: true,
		responseTime: true,
		rps: true,
		statusCodes: true,
	},
	healthChecks: [
		{
			protocol: 'http',
			host: 'localhost',
			path: '/api',
			port: 3000,
		}
	]
}

@Module({
	imports: [
		StatusMonitorModule.setUp(config),
		PresentationModule,
		DomainModule,
		InfrastructureModule,
		DatabasesModule,
		MulterModule,
		StripeModule,
		AuthModule,
		GlobalModule,
		MailModule,
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
