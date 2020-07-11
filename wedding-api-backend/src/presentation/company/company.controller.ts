import {
	Body,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	HttpStatus,
	NotFoundException,
	Param,
	Patch,
	Post,
	Put,
	Request,
	Response,
	UploadedFiles,
	UseGuards,
	UseInterceptors
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CompanyService } from './company.service';
import { CompanyEntity, CompanyImageEntity } from '../../infrastructure/databases/entities';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../global/guards/roles.guard';
import { Roles } from '../../global/decorators/roles.decorator';
import { resolve } from 'path';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCompanyDto } from './dto/CreateCompany.dto';
// tslint:disable-next-line:no-var-requires
const MulterGoogleCloudStorage = require('multer-google-storage').default;

@ApiBearerAuth()
@ApiTags('company')
@Controller('users/:email/company')
export class CompanyController {
	constructor(private readonly companyService: CompanyService) {}

	@Post()
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider', 'admin')
	@UseInterceptors(
		FilesInterceptor('files', 10, {
			fileFilter: CompanyService.fileFilter,
			limits: { fileSize: 10485760 },
			/*			storage: diskStorage({
				destination: './upload/company',
				filename: CompanyService.filename
			})*/
			storage: new MulterGoogleCloudStorage({
				filename: CompanyService.filename,
				autoRetry: true,
				maxRetries: 5,
				bucket: 'mariage-serein',
				projectId: 'mariage-serein-2019',
				keyFilename: resolve('gcp-secret.json')
			})
		})
	)
	public async createCompany(
		@UploadedFiles() files: any[],
		@Param('email') email: string,
		@Body() company: CreateCompanyDto,
		@Response() res,
		@Request() req
	) {
		const body = req.body;
		if (req.user.role !== 'admin' && req.user.email !== email) {
			throw new ForbiddenException();
		} else {
			// @ts-ignore
			const companyInstance = await this.companyService.createCompany(email, { files, company: body });
			return res.status(HttpStatus.CREATED).json(companyInstance);
		}
	}

	@Delete(':id/images/:imageId')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider')
	public async deleteImage(
		@Param('id') id,
		@Param('imageId') imageId,
		@Param('email') email,
		@Response() res,
		@Request() req
	) {
		if (req.user.email !== email) {
			throw new ForbiddenException();
		} else {
			try {
				await this.companyService.deleteImage(id, imageId);
				return res.status(HttpStatus.NO_CONTENT).json({});
			} catch (e) {
				throw new NotFoundException();
			}
		}
	}

	@Patch(':id/images/:imageId')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider')
	public async changeFavorite(
		@Param('id') id,
		@Param('imageId') imageId,
		@Param('email') email,
		@Body() image: Partial<CompanyImageEntity>,
		@Response() res,
		@Request() req
	) {
		if (req.user.email !== email) {
			throw new ForbiddenException();
		} else {
			try {
				const data = await this.companyService.changeFavorite(email, id, imageId, image);
				return res.status(HttpStatus.CREATED).json({ data });
			} catch (e) {
				throw new NotFoundException();
			}
		}
	}

	@Delete(':id')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider', 'admin')
	public async deleteCompany(@Param('id') id, @Param('email') email, @Response() res, @Request() req) {
		if (req.user.email === email || req.user.role === 'admin') {
			try {
				await this.companyService.deleteCompany(id);
				return res.status(HttpStatus.NO_CONTENT).json({});
			} catch (e) {
				throw new NotFoundException();
			}
		} else {
			throw new ForbiddenException();
		}
	}

	@Delete(':id/jobs')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('admin')
	public async deleteCompanyJobs(@Param('id') id, @Response() res, @Request() req) {
		if (req.user.role === 'admin') {
			try {
				const deletedJob = await this.companyService.deleteJobs(id);
				console.log('deletedJob', deletedJob);
				return res.status(HttpStatus.NO_CONTENT).json({});
			} catch (e) {
				throw new NotFoundException();
			}
		} else {
			throw new ForbiddenException();
		}
	}

	@Post(':id/jobs')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('admin')
	public async createCompanyJobs(
		@Param('email') email,
		@Body() company: Partial<CompanyEntity>,
		@Response() res,
		@Request() req
	) {
		if (req.user.email === email || req.user.role === 'admin') {
			try {
				await this.companyService.createJobs(company, email);
				return res.status(HttpStatus.CREATED).json({});
			} catch (e) {
				throw new NotFoundException();
			}
		} else {
			throw new ForbiddenException();
		}
	}

	@Get(':id')
	public async findCompany(@Param('id') id, @Param('email') email, @Response() res, @Request() req) {
		try {
			const company = await this.companyService.findCompany(id, email);
			return res.status(HttpStatus.CREATED).json(company);
		} catch (e) {
			throw new NotFoundException();
		}
	}

	@Get()
	public async getCompany(@Param('email') email, @Response() res, @Request() req) {
		try {
			const company = await this.companyService.getCompany(email);
			return res.status(HttpStatus.CREATED).json(company);
		} catch (e) {
			throw new NotFoundException();
		}
	}

	@Put(':id/current-step')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider', 'admin')
	async updateCurrentStep(
		@Param('email') email,
		@Param('id') id,
		@Response() res,
		@Request() req,
		@Body() company: Partial<CompanyEntity>
	) {
		try {
			const companyUpdated = await this.companyService.patchCurrentStep(id, { currentStep: company.currentStep });
			return res.status(HttpStatus.CREATED).json(companyUpdated);
		} catch (e) {
			return new NotFoundException();
		}
	}

	@Put(':id')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider', 'admin')
	@UseInterceptors(
		FilesInterceptor('files', 10, {
			fileFilter: CompanyService.fileFilter,
			limits: { fileSize: 1048576 },
			/*			storage: diskStorage({
				destination: './upload/company',
				filename: CompanyService.filename
			})*/
			storage: new MulterGoogleCloudStorage({
				filename: CompanyService.filename,
				autoRetry: true,
				maxRetries: 5,
				bucket: 'mariage-serein',
				projectId: 'mariage-serein-2019',
				keyFilename: resolve('gcp-secret.json')
			})
		})
	)
	async patchCompany(
		@UploadedFiles() files: any[],
		@Param('email') email,
		@Param('id') id,
		@Response() res,
		@Request() req,
		@Body() company: Partial<CompanyEntity>
	) {
		if (req.user.role !== 'admin' && req.user.email !== email) {
			throw new ForbiddenException();
		} else {
			try {
				const companyData = await this.companyService.patchCompany(id, email, company, files, req.user.id);
				return res.status(HttpStatus.ACCEPTED).json(companyData);
			} catch (e) {
				console.log('error', e);
				throw new NotFoundException();
			}
		}
	}
}
