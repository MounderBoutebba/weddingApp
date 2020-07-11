import { Module } from '@nestjs/common';
import { UserFavoritesController } from './user-favorites.controller';
import { UserFavoritesService } from './user-favorites.service';
import { CompanyModule } from '../company/company.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [CompanyModule, UsersModule],
  controllers: [UserFavoritesController],
  providers: [UserFavoritesService],
  exports: [UserFavoritesService]
})
export class UserFavoritesModule {}
