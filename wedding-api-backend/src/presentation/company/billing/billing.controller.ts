import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Request, Response, UseGuards } from '@nestjs/common';
import { BillingServices } from '../../../infrastructure/databases/company/billing/billing.service';
import { CompanyServices } from '../../../infrastructure/databases/company/company.service';
import { CompanyBillingEntity } from '../../../infrastructure/databases/entities';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../../global/guards/roles.guard';
import { Roles } from '../../../global/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('company billing')
@Controller('users/:email/company/:companyId/billing')
export class BillingController {
	constructor(private readonly billingService: BillingServices, private readonly companyServices: CompanyServices) {}

	@Post()
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider', 'admin')
	public async createBilling(
		@Param('companyId') companyId,
		@Param('email') email,
		@Body() billing: any,
		@Response() res,
		@Request() req
	) {
		try {
			billing.company = await this.companyServices.findCompany(companyId, email);
			const billingInstance = await this.billingService.createBilling(billing);
			return res.status(HttpStatus.CREATED).json(billingInstance);
		} catch (e) {
			throw e;
		}
	}

	@Get()
	@UseGuards(AuthGuard(), RolesGuard)
	public async findBilling(@Param('companyId') companyId, @Response() res, @Request() req) {
		try {
			const billing = await this.billingService.getBilling(companyId);
			return res.status(HttpStatus.CREATED).json(billing);
		} catch (e) {
			return res.status(HttpStatus.CREATED).json(null);
		}
	}

	@Put(':id')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider', 'admin')
	async patchBilling(@Param('id') id, @Response() res, @Body() billing: Partial<CompanyBillingEntity>) {
		try {
			const billingData = await this.billingService.patchBilling(id, billing);
			return res.status(HttpStatus.ACCEPTED).json(billingData);
		} catch (e) {
			throw e;
			throw new NotFoundException();
		}
	}

	@Delete(':id')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider', 'admin')
	public async deleteBilling(@Param('id') id, @Response() res, @Request() req) {
		try {
			await this.billingService.deleteBilling(id);
			return res.status(HttpStatus.NO_CONTENT).json({});
		} catch (e) {
			throw new NotFoundException();
		}
	}
}
