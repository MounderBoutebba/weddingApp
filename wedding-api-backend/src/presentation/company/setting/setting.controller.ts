import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	NotFoundException,
	Param,
	Post,
	Put,
	Request,
	Response,
	UseGuards
} from '@nestjs/common';
import { SettingServices } from '../../../infrastructure/databases/company/setting/setting.service';
import { CompanyServices } from '../../../infrastructure/databases/company/company.service';
import { SettingEntity } from '../../../infrastructure/databases/entities';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../../global/guards/roles.guard';
import { Roles } from '../../../global/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('company setting')
@Controller('users/:email/company/:companyId/setting')
export class SettingController {
	constructor(private readonly settingService: SettingServices, private readonly companyServices: CompanyServices) {}

	@Post()
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider', 'admin')
	public async createSetting(
		@Param('companyId') companyId,
		@Param('email') email,
		@Body() setting: any,
		@Response() res,
		@Request() req
	) {
		try {
			setting.company = await this.companyServices.findCompany(companyId, email);
			const settingInstance = await this.settingService.createSetting(setting);
			return res.status(HttpStatus.CREATED).json(settingInstance);
		} catch (e) {
			throw e;
		}
	}

	@Delete(':id')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider', 'admin')
	public async deleteSetting(@Param('id') id,
														 @Response() res,
														 @Request() req,
														 @Param('companyId') companyId,
														 @Param('email') email) {
		try {
			const company = await this.companyServices.findCompany(companyId, email);
			await this.settingService.deleteSetting(id,company);
			return res.status(HttpStatus.NO_CONTENT).json({});
		} catch (e) {
			throw new NotFoundException();
		}
	}

	@Get(':id')
	@UseGuards(AuthGuard(), RolesGuard)
	public async findSetting(@Param('id') id, @Response() res, @Request() req) {
		try {
			const setting = await this.settingService.getSetting(id);
			return res.status(HttpStatus.CREATED).json(setting);
		} catch (e) {
			throw new NotFoundException();
		}
	}

	@Put(':id')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider', 'admin')
	async patchSetting(@Param('id') id,
										 @Response() res,
										 @Body() setting: Partial<SettingEntity>,
										 @Param('companyId') companyId,
										 @Param('email') email) {
		try {
			const company = await this.companyServices.findCompany(companyId, email);
			const settingData = await this.settingService.patchSetting(id, setting,company);
			return res.status(HttpStatus.ACCEPTED).json(settingData);
		} catch (e) {
			throw new NotFoundException();
		}
	}
}
