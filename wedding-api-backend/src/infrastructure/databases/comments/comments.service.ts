import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentsRepository } from './comments.repository';
import { CommentsEntity } from '../entities/comments.entity';
import { CommentsResponseEntity } from '../entities/commentsResponse.entity';
import { CommentsResponseRepository } from './commentsResponse.repository';
import { CompanyRepository } from '../company/company.repository';
import { CompanyEntity } from '../entities';
import { CommentResponseDto } from '../../../presentation/comments/dto/commentResponse.dto';
import { AddCommentDto } from '../../../presentation/comments/dto/comment.dto';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class CommentsServiceDB {

    constructor(
		@InjectRepository(CompanyRepository) private readonly companyRepository: CompanyRepository,
		@InjectRepository(CommentsRepository) private readonly commentsRepository: CommentsRepository,
		@InjectRepository(CommentsResponseRepository) private readonly commentsResponseRepository: CommentsResponseRepository,
		private elasticsearchService: ElasticsearchService
	) {}

	public async save(comment: CommentsEntity) {

		try {
			const comments = await this.commentsRepository.save(comment);
			let company = await comments.company;
			company = this.addVotesToCompany(company, comments);
			await this.companyRepository.update(company.id, {
				totalNotes: company.totalNotes,
				countVotes: company.countVotes,
				flexibilite: company.flexibilite,
				countFlexibilite: company.countFlexibilite,
				professionnalisme: company.professionnalisme,
				countProfessionnalisme: company.countProfessionnalisme,
				qualiteService: company.qualiteService,
				countQualiteService: company.countQualiteService,
				rapportQualitePrix: company.rapportQualitePrix,
				countRapportQualitePrix: company.countRapportQualitePrix
			});
			await this.elasticsearchService.updateIndexById('categories','_doc',company.user.id,{
				totalNotes:company.totalNotes
			});
			delete comments['__company__'];
			delete comments['__reservation__'];
			delete comments['__has_reservation__'];
			delete comments['__has_company__'];
			return comments;
		} catch (e) {
			throw new ConflictException();
		}

	}

	public async find(id: string) {

		try {
			return await this.commentsRepository.findOneOrFail(id);
		} catch (e) {
			throw new NotFoundException();
		}

	}

	public async createResponse(response: CommentsResponseEntity) {
		try {
			const res= await this.commentsResponseRepository.save(response);
			delete res['comment'];
			delete res['user']['__company__'];
			delete res['user']['__has_company__'];
			return res;
		} catch (e) {
			throw new ConflictException();
		}
	}

	public async findByCompany(companyId: string, page: number) {
		return await paginate<CommentsEntity>(this.commentsRepository, {
			limit: 10,
			page,
			route: `/api/comments`
			// @ts-ignore
		}, { where: { company: { id: companyId } }, order: { createdAt: 'DESC' } });
	}

	public async delete(id: string, userId: string) {
		const comment = await this.find(id);
		let company = await comment.company;
		if (comment.client.id !== userId || !!comment.response) {
			throw new ForbiddenException();
		}
		await this.commentsRepository.delete(comment.id);
		company = this.removeVotesFromCompany(company, comment);
		await this.companyRepository.update(company.id, {
			totalNotes: company.totalNotes,
			countVotes: company.countVotes,
			flexibilite: company.flexibilite,
			countFlexibilite: company.countFlexibilite,
			professionnalisme: company.professionnalisme,
			countProfessionnalisme: company.countProfessionnalisme,
			qualiteService: company.qualiteService,
			countQualiteService: company.countQualiteService,
			rapportQualitePrix: company.rapportQualitePrix,
			countRapportQualitePrix: company.countRapportQualitePrix
		});
		company =await this.companyRepository.findOne(company.id);
		await this.elasticsearchService.updateIndexById('categories','_doc',company.user.id,{
			totalNotes:company.totalNotes
		});

	}

	private addVotesToCompany(company: CompanyEntity, comments: CommentsEntity) {
		company.countFlexibilite = company.countFlexibilite + comments.flexibilite;
		company.countProfessionnalisme = company.countProfessionnalisme + comments.professionnalisme;
		company.countQualiteService = company.countQualiteService + comments.qualiteService;
		company.countRapportQualitePrix = company.countRapportQualitePrix + comments.rapportQualitePrix;
		company.countVotes = company.countVotes + 1;

		company.flexibilite = company.countFlexibilite / company.countVotes;
		company.professionnalisme = company.countProfessionnalisme / company.countVotes;
		company.qualiteService = company.countQualiteService / company.countVotes;
		company.rapportQualitePrix = company.countRapportQualitePrix / company.countVotes;
		company.totalNotes = (company.flexibilite + company.professionnalisme + company.qualiteService + company.rapportQualitePrix) / 4;
		return company;
	}

	private removeVotesFromCompany(company: CompanyEntity, comments: CommentsEntity) {
		company.countFlexibilite = company.countFlexibilite - comments.flexibilite;
		company.countProfessionnalisme = company.countProfessionnalisme - comments.professionnalisme;
		company.countQualiteService = company.countQualiteService - comments.qualiteService;
		company.countRapportQualitePrix = company.countRapportQualitePrix - comments.rapportQualitePrix;
		company.countVotes = company.countVotes - 1;

		const divider = company.countVotes || 1;
		company.flexibilite = company.countFlexibilite / divider;
		company.professionnalisme = company.countProfessionnalisme / divider;
		company.qualiteService = company.countQualiteService / divider;
		company.rapportQualitePrix = company.countRapportQualitePrix / divider;
		company.totalNotes = (company.flexibilite + company.professionnalisme + company.qualiteService + company.rapportQualitePrix) / 4;
		return company;
	}

	public async deleteResponse(id: string, userId: string, commentId: string) {
		const commentResponse = await this.findResponse(id);
		const comment = await this.find(commentId);

		if (commentResponse.user.id !== userId) {
			throw new ForbiddenException();
		}
		if (comment.response.id !== id) {
			throw new NotFoundException();
		}

		return await this.commentsResponseRepository.delete(id);

	}

	private async findResponse(id: string) {
		try {
			return await this.commentsResponseRepository.findOneOrFail(id);
		} catch (e) {
			throw new NotFoundException();
		}
	}

	public async updateResponse(id: string, userId: string, commentId: string, responseDto: CommentResponseDto) {
		const commentResponse = await this.findResponse(id);
		const comment = await this.find(commentId);

		if (commentResponse.user.id !== userId) {
			throw new ForbiddenException();
		}
		if (comment.response.id !== id) {
			throw new NotFoundException();
		}
		commentResponse.content = responseDto.content;
		return await this.commentsResponseRepository.save(commentResponse);

	}

	public async updateComment(id: string, userId: string, commentDto: AddCommentDto) {
		let comment = await this.find(id);
		if(comment.client.id!==userId || !!comment.response){
			throw new ForbiddenException();
		}
		let company = await comment.company;
		company = this.removeVotesFromCompany(company, comment);
		comment.rapportQualitePrix = commentDto.rapportQualitePrix;
		comment.qualiteService = commentDto.qualiteService;
		comment.professionnalisme = commentDto.professionnalisme;
		comment.flexibilite = commentDto.flexibilite;
		comment.totalNotes = (comment.flexibilite + comment.professionnalisme + comment.qualiteService + comment.rapportQualitePrix) / 4;
		comment.content = commentDto.content;
		comment = await this.commentsRepository.save(comment);
		company = this.addVotesToCompany(company, comment);
		await this.companyRepository.update(company.id, {
			totalNotes: company.totalNotes,
			countVotes: company.countVotes,
			flexibilite: company.flexibilite,
			countFlexibilite: company.countFlexibilite,
			professionnalisme: company.professionnalisme,
			countProfessionnalisme: company.countProfessionnalisme,
			qualiteService: company.qualiteService,
			countQualiteService: company.countQualiteService,
			rapportQualitePrix: company.rapportQualitePrix,
			countRapportQualitePrix: company.countRapportQualitePrix
		});
		company = await this.companyRepository.findOne(company.id);
		await this.elasticsearchService.updateIndexById('categories','_doc',company.user.id,{
			totalNotes:company.totalNotes
		});
		delete comment['__company__'];
		delete comment['__has_company__'];
		return comment;
	}
}
