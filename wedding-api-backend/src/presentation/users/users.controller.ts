import {
	Body,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	HttpCode,
	HttpStatus,
	NotFoundException,
	Param,
	Patch,
	Post,
	Request,
	Response,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { Client, Provider } from '../../domain/entities/user.model';
import { UsersService } from './users.service';
import { UserEntity } from '../../infrastructure/databases/entities';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../global/guards/roles.guard';
import { Roles } from '../../global/decorators/roles.decorator';
import { resolve } from 'path';
import { GcpFileService } from '../../global/services/gcp-file/gcp-file.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { VerifiedDto } from './dto/verified.dto';
import { EmailService } from '../../global/services/mail/email.service';

// tslint:disable-next-line:no-var-requires
const MulterGoogleCloudStorage = require('multer-google-storage').default;
@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService, private readonly gcpFileService: GcpFileService) {}

	@Get(':email')
	public async findUserByEmail(@Param('email') email: string, @Response() res) {
		try {
			const user = await this.usersService.getUserByEmail(email);
			return res.status(HttpStatus.OK).json(user);
		} catch (e) {
			throw new NotFoundException('User Not Found');
		}
	}

	@Get('')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('admin')
	public async getUsers(@Response() res) {
		try {
			const users = await this.usersService.getUsers();
			return res.status(HttpStatus.OK).json(users);
		} catch (e) {
			throw new NotFoundException('Users Not Found');
		}
	}

	@Patch(':email/photo')
	@UseGuards(AuthGuard(), RolesGuard)
	@UseInterceptors(
		FilesInterceptor('photo', 1, {
			fileFilter: UsersService.fileFilter,
			limits: { fileSize: 2097152 },
			/*			storage: diskStorage({
				destination: './upload/profile',
				filename: UsersService.filename
			})*/
			storage: new MulterGoogleCloudStorage({
				filename: UsersService.filename,
				autoRetry: true,
				maxRetries: 5,
				bucket: 'mariage-serein',
				projectId: 'mariage-serein-2019',
				keyFilename: resolve('gcp-secret.json')
			})
		})
	)
	async changePhoto(@UploadedFiles() photo: any, @Param('email') email: string, @Response() res, @Request() req) {
		if (req.user.email !== email) {
			throw new ForbiddenException();
		} else {
			const url = await this.gcpFileService.getUrlFile(photo[0].filename);
			const user = await this.usersService.changePhoto(email, url);
			return res.status(HttpStatus.CREATED).json(user);
		}
	}

	@Patch(':email')
	async patchUser(@Param('email') email, @Body() user: Partial<UserEntity>, @Response() res, @Request() req) {
		const userCreated = await this.usersService.patchUser(email, user);
		return res.status(HttpStatus.CREATED).json(userCreated);
	}

	@Patch(':email/verified')
	@UsePipes(
		new ValidationPipe({
			forbidUnknownValues: true,
			forbidNonWhitelisted: true
		})
	)
	@HttpCode(HttpStatus.CREATED)
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('admin')
	public async marqueUserAsVerified(@Param('email') email, @Body() user: VerifiedDto, @Request() req) {
		const userCreated = await this.usersService.markUserAsVerified(email, user);
		return userCreated;
	}

	@Patch(':email/last-connexion')
	async patchUserLastConnexion(
		@Param('email') email,
		@Body() user: Partial<UserEntity>,
		@Response() res,
		@Request() req
	) {
		const userCreated = await this.usersService.patchUserLastConnexion(email, user);
		return res.status(HttpStatus.CREATED).json(userCreated);
	}

	@Post()
	async createUser(@Body() user: UserEntity, @Response() res) {
		const userCreated = await this.usersService.createUser(user);
		return res.status(HttpStatus.CREATED).json(userCreated);
	}

	@Post('/client')
	async createClient(@Body() client: Client, @Response() res) {
		const clientCreated = await this.usersService.createClient(client);
		return res.status(HttpStatus.CREATED).json(clientCreated);
	}

	@Post('/provider')
	async createProvider(@Body() provider: Provider, @Response() res) {
		const providerCreated = await this.usersService.createProvider(provider);
		return res.status(HttpStatus.CREATED).json(providerCreated);
	}

	@Delete(':email')
	@UseGuards(AuthGuard())
	async delete(@Param('email') email, @Response() res, @Request() req) {
		if (req.user.email === email || req.user.role === 'admin') {
			const userDeleted = await this.usersService.deleteUser(email);
			return res.status(HttpStatus.NO_CONTENT).json(userDeleted);
		} else {
			throw new ForbiddenException();
		}
	}
}
