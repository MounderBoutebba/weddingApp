import {
	Body,
	ConflictException,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	HttpStatus,
	NotFoundException,
	Param,
	Post,
	Query,
	Request,
	Response,
	UseGuards
} from '@nestjs/common';
import { UserFavoritesService } from './user-favorites.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../global/guards/roles.guard';
import { Roles } from '../../global/decorators/roles.decorator';

@ApiBearerAuth()
@ApiTags('user-favorites')
@Controller('/users/:email/user-favorites')
export class UserFavoritesController {

	constructor(private readonly favoritesService: UserFavoritesService) {
	}

	@Post()
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('client')
	public async createFavorite(@Param('email') email: string, @Body() data: unknown, @Response() res, @Request() req) {
		if (req.user.email !== email) {
			throw new ForbiddenException();
		} else {
			try {
				const result = await this.favoritesService.addFavorite(email, data, req.user);
				return res.status(HttpStatus.CREATED).json(result);
			} catch (e) {
				throw new ConflictException('Favorite already exist !');
			}

		}
	}

	@Get()
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('client')
	public async getFavorites(@Param('email') email: string, @Query('page') page = 1, number, @Response() res, @Request() req) {
		if (req.user.email !== email) {
			throw new ForbiddenException();
		} else {
			try {
				if(page<1){
					page = 1;
				}
				const result = await this.favoritesService.getAllFavorites(page, req.user);
				return res.status(HttpStatus.CREATED).json(result);
			} catch (e) {
				throw e;
				throw new ConflictException('Favorite already exist !');
			}

		}
	}


	@Delete(':companyId')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('client')
	public async deleteFavorite(@Param('email') email: string,
								@Param('companyId') companyId,
								@Response() res, @Request() req) {
		if (req.user.email !== email) {
			throw new ForbiddenException();
		} else {
			try {
				const result = await this.favoritesService.deleteFavorite(req.user.id, companyId);
				return res.status(HttpStatus.NO_CONTENT).json(result);
			} catch (e) {
				throw new NotFoundException(`Favorite Doesn't exist !`);
			}

		}
	}

}
