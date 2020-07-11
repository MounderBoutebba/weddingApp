import { forwardRef, Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { ConfigModule } from '../config/config.module';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { CompanyModule } from '../company/company.module';
import { UserFavoritesModule } from '../user-favorites/user-favorites.module';

@Module({
	controllers: [ServicesController],
	providers: [ServicesService],
	exports: [ServicesService],
	imports: [ConfigModule, UserFavoritesModule, InfrastructureModule, forwardRef(() => CompanyModule)]
})
export class ServicesModule {}
