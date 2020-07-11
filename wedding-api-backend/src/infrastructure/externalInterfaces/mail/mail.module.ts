import { Module } from '@nestjs/common';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import * as path from 'path' ;
import { ConfigService } from '../../../presentation/config/config-service';

const configService: ConfigService = new ConfigService();


@Module({
  imports: [
    MailerModule.forRoot({
      transport: 'smtp://d48bd36dbb7d45:54107a3f4b8341@smtp.mailtrap.io',
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: path.resolve() + '/templates',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
})
export class MailModule {}
