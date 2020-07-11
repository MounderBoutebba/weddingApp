import { BadRequestException, Injectable } from '@nestjs/common';
import { WeddingEntity } from '../../infrastructure/databases/entities';
import { WeddingsServices } from '../../infrastructure/databases/weddings/weddings.service';
import { Twilio } from 'twilio';
import { ConfigService } from '../config/config-service';

@Injectable()
export class WeddingsService {
	private readonly twilio: Twilio;

	constructor(private readonly weddingsService: WeddingsServices, private readonly configService: ConfigService) {
		this.twilio = new Twilio(configService.get('ACCOUNT_SID'), configService.get('AUTH_TOKEN'));
	}

	async patchWedding(id: string, email: string, wedding: Partial<WeddingEntity>) {
		let dbWedding = await this.weddingsService.findWedding(id, email);
		if (
			dbWedding.phoneVerified &&
			dbWedding.conjointPhone.toString() ===
				wedding.conjointPhone.country + wedding.conjointPhone.phoneNumber.slice(1)
		) {
			dbWedding = await this.weddingsService.patchWedding(id, email, wedding);
		} else if (!!wedding.phoneToken && dbWedding.phoneToken === wedding.phoneToken) {
			wedding.phoneVerified = true;
			dbWedding = await this.weddingsService.patchWedding(id, email, wedding);
		} else {
			wedding.phoneToken = `${Math.floor(Math.random() * 1000000)}`;
			wedding.phoneVerified = false;
			dbWedding = await this.weddingsService.patchWedding(id, email, wedding);
			try {
				const res = await this.twilio.messages.create({
					body:
						'Bienvenue chez Winwez, voici le code à saisir afin de valider votre compte ' +
						wedding.phoneToken,
					from: this.configService.get('PHONE_NUMBER'),
					to: wedding.conjointPhone.country + wedding.conjointPhone.phoneNumber.slice(1)
				});
				console.log(res);
			} catch (e) {
				throw new BadRequestException(e.message);
			}
		}
		return dbWedding;
	}

	async createWedding(email: any, wedding: WeddingEntity) {
		wedding.phoneToken = `${Math.floor(Math.random() * 1000000)}`;
		const createdWedding = await this.weddingsService.createWedding(email, wedding);
		try {
			const res = await this.twilio.messages.create({
				body:
					'Bienvenue chez Winwez, voici le code à saisir afin de valider votre compte ' + wedding.phoneToken,
				from: this.configService.get('PHONE_NUMBER'),
				to: wedding.conjointPhone.country + wedding.conjointPhone.phoneNumber.slice(1)
			});
			console.log(res);
		} catch (e) {
			throw new BadRequestException(e.message);
		}
		return createdWedding;
	}

	async findWedding(id: string, email: string): Promise<WeddingEntity> {
		return await this.weddingsService.findWedding(id, email);
	}

	async findWeddingByEmail(email: any) {
		return await this.weddingsService.findWeddingByEmail(email);
	}
}
