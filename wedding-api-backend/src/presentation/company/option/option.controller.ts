import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Request, Response, UseGuards } from '@nestjs/common';
import { CompanyServices } from '../../../infrastructure/databases/company/company.service';
import { OptionServices } from '../../../infrastructure/databases/company/option/option.service';
import { OptionEntity } from '../../../infrastructure/databases/entities';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../../global/guards/roles.guard';
import { Roles } from '../../../global/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('company option')
@Controller('users/:email/company/:companyId/option')
export class OptionController {
	constructor(private readonly optionService: OptionServices, private readonly companyServices: CompanyServices) {}

	@Post()
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider', 'admin')
	public async createOption(
		@Param('companyId') companyId,
		@Param('email') email,
		@Body() option: any,
		@Response() res,
		@Request() req
	) {
		try {
			option.company = await this.companyServices.findCompany(companyId, email);
			const optionInstance = await this.optionService.createOption(option,email);
			return res.status(HttpStatus.CREATED).json(optionInstance);
		} catch (e) {
			throw e;
		}
	}

	@Delete(':id')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider', 'admin')
	public async deleteOption(@Param('companyId') companyId,
							  @Param('id') id,
							  @Param('email') email,
							  @Response() res, @Request() req) {
		try {
			const company = await this.companyServices.findCompany(companyId, email);
			await this.optionService.deleteOption(id, company);
			return res.status(HttpStatus.NO_CONTENT).json({});
		} catch (e) {
			throw new NotFoundException();
		}
	}

	@Get(':id')
	@UseGuards(AuthGuard(), RolesGuard)
	public async findOption(@Param('id') id, @Response() res, @Request() req) {
		try {
			const option = await this.optionService.getOption(id);
			return res.status(HttpStatus.CREATED).json(option);
		} catch (e) {
			throw new NotFoundException();
		}
	}

	@Put(':id')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider', 'admin')
	async patchOption(@Param('id') id,
					  @Param('companyId') companyId,
					  @Param('email') email,
					  @Response() res,
					  @Body() option: Partial<OptionEntity>) {
		try {
			const company = await this.companyServices.findCompany(companyId, email);
			const optionData = await this.optionService.patchOption(id, option,company);
			return res.status(HttpStatus.ACCEPTED).json(optionData);
		} catch (e) {
			throw new NotFoundException();
		}
	}
}
