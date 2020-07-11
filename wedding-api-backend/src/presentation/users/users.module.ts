import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigModule } from '../config/config.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
	imports: [
		ConfigModule,
		MulterModule
	],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService]
})
export class UsersModule {}
