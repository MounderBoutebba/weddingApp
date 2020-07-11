import { BadRequestException, ForbiddenException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import { CompanyEntity, CompanyImageEntity } from '../../infrastructure/databases/entities';
import { CompanyServices } from '../../infrastructure/databases/company/company.service';
import { ServicesService } from '../services/services.service';
import { Categorie } from '../../domain/entities/categories/categorie.model';
import { Photographe } from '../../domain/entities/categories/souvenirs/photographe.model';
import { Videaliste } from '../../domain/entities/categories/souvenirs/videaliste.model';
import { UsersServices } from '../../infrastructure/databases/users/users.service';
import { Decorateur } from '../../domain/entities/categories/decoration/decorateur.model';
import { Fleuriste } from '../../domain/entities/categories/decoration/fleuriste.model';
import { Bus } from '../../domain/entities/categories/transport/bus.model';
import { Voiture } from '../../domain/entities/categories/transport/voiture.model';
import { AnimateurAdultes } from '../../domain/entities/categories/animateur/animateurAdultes.model';
import { AnimateurEnfants } from '../../domain/entities/categories/animateur/animateurEnfants.model';
import { Lieu } from '../../domain/entities/categories/reception/lieu.model';
import { Traiteur } from '../../domain/entities/categories/reception/traiteur.model';
import { GateauMariage } from '../../domain/entities/categories/reception/gateauMariage.model';
import { Dj } from '../../domain/entities/categories/musique/dj.model';
import { Groupe } from '../../domain/entities/categories/musique/groupe.model';
import { Musicien } from '../../domain/entities/categories/musique/musicien.model';
import { Lachers } from '../../domain/entities/categories/visuelles/lachers.model';
import { FeuArtifices } from '../../domain/entities/categories/visuelles/feuArtifices.model';
import { ChoregrapheMariage } from '../../domain/entities/categories/coach/choregrapheMariage.model';
import { CoachSportif } from '../../domain/entities/categories/coach/coachSportif.model';
import { OfficiantCeremonie } from '../../domain/entities/categories/coach/officiantCeremonie.model';
import { CoiffureMariage } from '../../domain/entities/categories/beaute-et-soins/coiffureMariage.model';
import { MaquillageMariage } from '../../domain/entities/categories/beaute-et-soins/maquillageMariage.model';
import { Soins } from '../../domain/entities/categories/beaute-et-soins/soins.model';
import { Esthetique } from '../../domain/entities/categories/beaute-et-soins/esthetique.model';
import { Hebergement } from '../../domain/entities/categories/invites/hebergement.model';
import { FaireParts } from '../../domain/entities/categories/invites/faireParts.model';
import { VoyageNoces } from '../../domain/entities/categories/voyage-noces/voyageNoces.model';
import { GcpFileService } from '../../global/services/gcp-file/gcp-file.service';
import { customLogger } from '../../config/logging';

@Injectable()
export class CompanyService {
	constructor(
		private readonly companyServices: CompanyServices,
		@Inject(forwardRef(() => ServicesService)) private readonly servicesService: ServicesService,
		private readonly usersService: UsersServices,
		private readonly gcpFileService: GcpFileService
	) {}

	public static fileFilter(req1, file, callback) {
		if (['.jpg', '.jpeg', '.png', '.webp', '.bmp'].includes(extname(file.originalname).toLocaleLowerCase())) {
			return callback(null, true);
		} else {
			return callback(new BadRequestException('File format is not valid , accept only images'), false);
		}
	}

	public static filename(req, file, cb) {
		return cb(null, `${uuid()}${extname(file.originalname)}`);
	}

	public async createCompany(email: string, data: { files: any[]; company: any }) {

		if ( Array.isArray (data.files) ) {
			if (  data.files.length <= 2 ) {
			throw new ForbiddenException('Min Imagees 3 !! ');
			}
		} else {
			throw new ForbiddenException('Please Add  some images !! ');
		}

		const files = await Promise.all(
			data.files.map(async file => {
				const image = new CompanyImageEntity();
				image.id = file.filename.split('.')[0];
				image.description = file.originalname.split('.')[0];
				image.name = file.filename;
				// @ts-ignore
				image.path = (await this.gcpFileService.getUrlFile(file.filename))[0];
				return image;
			})
		);
		const company = new CompanyEntity();
		company.images = files;
		company.categories = data.company.categories;
		company.description = data.company.description;
		company.name = data.company.name;
		company.links = data?.company?.links || [];
		company.networks = data?.company?.networks || [];
		// @ts-ignore
		company.location = JSON.parse(data.company.location);
		// @ts-ignore
		company.questions = JSON.parse(data.company.questions);
		company.dynamiqueQts = !!data.company.dynamiqueQts ? JSON.parse(data.company.dynamiqueQts) : null;
		if (typeof company.categories === 'string') {
			company.categories = [company.categories];
		}

		const createdCompany = await this.companyServices.createCompany(email, company);
		const user = await this.usersService.findProviderByEmail(email);
		this.asyncForEach(company.categories, async categorieLabel => {
			const categorie: Categorie = this.getCategorieByLabel(categorieLabel);
			if (categorie) {
				categorie.userid = user.id;
				categorie.totalNotes = 0;
				categorie.securePayment = false;
				categorie.verifiedProvider = false;
				categorie.location = {
					address: createdCompany.location.address,
					// @ts-ignore
					geo: {
						lat: createdCompany.location.lat,
						lon: createdCompany.location.lng
					}
				},
				categorie.criteres = {
					...categorie.criteres
				};
				const createdService = await this.servicesService.createService({
					...categorie,
					...{ categories: [categorieLabel] }
				});
				customLogger('Create Service', {
					action: 'providerCreated',
					service: createdService
				});
			} else {
				console.log('categorie not found');
				throw new NotFoundException('categorie not found');
			}
		});
		return createdCompany;
	}

	async deleteImage(id: any, imageId: any) {
		return await this.companyServices.deleteImage(id, imageId);
	}

	async deleteCompany(id: any) {
		return await this.companyServices.deleteCompany(id);
	}

	async deleteJobs(id: any) {
		return await this.companyServices.deleteJobs(id);
	}

	async createJobs(company: any, email: string) {
		const user = await this.usersService.findProviderByEmail(email);
		this.asyncForEach(company.categories, async categorieLabel => {
			const categorie: Categorie = this.getCategorieByLabel(categorieLabel);
			if (categorie) {
				categorie.userid = user.id;
				categorie.criteres = {
					...categorie.criteres
				};
				const createdService = await this.servicesService.createService({
					...categorie,
					...{ categories: [categorieLabel] }
				});
				customLogger('Create Service', {
					action: 'createdService',
					service: createdService
				});
			} else {
				throw new NotFoundException('categorie not found');
			}
		});
	}

	async getCompany(email: string) {
		return this.companyServices.getCompany(email);
	}

	public async findCompanyByUserId(userId: string) {
		return this.companyServices.findCompanyByUserId(userId);
	}

	async findCompany(id: string, email: string) {
		return this.companyServices.findCompany(id, email);
	}

	public async changeFavorite(
		email: string,
		id: any,
		imageId: any,
		data: Partial<CompanyImageEntity>
	): Promise<CompanyImageEntity[]> {
		return this.companyServices.patchCompanyImage(email, id, imageId, data);
	}

	async patchCompany(id: any, email: any, company: Partial<CompanyEntity>, files: any[] = [], userId: string) {
		const fileArray = await Promise.all(
			files.map(async file => {
				const image = new CompanyImageEntity();
				image.id = file.filename.split('.')[0];
				image.description = file.originalname.split('.')[0];
				image.name = file.filename;
				// @ts-ignore
				image.path = (await this.gcpFileService.getUrlFile(file.filename))[0];
				return image;
			})
		);

		company.images = fileArray;
		if (typeof company.categories === 'string') {
			company.categories = [company.categories];
		}
		return await this.companyServices.patchCompany(id, company, userId);
	}

	public async patchCategories(id: any, company: Partial<CompanyEntity>) {
		return await this.companyServices.patchCategory(id, company);
	}

	async patchCurrentStep(id: any, company: Partial<CompanyEntity>) {
		return await this.companyServices.patchCurrentStep(id, company);
	}

	private transformCriteres(object: any, prefix: string) {
		return Object.entries(object)
			.map(([k, v]) => ({ [prefix + '_' + k]: v }))
			.reduce((acc, val) => ({ ...acc, ...val }), {});
	}

	private getCategorieByLabel(label: string): Categorie {
		let categorie: Categorie;
		switch (label) {
			case 'animateurEnfants': {
				categorie = new AnimateurEnfants();
				categorie.userid = '';
				break;
			}
			case 'animateurAdultes': {
				categorie = new AnimateurAdultes();
				categorie.userid = '';
				break;
			}

			case 'photographe': {
				categorie = new Photographe();
				categorie.userid = '';
				break;
			}
			case 'videaliste': {
				categorie = new Videaliste();
				categorie.userid = '';
				break;
			}

			case 'decorateur': {
				categorie = new Decorateur();
				categorie.userid = '';
				break;
			}
			case 'fleuriste': {
				categorie = new Fleuriste();
				categorie.userid = '';
				break;
			}

			case 'bus': {
				categorie = new Bus();
				categorie.userid = '';
				break;
			}
			case 'voiture': {
				categorie = new Voiture();
				categorie.userid = '';
				break;
			}
			case 'lieu': {
				categorie = new Lieu();
				categorie.userid = '';
				break;
			}
			case 'traiteur': {
				categorie = new Traiteur();
				categorie.userid = '';
				break;
			}
			case 'gateaumariage': {
				categorie = new GateauMariage();
				categorie.userid = '';
				break;
			}
			case 'dj': {
				categorie = new Dj();
				categorie.userid = '';
				break;
			}
			case 'groupe': {
				categorie = new Groupe();
				categorie.userid = '';
				break;
			}
			case 'musicien': {
				categorie = new Musicien();
				categorie.userid = '';
				break;
			}
			case 'lacher': {
				categorie = new Lachers();
				categorie.userid = '';
				break;
			}
			case 'feuArtifices': {
				categorie = new FeuArtifices();
				categorie.userid = '';
				break;
			}
			case 'choregrapheMariage': {
				categorie = new ChoregrapheMariage();
				categorie.userid = '';
				break;
			}
			case 'coachSportif': {
				categorie = new CoachSportif();
				categorie.userid = '';
				break;
			}
			case 'officiantCeremonie': {
				categorie = new OfficiantCeremonie();
				categorie.userid = '';
				break;
			}
			case 'coiffure': {
				categorie = new CoiffureMariage();
				categorie.userid = '';
				break;
			}
			case 'maquillage': {
				categorie = new MaquillageMariage();
				categorie.userid = '';
				break;
			}
			case 'soins': {
				categorie = new Soins();
				categorie.userid = '';
				break;
			}
			case 'esthetique': {
				categorie = new Esthetique();
				categorie.userid = '';
				break;
			}
			case 'hebergement': {
				categorie = new Hebergement();
				categorie.userid = '';
				break;
			}
			case 'faireparts': {
				categorie = new FaireParts();
				categorie.userid = '';
				break;
			}
			case 'voyagenoces': {
				categorie = new VoyageNoces();
				categorie.userid = '';
				break;
			}
		}
		categorie.criteres = this.transformCriteres(categorie.criteres, label);
		return categorie;
	}

	private async asyncForEach(array, callback) {
		for (let index = 0; index < array.length; index++) {
			await callback(array[index], index, array);
		}
	}
}
