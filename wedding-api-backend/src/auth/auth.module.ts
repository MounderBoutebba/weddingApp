import { Module } from '@nestjs/common';
import { JwtStrategy } from './passport/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../presentation/users/users.module';

@Module({
	imports: [PassportModule, UsersModule],
	providers: [JwtStrategy],
	exports: [JwtStrategy]
})
export class AuthModule {
}
