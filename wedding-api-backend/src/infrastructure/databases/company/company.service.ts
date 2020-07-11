import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRepository } from './company.repository';
import { UsersServices } from '../users/users.service';
import { CompanyEntity, CompanyImageEntity, TripFeeType } from '../entities';
import { ImageRepository } from './image.repository';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { customLogger } from '../../../config/logging';
import { DisponibilityRepository } from '../disponibility/disponibility.repository';
import { MoreThan } from 'typeorm';

@Injectable()
export class CompanyServices {
	constructor(
		@InjectRepository(CompanyRepository) private readonly companyRepository: CompanyRepository,
		@InjectRepository(DisponibilityRepository) private readonly disponibilityRepository: DisponibilityRepository,
		@InjectRepository(ImageRepository) private readonly imageRepository: ImageRepository,
		private elasticsearchService: ElasticsearchService,
		private readonly usersServices: UsersServices
	) {}

	async createCompany(email: string, company: CompanyEntity): Promise<CompanyEntity> {
		company.user = await this.usersServices.findProviderByEmail(email);
		company = await this.companyRepository.save(company);
		customLogger('CompanyServices', {
			action: 'createCompany',
			companyId: company.id
		});
		return this.companyRepository.findOneOrFail(company.id);
	}

	async deleteImage(id: any, imageId: any) {
		const company = await this.companyRepository.findOneOrFail(id);
		const image = await this.imageRepository.findOneOrFail(imageId);
		if (company.images.filter(value => value.id === imageId).length > 0) {
			customLogger('CompanyServices', {
				action: 'deleteCompany',
				companyId: id,
				imageId
			});
			return await this.imageRepository.remove(image);
		} else {
			throw new NotFoundException();
		}
	}

	async deleteCompany(id: any) {
		const company = await this.companyRepository.findOneOrFail(id);
		const user = await company.user;
		await this.elasticsearchService.deleteIndexById('categories', '_doc', user.id);
		await this.imageRepository.remove(company.images);
		await this.companyRepository.remove(company);
		customLogger('CompanyServices', {
			action: 'deleteCompany',
			companyId: id
		});
		return company;
	}

	async deleteJobs(id: any) {
		// on supprime la compagnie
		this.deleteCompany(id);
		/*const company = await this.companyRepository.findOneOrFail(id);
		company.categories = [];
		const savedCompany = await this.companyRepository.save(company);
		const user = await company.user;
		try {
			const deletedEalsctic = await this.elasticsearchService.deleteIndexById('categories', '_doc', user.id);
		} catch (e) {
			customLogger('CompanyServices', {
				action: 'categories not found in elastic',
				companyId: id
			});
		}
		customLogger('CompanyServices', {
			action: 'deleteJobs',
			companyId: id
		});
		return savedCompany;*/
	}

	async getCompany(email: any) {
		const user = await this.usersServices.findProviderByEmail(email);
		customLogger('CompanyServices', {
			action: 'getCompany',
			userEmail: email
		});
		const company = await this.companyRepository.findOneOrFail((await user.company).id);
		// @ts-ignore
		const dispo = await this.disponibilityRepository.find({
			where: {
				company: { id: company.id },
				end: MoreThan(new Date())
			},
			order: { start: 'ASC' }
		});
		return { ...company, disponibility: dispo };
	}

	async findCompany(id: string, email: string) {
		if (!!email) {
			const user = await this.usersServices.findProviderByEmail(email);
			if ((await user.company).id === id) {
				customLogger('CompanyServices', {
					action: 'findCompany',
					companyId: id
				});
				return await this.companyRepository.findOneOrFail(id);
			}
			throw new NotFoundException();
		} else {
			return await this.companyRepository.findOneOrFail(id);
		}
	}
	async patchCategory(id: any, company: Partial<CompanyEntity>) {
		customLogger('CompanyServices', {
			action: 'patchCategory',
			companyId: id
		});
		const patchCompany = await this.companyRepository.update(id, company);
		console.log('patchCompany', patchCompany);
		return patchCompany;
	}

	async patchCurrentStep(id: any, company: Partial<CompanyEntity>) {
		customLogger('CompanyServices', {
			action: 'patchCurrentStep',
			companyId: id,
			currentStep: company.currentStep
		});
		return await this.companyRepository.update(id, company);
	}

	public async patchCompanyImage(email: string, id: any, imageId: any, data: Partial<CompanyImageEntity>) {
		const company = await this.findCompany(id, email);
		const images = company.images.map(async image => {
			if (image.id === imageId) {
				image.favorite = true;
				await this.imageRepository.update(imageId, { favorite: true });
			} else {
				image.favorite = false;
				await this.imageRepository.update(image.id, { favorite: false });
			}
		});
		const imgs: CompanyImageEntity[] = await Promise.all(company.images);
		return imgs;
	}

	async patchCompany(id: any, company: Partial<CompanyEntity>, userId: string) {
		company.tripExpences = company.tripExpences?.toString() === 'true';
		company.suppHours = company.suppHours?.toString() === 'true';
		company.weekendVariation = company.weekendVariation?.toString() === 'true';

		const companyDB = await this.companyRepository.findOneOrFail(id);
		companyDB.images = [...companyDB.images, ...company.images];
		companyDB.name = company.name;
		// @ts-ignore
		companyDB.location = JSON.parse(company.location);
		// @ts-ignore
		companyDB.questions = JSON.parse(company.questions);
		// @ts-ignore
		companyDB.dynamiqueQts = !!company.dynamiqueQts ? JSON.parse(company.dynamiqueQts) : null;
		companyDB.links = company?.links || [];
		companyDB.networks = company?.networks || [];
		companyDB.categories = company.categories;
		companyDB.description = company.description;

		companyDB.periodeVariation = company.periodeVariation?.toString() === 'true';
		companyDB.optionsProposed = company.optionsProposed?.toString() === 'true';

		companyDB.weekendVariation = !!company.weekendVariation;
		companyDB.weekendVariationPercentage = !!company.weekendVariation ? company.weekendVariationPercentage : 0;

		companyDB.suppHours = !!company.suppHours;
		companyDB.suppHoursRate = !!company.suppHours ? company.suppHoursRate : 0;

		companyDB.tripExpences = !!company.tripExpences;
		companyDB.tripExpencesDistance = !!company.tripExpences ? company.tripExpencesDistance : 0;
		companyDB.tripExpencesRateType = !!company.tripExpences ? company.tripExpencesRateType : TripFeeType.SINGLE_FEE;
		companyDB.tripExpencesTypePrice = !!company.tripExpences ? company.tripExpencesTypePrice : 0;

		const savedCompany = await this.companyRepository.save(companyDB);
		await this.elasticsearchService.updateIndexById('categories', '_doc', userId, {
			location: {
				address: savedCompany.location.address,
				geo: {
					lat: savedCompany.location.lat,
					lon: savedCompany.location.lng
				}
			},
			weekendVariationPercentage: companyDB.weekendVariationPercentage,
			tripExpences: !company.tripExpences
				? null
				: {
						distance: companyDB.tripExpencesDistance,
						rateType: companyDB.tripExpencesRateType,
						typePrice: companyDB.tripExpencesTypePrice
				  }
		});
		customLogger('CompanyServices', {
			action: 'patchCompany',
			companyId: savedCompany.id
		});
		return savedCompany;
	}

	public async findCompanyByUserId(userId: string) {
		const company = await this.companyRepository.findOne({ user: { id: userId } });
		// @ts-ignore
		const dispo = await this.disponibilityRepository.find({
			company: { id: company.id },
			end: MoreThan(new Date())
		});
		return { ...company, disponibility: dispo };
	}

	/*

	async patchWedding(id: string, email: string, wedding: Partial<WeddingEntity>) {
		const client: ClientEntity = await this.usersServices.findClientByEmail(email);
		if (await client.wedding && (await client.wedding).id === id) {
			await this.weddingsRepository.update(id, wedding);
			return this.weddingsRepository.findOneOrFail(id);
		} else {
			throw new NotFoundException('wedding not found');
		}
	}*/
}
