import { Body, Controller, Delete, Post, Query, Request, UnauthorizedException, UseGuards, HttpStatus, HttpCode, Param, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../global/guards/roles.guard';
import { DisponibilityService } from './disponibility.service';
import { CreateDisponibilityDto } from './dto/disponibility.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../global/decorators/roles.decorator';

@ApiBearerAuth()
@ApiTags('disponibility')
@Controller('users/:email/company/:companyId/disponibility')
export class DisponibilityController {
	constructor(private readonly disponibilityService: DisponibilityService) {}

	@Post()
	@UseGuards(AuthGuard(), RolesGuard)
    @Roles('provider' )
	public async addAbsencePrivate(
		@Param('companyId') companyId: string,
		@Param('email') email: string,
		@Body() disponibilityDto: CreateDisponibilityDto,
		@Request() req) {
		const provider = req.user;
		const company = await provider.company;
		if (company.id !== companyId || provider.email !== email) {
			throw new UnauthorizedException();
		}
		const data = await this.disponibilityService.createIndisponibility(disponibilityDto, company);
		return { data };
	}

	@Delete(':id')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider')
	@HttpCode(HttpStatus.NO_CONTENT)
	public async deletDisponibility(
		@Param('companyId') companyId: string,
		@Param('email') email: string,
		@Param('id') id: string,
		@Request() req) {
		const provider = req.user;
		const company = await provider.company;
		if (company.id !== companyId || provider.email !== email) {
			throw new UnauthorizedException();
		}
		return await this.disponibilityService.deleteDisponibility(id,companyId);
	}

	@Get()
	@UseGuards(AuthGuard())
	@HttpCode(HttpStatus.NO_CONTENT)
	public async getDisponibility(
		@Param('companyId') companyId: string,
		@Param('email') email: string,
		@Request() req) {
		return await this.disponibilityService.getDisponibilities(companyId);
	}


}
