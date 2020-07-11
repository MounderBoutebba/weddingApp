import {
	Body,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	HttpStatus,
	Param,
	Patch,
	Post,
	Query,
	Request,
	Response,
	UseGuards
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { Provider } from '../../domain/entities/user.model';
import { Categorie } from 'src/domain/entities/categories/categorie.model';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../global/guards/roles.guard';
import { Roles } from '../../global/decorators/roles.decorator';

@Controller('services')
export class ServicesController {
	constructor(private readonly servicesService: ServicesService) {}

	@Post()
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider', 'admin')
	async createService(@Body() service): Promise<any> {
		return await this.servicesService.createService(service);
	}

	@Get(':categorielabel')
	async findByCategorieType(
		@Param('categorielabel') categorielabel,
		@Query('q') q: string,
		@Response() res
	): Promise<Provider[]> {
		const results = await this.servicesService.searchServices('categories', categorielabel, q);
		return res.status(HttpStatus.OK).json({ data: results });
	}

	@Get()
	async getAll(@Query('q') q: string, @Response() res): Promise<Provider[]> {
		const results = await this.servicesService.searchServices('categories', null, q);
		return res.status(HttpStatus.OK).json({ data: results });
	}

	@Get(':categorielabel/:email')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider', 'admin', 'client')
	async findByUserId(
		@Param('categorielabel') categorielabel,
		@Param('email') email,
		@Response() res
	): Promise<Provider[]> {
		const results = await this.servicesService.searchServicesByFields('categories', categorielabel, email, [
			'userid'
		]);

		return res.status(HttpStatus.OK).json(results[0]);
	}

	@Get('reservation/:categorielabel/:email')
	async findByUserIdForReservation(
		@Param('categorielabel') categorielabel,
		@Param('email') email,
		@Response() res
	): Promise<Provider[]> {
		console.log('search ', categorielabel, email, new Date());

		const results = await this.servicesService.searchServicesByFields('categories', categorielabel, email, [
			'userid'
		]);
		console.log('result', new Date(), results);

		return res.status(HttpStatus.OK).json(results[0]);
	}

	@Delete(':categorielabel/:email')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider', 'admin')
	async deleteService(
		@Param('categorielabel') categorielabel,
		@Param('email') email,
		@Response() res,
		@Request() req
	): Promise<any> {
		if (req.user.email !== email) {
			throw new ForbiddenException();
		} else {
			const categoriesDeleted = await this.servicesService.deleteServices('categories', categorielabel, email);
			return res.status(HttpStatus.NO_CONTENT).json(categoriesDeleted);
		}
	}

	@Patch(':categorielabel/:email')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider', 'admin')
	async updateService(
		@Param('categorielabel') categorielabel,
		@Param('email') email,
		@Body() categorie: Categorie,
		@Response() res,
		@Request() req
	): Promise<any> {
		if (req.user.role !== 'admin' && req.user.email !== email) {
			throw new ForbiddenException();
		} else {
			const results = await this.servicesService.updateServiceByUserId(
				'categories',
				categorielabel,
				email,
				categorie
			);

			return res.status(HttpStatus.ACCEPTED).json(results[0]);
		}
	}

	@Post('_search')
	async searchCategorieType(
		@Body() searchQuery: any,
		@Query('page') page: number = 0,
		@Response() res,
		@Request() req
	): Promise<Provider[]> {
		if (page < 0) {
			page = 0;
		}
		const results = await this.servicesService.searchCategory(null, searchQuery, page, req.headers['email']);
		return res.status(HttpStatus.OK).json(results);
	}
}
