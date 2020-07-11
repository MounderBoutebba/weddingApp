import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Client, Provider, User } from '../../domain/entities/user.model';
import { CreateUser } from '../../domain/usecases/services/create-user.usecase';
import { UserEntity } from '../../infrastructure/databases/entities';
import { UsersServices } from '../../infrastructure/databases/users/users.service';
import { Twilio } from 'twilio';
import { ConfigService } from '../config/config-service';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import { GcpFileService } from '../../global/services/gcp-file/gcp-file.service';
import { VerifiedDto } from './dto/verified.dto';

@Injectable()
export class UsersService {
	private readonly createUsersUsecase: CreateUser<UsersServices>;
	private readonly twilio: Twilio;

	constructor(
		private usersServices: UsersServices,
		private readonly gcpFileService: GcpFileService,
		private readonly configService: ConfigService
	) {
		this.createUsersUsecase = new CreateUser(this.usersServices);
		this.twilio = new Twilio(configService.get('ACCOUNT_SID'), configService.get('AUTH_TOKEN'));
	}

	public getUserInfo(): User {
		return this.createUsersUsecase.getUserInfo();
	}

	public getUsers(): Promise<UserEntity[]> {
		return this.usersServices.getUsers();
	}

	public async getUserByEmail(email: string): Promise<UserEntity> {
		return this.usersServices.findUserByEmail(email);
	}

	public async findUser(id: string): Promise<UserEntity> {
		return this.usersServices.findUserById(id);
	}

	async createUser(user: User) {
		try {
			return await this.createUsersUsecase.createUser(user);
		} catch (err) {
			throw new ConflictException(err.message);
		}
	}

	async createClient(user: Client) {
		try {
			return await this.usersServices.createClient(user);
		} catch (err) {
			throw new ConflictException(err.message);
		}
	}

	async createProvider(user: Provider) {
		try {
			return await this.usersServices.createProvider(user);
		} catch (err) {
			throw new ConflictException(err.message);
		}
	}

	public async patchUserLastConnexion(email: string, user: Partial<UserEntity>) {
		try {
			const createdUser = await this.usersServices.updateUser(email, user);
			return createdUser;
		} catch (err) {
			throw err;
		}
	}

	public async patchUser(email: string, user: Partial<UserEntity>) {
		try {
			const currentUser = await this.usersServices.findUserByEmail(email);
			let createdUser = { ...currentUser };
			if (
				currentUser.phoneVerified &&
				currentUser.phone.toString() ===
					(!!user.phone ? user.phone.country + user.phone.phoneNumber.slice(1) : '')
			) {
				createdUser = await this.usersServices.updateUser(email, user);
			} else if (!!user.phoneToken && currentUser.phoneToken === user.phoneToken) {
				user.phoneVerified = true;
				createdUser = await this.usersServices.updateUser(email, user);
			} else if (!!user.phone && !!user.phone.phoneNumber && !!user.phone.country) {
				if (currentUser.phone.toString() !== user.phone.country + user.phone.phoneNumber.slice(1)) {
					currentUser.phoneTokenRequestCount = 0;
				}
				if (
					!(
						currentUser.phone.toString() === user.phone.country + user.phone.phoneNumber.slice(1) &&
						currentUser.phoneTokenRequestCount > 5
					)
				) {
					user.phoneToken = `${Math.floor(Math.random() * 1000000)}`;
					user.phoneVerified = false;
					createdUser = await this.usersServices.updateUser(email, user);
					try {
						const res = await this.twilio.messages.create({
							// @ts-ignore
							body:
								'Bienvenue chez Winwez, voici le code à saisir afin de valider votre compte ' +
								user.phoneToken,
							from: this.configService.get('PHONE_NUMBER'),
							to: user.phone.country + user.phone.phoneNumber.slice(1)
						});
						user.phoneTokenRequestCount = currentUser.phoneTokenRequestCount + 1;
						console.log(res);
					} catch (e) {
						throw new BadRequestException(e.message);
					}
				}
			} else {
				throw new BadRequestException('impossible de mettre a jour le utilisateur');
			}

			return createdUser;
		} catch (err) {
			throw err;
			if (err.status === 404) {
				throw new NotFoundException(err.message);
			} else {
				throw new BadRequestException(err.message);
			}
		}
	}

	public async confirmUser(email: string, user: Partial<UserEntity>) {
		try {
			const usser = await this.usersServices.findUserByEmail(email);
			if (usser.phoneToken === user.phoneToken) {
				user.phoneVerified = true;
			} else {
				throw new NotFoundException();
			}
			return await this.usersServices.updateUser(email, user);
		} catch (err) {
			throw new NotFoundException(err.message);
		}
	}

	public static filename(req, file, cb) {
		return cb(null, `${uuid()}${extname(file.originalname)}`);
	}

	public static fileFilter(req1, file, callback) {
		if (['.jpg', '.jpeg', '.png', '.webp', '.bmp'].includes(extname(file.originalname).toLocaleLowerCase())) {
			return callback(null, true);
		} else {
			return callback(new BadRequestException('File format is not valid , accept only images'), false);
		}
	}

	public async changePhoto(email: any, filename: any) {
		const currentUser = await this.usersServices.findUserByEmail(email);
		const oldPhoto = currentUser.photo;
		if (!!oldPhoto) {
			await this.gcpFileService.removeFile(currentUser.photo);
			// unlink(`${currentUser.photo}`, err => {console.log(err);});
		}
		currentUser.photo = `${filename}`;

		return await this.usersServices.updateUser(email, currentUser);
	}

	async deleteUser(email: any) {
		const user = await this.usersServices.findUserByEmail(email);
		return await this.usersServices.delete(user);
	}

	async markUserAsVerified(email: any, data: VerifiedDto) {
		const currentUser = await this.usersServices.findProviderByEmail(email);
		return await this.usersServices.markProviderAsVerified(currentUser, data);
	}
}
