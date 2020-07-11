import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../presentation/config/config-service';
import { UsersService } from '../../presentation/users/users.service';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	private readonly usersService: UsersService;

	constructor(usersService: UsersService) {
		const configService = new ConfigService();
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get('JWT_SECRET')
			// audience: configService.get('JWT_AUDIENCE'),
			// issuer: `${configService.get('JWT_ISSUER')}`,
			// algorithms: [configService.get('JWT_ALGORITHM')]
		});
		this.usersService = usersService;
	}

	async validate(payload: any) {
		return await this.usersService.getUserByEmail(payload.email);
	}
}
