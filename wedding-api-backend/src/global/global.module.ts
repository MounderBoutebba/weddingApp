import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { RolesGuard } from './guards/roles.guard';
import { GcpFileService } from './services/gcp-file/gcp-file.service';
// import { NodemailerModule } from '@iaminfinity/nodemailer';
import { ConfigService } from '../presentation/config/config-service';
import { EmailService } from './services/mail/email.service';

const configService: ConfigService = new ConfigService();

@Global()
@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' })
		/*	NodemailerModule.register({
			host: configService.get(`MAIL_HOST`),
			port: (configService.get(`MAIL_PORT`) as unknown) as number,
			secure: false,
			auth: {
				user: configService.get(`MAIL_USER`),
				pass: configService.get(`MAIL_PASSWORD`)
			}
		})*/
	],
	providers: [RolesGuard, GcpFileService, EmailService],
	exports: [EmailService, PassportModule, RolesGuard, GcpFileService]
})
export class GlobalModule {}
