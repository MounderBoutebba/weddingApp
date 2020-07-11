import {
	BadRequestException,
	Body,
	ConflictException,
	Controller,
	ForbiddenException,
	Get,
	HttpStatus,
	NotFoundException,
	Param,
	Patch,
	Post,
	Request,
	Response,
	UseGuards
} from '@nestjs/common';
import { WeddingEntity } from '../../infrastructure/databases/entities';
import { WeddingsService } from './weddings.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../global/guards/roles.guard';
import { Roles } from '../../global/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('wedding')
@Controller('users/:email/wedding')
export class WeddingsController {
	constructor(private readonly weddingService: WeddingsService) {}

	@Patch(':id')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('client')
	async patchWedding(
		@Param('email') email,
		@Param('id') id,
		@Body() wedding: Partial<WeddingEntity>,
		@Response() res,
		@Request() req
	) {
		if (req.user.email !== email) {
			throw new ForbiddenException();
		} else {
			try {
				const userCreated = await this.weddingService.patchWedding(id, email, wedding);
				return res.status(HttpStatus.CREATED).json(userCreated);
			} catch (err) {
				if (err.status === 404) {
					throw new NotFoundException();
				} else {
					throw new BadRequestException(err.message);
				}
			}
		}
	}

	@Get(':id')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('client')
	async getWedding(@Param('email') email, @Param('id') id, @Response() res, @Request() req) {
		if (req.user.email !== email) {
			throw new ForbiddenException();
		} else {
			try {
				const created = await this.weddingService.findWedding(id, email);
				return res.status(HttpStatus.CREATED).json(created);
			} catch (e) {
				throw new NotFoundException();
			}
		}
	}

	@Get()
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('client')
	async getWeddingByEmail(@Param('email') email, @Response() res, @Request() req) {
		if (req.user.email !== email) {
			throw new ForbiddenException();
		} else {
			try {
				const created = await this.weddingService.findWeddingByEmail(email);
				return res.status(HttpStatus.CREATED).json(created);
			} catch (e) {
				throw new NotFoundException();
			}
		}
	}

	@Post()
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('client')
	async createWedding(@Param('email') email, @Body() wedding: WeddingEntity, @Response() res, @Request() req) {
		if (req.user.email !== email) {
			throw new ForbiddenException();
		} else {
			try {
				const userCreated = await this.weddingService.createWedding(email, wedding);
				return res.status(HttpStatus.CREATED).json(userCreated);
			} catch (err) {
				if (err.status === 400) {
					throw new BadRequestException(err.message);
				} else {
					throw new ConflictException();
				}
			}
		}
	}
}
